# mpesa/urls.py  — URL patterns for the mpesa app
from django.urls import path
from . import views

urlpatterns = [
    path("stk-push/", views.stk_push, name="stk_push"),
    path("callback/", views.mpesa_callback, name="mpesa_callback"),
    path("status/<int:transaction_id>/", views.check_payment_status, name="payment_status"),
]


