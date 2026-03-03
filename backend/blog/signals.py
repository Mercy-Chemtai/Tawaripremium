from django.db.models.signals import post_save
from django.dispatch import receiver
from django.core.mail import send_mass_mail
from .models import NewsletterSubscriber, BlogPost

@receiver(post_save, sender=BlogPost)
def send_blog_newsletter(sender, instance, created, **kwargs):
    if created:
        subscribers = NewsletterSubscriber.objects.all()

        subject = f"New Blog Post: {instance.title}"
        message = f"""
        Hello,

        We just published a new blog post.

        {instance.title}

        Read here:
        https://yourdomain.com/blog/{instance.slug}
        """

        datatuple = [
            (subject, message, "noreply@yourdomain.com", [sub.email])
            for sub in subscribers
        ]

        send_mass_mail(datatuple, fail_silently=False)
