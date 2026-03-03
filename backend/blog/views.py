from django.shortcuts import render

# Create your views here.
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import NewsletterSubscriber

@api_view(["POST"])
def subscribe_newsletter(request):
    email = request.data.get("email")

    if not email:
        return Response({"error": "Email required"}, status=400)

    obj, created = NewsletterSubscriber.objects.get_or_create(email=email)

    return Response({"success": True, "created": created})
