from rest_framework import serializers
from django.contrib.auth import get_user_model
import re
from .models import CustomUser

User = get_user_model()


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    confirmPassword = serializers.CharField(write_only=True)  # camelCase

    class Meta:
        model = CustomUser
        fields = ["name", "email", "password", "confirmPassword"]  # match field names

    def validate_password(self, value):
        if len(value) < 8:
            raise serializers.ValidationError("Password must be at least 8 characters")
        if not re.search(r"[A-Z]", value):
            raise serializers.ValidationError("Password must contain an uppercase letter")
        if not re.search(r"[a-z]", value):
            raise serializers.ValidationError("Password must contain a lowercase letter")
        if not re.search(r"[0-9]", value):
            raise serializers.ValidationError("Password must contain a number")
        if not re.search(r"[!@#$%^&*(),.?\":{}|<>]", value):
            raise serializers.ValidationError("Password must contain a special character")
        return value

    def validate(self, attrs):
        if attrs["password"] != attrs["confirmPassword"]:
            raise serializers.ValidationError({"confirmPassword": "Passwords do not match"})
        return attrs

    def create(self, validated_data):
        validated_data.pop("confirmPassword")  # remove before saving
        user = CustomUser.objects.create_user(
            email=validated_data["email"],
            name=validated_data["name"],
            password=validated_data["password"]
        )
        return user


class UserSerializer(serializers.ModelSerializer):
    """Serializer for listing/updating users (admin only)"""
    class Meta:
        model = User
        fields = ("id", "name", "email", "is_active", "is_staff")
        read_only_fields = ("id", "email")


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)


class ForgotPasswordSerializer(serializers.Serializer):
    email = serializers.EmailField()


class ResetPasswordSerializer(serializers.Serializer):
    uid = serializers.CharField()
    token = serializers.CharField()
    new_password = serializers.CharField(write_only=True)
    confirmPassword = serializers.CharField(write_only=True)  # camelCase

    def validate(self, attrs):
        if attrs["new_password"] != attrs["confirmPassword"]:
            raise serializers.ValidationError({"confirmPassword": "Passwords do not match"})
        return attrs
