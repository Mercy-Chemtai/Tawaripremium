import base64
import requests
from datetime import datetime
from django.conf import settings


def get_access_token():
    """Get OAuth access token from Safaricom."""
    url = f"{settings.MPESA_BASE_URL}/oauth/v1/generate?grant_type=client_credentials"

    credentials = f"{settings.MPESA_CONSUMER_KEY}:{settings.MPESA_CONSUMER_SECRET}"
    encoded = base64.b64encode(credentials.encode()).decode()

    response = requests.get(
        url,
        headers={"Authorization": f"Basic {encoded}"},
        timeout=30,
    )
    response.raise_for_status()
    return response.json()["access_token"]


def get_timestamp():
    """Return current timestamp in format YYYYMMDDHHmmss."""
    return datetime.now().strftime("%Y%m%d%H%M%S")


def get_password(timestamp):
    """Generate the base64 password for STK Push."""
    shortcode = settings.MPESA_SHORTCODE
    passkey = settings.MPESA_PASSKEY
    raw = f"{shortcode}{passkey}{timestamp}"
    return base64.b64encode(raw.encode()).decode()


def format_phone(phone):
    """
    Convert phone number to 2547XXXXXXXX format.
    Accepts: 07XX, +2547XX, 2547XX
    """
    phone = str(phone).strip().replace(" ", "").replace("-", "")
    if phone.startswith("+"):
        phone = phone[1:]
    if phone.startswith("0"):
        phone = "254" + phone[1:]
    if not phone.startswith("254"):
        phone = "254" + phone
    return phone


def initiate_stk_push(phone, amount, account_ref, description="Payment"):
    """
    Initiate M-Pesa STK Push request.

    Args:
        phone (str): Customer phone number
        amount (int): Amount in KES (whole number)
        account_ref (str): Account reference (shown to customer)
        description (str): Transaction description

    Returns:
        dict: Safaricom API response
    """
    access_token = get_access_token()
    timestamp = get_timestamp()
    password = get_password(timestamp)
    formatted_phone = format_phone(phone)

    url = f"{settings.MPESA_BASE_URL}/mpesa/stkpush/v1/processrequest"

    payload = {
        "BusinessShortCode": settings.MPESA_SHORTCODE,
        "Password": password,
        "Timestamp": timestamp,
        "TransactionType": "CustomerPayBillOnline",
        "Amount": int(amount),  # Must be whole number
        "PartyA": formatted_phone,  # Customer phone
        "PartyB": settings.MPESA_SHORTCODE,  # Your paybill
        "PhoneNumber": formatted_phone,  # Phone that receives STK prompt
        "CallBackURL": settings.MPESA_CALLBACK_URL,
        "AccountReference": account_ref,
        "TransactionDesc": description,
    }

    response = requests.post(
        url,
        json=payload,
        headers={
            "Authorization": f"Bearer {access_token}",
            "Content-Type": "application/json",
        },
        timeout=30,
    )
    response.raise_for_status()
    return response.json()


def query_stk_status(checkout_request_id):
    """
    Query the status of an STK push request.

    Args:
        checkout_request_id (str): The CheckoutRequestID from initiate_stk_push

    Returns:
        dict: Safaricom API response
    """
    access_token = get_access_token()
    timestamp = get_timestamp()
    password = get_password(timestamp)

    url = f"{settings.MPESA_BASE_URL}/mpesa/stkpushquery/v1/query"

    payload = {
        "BusinessShortCode": settings.MPESA_SHORTCODE,
        "Password": password,
        "Timestamp": timestamp,
        "CheckoutRequestID": checkout_request_id,
    }

    response = requests.post(
        url,
        json=payload,
        headers={
            "Authorization": f"Bearer {access_token}",
            "Content-Type": "application/json",
        },
        timeout=30,
    )
    response.raise_for_status()
    return response.json()