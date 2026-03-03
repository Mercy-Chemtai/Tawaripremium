from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    ForgotPasswordView,
    LoginView,
    RegisterView,
    ResetPasswordView,
    UserViewSet,
    ProfileView,
    EditUserView,
    DeleteUserView,
)
from rest_framework_simplejwt.views import TokenRefreshView

router = DefaultRouter()
router.register(r"users", UserViewSet, basename="user")

urlpatterns = [
    # Authentication endpoints
    path("auth/register/", RegisterView.as_view(), name="register"),
    path("user/<int:user_id>/edit/", EditUserView.as_view(), name="edit-user"),
    path("user/<int:user_id>/delete/", DeleteUserView.as_view(), name="delete-user"),
    path("auth/login/", LoginView.as_view(), name="login"),
    path("auth/profile/", ProfileView.as_view(), name="profile"),
    path("auth/forgot-password/", ForgotPasswordView.as_view(), name="forgot-password"),
    path("auth/reset-password/", ResetPasswordView.as_view(), name="reset-password"),
    path("auth/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),

    
    # User management endpoints (admin only)
    path("", include(router.urls)),
]