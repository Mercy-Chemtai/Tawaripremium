from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from orders.views import OrderViewSet
from payments.views import MpesaStkPushView, MpesaCallbackView
from contact.views import ContactMessageView
from training.views import TrainingEnrollmentView
router = DefaultRouter()
router.register(r'orders', OrderViewSet, basename='order')

urlpatterns = [
    path("admin/", admin.site.urls),
    
    # All accounts/auth routes under /api/
    path("api/", include("accounts.urls")),
     
    # Orders
    path('api/', include(router.urls)),
    
    # Payments
    path('api/payments/mpesa/stk-push/', MpesaStkPushView.as_view(), name='mpesa-stk-push'),
    path('api/payments/mpesa/callback/', MpesaCallbackView.as_view(), name='mpesa-callback'),
    
    # Contact
    path('api/contact/send/', ContactMessageView.as_view(), name='contact-send'),
    
    # Training
    path('api/training/enroll/', TrainingEnrollmentView.as_view(), name='training-enroll'),
]