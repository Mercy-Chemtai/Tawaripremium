
from rest_framework.views import APIView
from rest_framework.response import Response
from django.core.mail import send_mail
from django.conf import settings
# ============================================
# training/views.py - Training Enrollment
# ============================================
class TrainingEnrollmentView(APIView):
    """Handle training enrollment submissions"""
    
    def post(self, request):
        full_name = request.data.get('full_name')
        email = request.data.get('email')
        phone = request.data.get('phone')
        course = request.data.get('course')
        
        # Email to admin
        admin_subject = f'New Training Enrollment: {course}'
        admin_message = f"""
        New training enrollment:
        
        Name: {full_name}
        Email: {email}
        Phone: {phone}
        Course: {course}
        
        Please contact the student to complete enrollment.
        """
        
        try:
            # Send to admin
            send_mail(
                admin_subject,
                admin_message,
                settings.DEFAULT_FROM_EMAIL,
                [settings.ADMIN_EMAIL],
                fail_silently=False,
            )
            
            # Send confirmation to student
            student_message = f"""
            Dear {full_name},
            
            Thank you for your interest in our training program!
            
            Course: {course}
            
            Our training coordinator will contact you within 24 hours at {phone} or {email} 
            with course details, schedule options, and payment information.
            
            If you have any questions, feel free to call us at +254 712 007 722.
            
            Best regards,
            Tawari Digital Training Team
            """
            
            send_mail(
                'Training Enrollment Confirmation',
                student_message,
                settings.DEFAULT_FROM_EMAIL,
                [email],
                fail_silently=True,
            )
            
            return Response({
                'success': True,
                'message': 'Enrollment request submitted successfully!'
            })
        
        except Exception as e:
            return Response({
                'success': False,
                'message': f'Failed to submit enrollment: {str(e)}'
            }, status=500)
