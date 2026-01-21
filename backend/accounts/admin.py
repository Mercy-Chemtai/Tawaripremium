from django.contrib import admin
from .models import CustomUser

@admin.register(CustomUser)
class CustomUserAdmin(admin.ModelAdmin):
    list_display = ('email', 'name', 'is_staff', 'is_active', 'date_joined')
    search_fields = ('email', 'name')
    list_filter = ('is_staff', 'is_active')
    ordering = ('-date_joined',)
    fieldsets = (
        (None, {
            'fields': ('email', 'name', 'password')
        }),
        ('Permissions', {
            'fields': ('is_active', 'is_staff', 'is_superuser')
        }),
        ('Important dates', {
            'fields': ('last_login', 'date_joined')
        }),
    )
