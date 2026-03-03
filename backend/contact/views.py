

# ============================================
# contact/views.py - Contact Form & Email
# ============================================
from rest_framework.views import APIView
from rest_framework.response import Response
from django.core.mail import send_mail, EmailMessage
from django.conf import settings

class ContactMessageView(APIView):
    """Handle contact form submissions"""
     
    def post(self, request):
        name = request.data.get('name')
        email = request.data.get('email')
        subject = request.data.get('subject')
        message = request.data.get('message')
        
        # Email to admin
        admin_subject = f'New Contact Form: {subject}'
        admin_message = f"""
        New contact form submission:
        
        From: {name} ({email})
        Subject: {subject}
        
        Message:
        {message}
        
        ---
        Reply to this email to respond to the customer.
        """
        
        try:
            # Send to admin
            send_mail(
                admin_subject,
                admin_message,
                settings.DEFAULT_FROM_EMAIL,
                [settings.ADMIN_EMAIL],  # Your business email
                fail_silently=False,
            )
            
            # Send confirmation to customer
            customer_message = f"""
            Dear {name},
            
            Thank you for contacting Tawari Digital!
            
            We have received your message and will get back to you within 24 hours.
            
            Your message:
            "{message}"
            
            Best regards,
            Tawari Digital Team
            
            ---
            Tawari Digital Limited
            Westlands Commercial Centre
            Ring Rd Parklands, Nairobi
            +254 712 007 722
            tawaridigital@gmail.com
            """
            
            send_mail(
                'Thank you for contacting Tawari Digital',
                customer_message,
                settings.DEFAULT_FROM_EMAIL,
                [email],
                fail_silently=True,
            )
            
            return Response({
                'success': True,
                'message': 'Your message has been sent successfully!'
            })
        
        except Exception as e:
            return Response({
                'success': False,
                'message': f'Failed to send message: {str(e)}'
            }, status=500)
     