from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter

from orders.views import OrderViewSet
from contact.views import ContactMessageView
from training.views import TrainingEnrollmentView
from blog.views import subscribe_newsletter

router = DefaultRouter()
router.register(r'orders', OrderViewSet, basename='order')
# No products/services — those use dummy data on the frontend

urlpatterns = [
    path("admin/", admin.site.urls),

    # Auth
    path("api/", include("accounts.urls")),

    # Products, Services, Orders (via router)
    path("api/", include(router.urls)),

    # M-Pesa
    path("api/mpesa/", include("mpesa.urls")),

    # Contact
    path("api/contact/send/", ContactMessageView.as_view(), name="contact-send"),

    # Training
    path("api/training/enroll/", TrainingEnrollmentView.as_view(), name="training-enroll"),

    # Newsletter
    path("api/newsletter/subscribe/", subscribe_newsletter),
]