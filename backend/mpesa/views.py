import json
import logging
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods

from .models import MpesaTransaction
from .utils import initiate_stk_push, query_stk_status

logger = logging.getLogger(__name__)


@csrf_exempt
@require_http_methods(["POST"])
def stk_push(request):
    """
    Initiate STK Push.
    POST /api/mpesa/stk-push/
    Body: { "phone": "0712345678", "amount": 100, "account_ref": "ORDER001", "description": "Payment for order" }
    """
    try:
        data = json.loads(request.body)

        phone = data.get("phone", "").strip()
        amount = data.get("amount")
        account_ref = data.get("account_ref", "Payment").strip()
        description = data.get("description", "Payment").strip()

        # ── Validation ──────────────────────────────
        errors = {}
        if not phone:
            errors["phone"] = "Phone number is required."
        if not amount:
            errors["amount"] = "Amount is required."
        elif float(amount) < 1:
            errors["amount"] = "Amount must be at least KES 1."
        if not account_ref:
            errors["account_ref"] = "Account reference is required."

        if errors:
            return JsonResponse({"success": False, "errors": errors}, status=400)

        # ── Initiate STK Push ────────────────────────
        response = initiate_stk_push(
            phone=phone,
            amount=amount,
            account_ref=account_ref,
            description=description,
        )

        # ResponseCode "0" means the push was sent successfully
        if response.get("ResponseCode") == "0":
            # Save transaction to DB
            transaction = MpesaTransaction.objects.create(
                phone_number=phone,
                amount=amount,
                account_reference=account_ref,
                description=description,
                merchant_request_id=response.get("MerchantRequestID", ""),
                checkout_request_id=response.get("CheckoutRequestID", ""),
                status="pending",
            )

            return JsonResponse({
                "success": True,
                "message": "STK Push sent! Check your phone and enter your M-Pesa PIN.",
                "checkout_request_id": response.get("CheckoutRequestID"),
                "transaction_id": transaction.id,
            })
        else:
            return JsonResponse({
                "success": False,
                "message": response.get("ResponseDescription", "Failed to initiate payment."),
            }, status=400)

    except json.JSONDecodeError:
        return JsonResponse({"success": False, "message": "Invalid JSON body."}, status=400)
    except Exception as e:
        logger.error(f"STK Push error: {e}")
        return JsonResponse({"success": False, "message": "An error occurred. Please try again."}, status=500)


@csrf_exempt
@require_http_methods(["POST"])
def mpesa_callback(request):
    """
    M-Pesa sends payment result here automatically.
    POST /api/mpesa/callback/
    This URL must be publicly accessible (use ngrok in development).
    """
    try:
        data = json.loads(request.body)
        logger.info(f"M-Pesa Callback received: {json.dumps(data, indent=2)}")

        stk_callback = data.get("Body", {}).get("stkCallback", {})
        checkout_request_id = stk_callback.get("CheckoutRequestID")
        result_code = stk_callback.get("ResultCode")
        result_desc = stk_callback.get("ResultDesc", "")

        try:
            transaction = MpesaTransaction.objects.get(checkout_request_id=checkout_request_id)
        except MpesaTransaction.DoesNotExist:
            logger.warning(f"Transaction not found: {checkout_request_id}")
            return JsonResponse({"ResultCode": 0, "ResultDesc": "Accepted"})

        if result_code == 0:
            # Payment successful — extract details from callback metadata
            items = stk_callback.get("CallbackMetadata", {}).get("Item", [])
            meta = {item["Name"]: item.get("Value") for item in items}

            transaction.status = "success"
            transaction.mpesa_receipt_number = meta.get("MpesaReceiptNumber", "")
            transaction.result_desc = result_desc
        else:
            # Payment failed or cancelled
            transaction.status = "failed" if result_code != 1032 else "cancelled"
            transaction.result_desc = result_desc

        transaction.save()

        # Always return 0 to Safaricom to acknowledge receipt
        return JsonResponse({"ResultCode": 0, "ResultDesc": "Accepted"})

    except Exception as e:
        logger.error(f"Callback processing error: {e}")
        return JsonResponse({"ResultCode": 0, "ResultDesc": "Accepted"})


@require_http_methods(["GET"])
def check_payment_status(request, transaction_id):
    """
    Frontend polls this to check if payment was completed.
    GET /api/mpesa/status/<transaction_id>/
    """
    try:
        transaction = MpesaTransaction.objects.get(id=transaction_id)

        # If still pending, query Safaricom directly
        if transaction.status == "pending" and transaction.checkout_request_id:
            try:
                result = query_stk_status(transaction.checkout_request_id)
                result_code = result.get("ResultCode")

                if result_code == "0":
                    transaction.status = "success"
                    transaction.save()
                elif result_code is not None and result_code != "0":
                    transaction.status = "failed"
                    transaction.result_desc = result.get("ResultDesc", "")
                    transaction.save()
            except Exception as e:
                logger.warning(f"Status query failed: {e}")

        return JsonResponse({
            "success": True,
            "status": transaction.status,
            "mpesa_receipt": transaction.mpesa_receipt_number,
            "amount": str(transaction.amount),
            "phone": transaction.phone_number,
            "result_desc": transaction.result_desc,
        })

    except MpesaTransaction.DoesNotExist:
        return JsonResponse({"success": False, "message": "Transaction not found."}, status=404)
    except Exception as e:
        logger.error(f"Status check error: {e}")
        return JsonResponse({"success": False, "message": "Error checking status."}, status=500)