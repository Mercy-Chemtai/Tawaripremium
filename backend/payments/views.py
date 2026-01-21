# ============================================
# payments/views.py - M-Pesa Integration
# ============================================
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import requests
import base64
from datetime import datetime
from django.conf import settings
from rest_framework.permissions import IsAuthenticated

class MpesaStkPushView(APIView):
    """Initiate M-Pesa STK Push"""
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        # PLACEHOLDER: Implement actual M-Pesa integration
        # You'll need to:
        # 1. Get M-Pesa access token
        # 2. Make STK push request
        # 3. Store transaction details
        
        phone_number = request.data.get('phone_number')
        amount = request.data.get('amount')
        order_id = request.data.get('order_id')
        
        # Format phone number (remove leading zero, add 254)
        if phone_number.startswith('0'):
            phone_number = '254' + phone_number[1:]
        
        # M-Pesa API credentials (get from environment variables)
        consumer_key = settings.MPESA_CONSUMER_KEY
        consumer_secret = settings.MPESA_CONSUMER_SECRET
        business_short_code = settings.MPESA_SHORTCODE
        passkey = settings.MPESA_PASSKEY
        
        # Get access token
        access_token = self.get_mpesa_access_token(consumer_key, consumer_secret)
        
        # Prepare STK push request
        timestamp = datetime.now().strftime('%Y%m%d%H%M%S')
        password = base64.b64encode(
            f"{business_short_code}{passkey}{timestamp}".encode()
        ).decode('utf-8')
        
        stk_push_url = 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest'
        
        headers = {
            'Authorization': f'Bearer {access_token}',
            'Content-Type': 'application/json'
        }
        
        payload = {
            'BusinessShortCode': business_short_code,
            'Password': password,
            'Timestamp': timestamp,
            'TransactionType': 'CustomerPayBillOnline',
            'Amount': int(amount),
            'PartyA': phone_number,
            'PartyB': business_short_code,
            'PhoneNumber': phone_number,
            'CallBackURL': f'{settings.SITE_URL}/api/payments/mpesa/callback/',
            'AccountReference': f'Order{order_id}',
            'TransactionDesc': f'Payment for Order #{order_id}'
        }
        
        try:
            response = requests.post(stk_push_url, json=payload, headers=headers)
            response_data = response.json()
            
            return Response({
                'success': True,
                'message': 'STK push sent successfully',
                'checkout_request_id': response_data.get('CheckoutRequestID'),
                'response': response_data
            })
        
        except Exception as e:
            return Response({
                'success': False,
                'message': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    def get_mpesa_access_token(self, consumer_key, consumer_secret):
        """Get M-Pesa access token"""
        api_url = 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials'
        
        response = requests.get(
            api_url,
            auth=(consumer_key, consumer_secret)
        )
        
        return response.json().get('access_token')


class MpesaCallbackView(APIView):
    """Handle M-Pesa callback"""
    
    def post(self, request):
        # PLACEHOLDER: Process M-Pesa callback
        # Update order payment status based on callback
        
        data = request.data
        
        # Extract callback data
        result_code = data.get('Body', {}).get('stkCallback', {}).get('ResultCode')
        
        if result_code == 0:
            # Payment successful
            # Update order status
            pass
        else:
            # Payment failed
            pass
        
        return Response({'ResultCode': 0, 'ResultDesc': 'Accepted'})
