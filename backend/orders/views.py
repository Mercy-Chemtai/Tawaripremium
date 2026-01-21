# ============================================
# orders/views.py - Django Backend
# ============================================
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.core.mail import send_mail
from django.conf import settings
from .models import Order, OrderItem
from .serializers import OrderSerializer

class OrderViewSet(viewsets.ModelViewSet):
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user).order_by('-created_at')

    def create(self, request):
        """Create a new order"""
        data = request.data
        user = request.user
        
        # Create order
        order = Order.objects.create(
            user=user,
            total=data.get('total'),
            shipping_details=data.get('shipping_details'),
            payment_method=data.get('payment_method', 'mpesa'),
            status='pending'
        )
        
        # Create order items
        for item_data in data.get('items', []):
            OrderItem.objects.create(
                order=order,
                product_id=item_data['product'],
                quantity=item_data['quantity'],
                price=item_data['price'],
                color=item_data.get('color'),
                storage=item_data.get('storage')
            )
        
        # Send confirmation email
        self.send_order_confirmation_email(order)
        
        serializer = self.get_serializer(order)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    def send_order_confirmation_email(self, order):
        """Send order confirmation email to customer"""
        subject = f'Order Confirmation - Order #{order.id}'
        message = f"""
        Dear {order.shipping_details.get('fullName')},
        
        Thank you for your order!
        
        Order Number: #{order.id}
        Total Amount: KSh {order.total:,}
        Payment Method: {order.payment_method.upper()}
        
        We will process your order and send you tracking information once it ships.
        
        Best regards,
        Tawari Digital Team
        """
        
        send_mail(
            subject,
            message,
            settings.DEFAULT_FROM_EMAIL,
            [order.shipping_details.get('email')],
            fail_silently=False,
        )
    
    @action(detail=True, methods=['post'])
    def cancel(self, request, pk=None):
        """Cancel an order"""
        order = self.get_object()
        
        if order.status in ['shipped', 'delivered']:
            return Response(
                {'error': 'Cannot cancel shipped or delivered orders'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        order.status = 'cancelled'
        order.save()
        
        serializer = self.get_serializer(order)
        return Response(serializer.data)