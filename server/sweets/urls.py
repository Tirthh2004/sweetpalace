from django.urls import path
from .views import register_user, login_user, protected_view

urlpatterns = [
    path('auth/register/', register_user, name='register'),
    path('auth/login/', login_user, name='login'),
    path('protected/', protected_view),
]
