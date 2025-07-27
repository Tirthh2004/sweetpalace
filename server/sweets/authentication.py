from django.contrib.auth.backends import BaseBackend
from django.contrib.auth.models import AnonymousUser
from .models import User

class CustomUser:
    """
    Custom user class to work with JWT and MongoEngine
    """
    def __init__(self, mongo_user):
        self.id = str(mongo_user.id)
        self.email = mongo_user.email
        self.name = mongo_user.name
        self.first_name = mongo_user.name  # For JWT compatibility
        self.is_authenticated = True
        self.is_anonymous = False
        self.is_active = True

    def __str__(self):
        return self.email

class MongoEngineBackend(BaseBackend):
    """
    Custom authentication backend for MongoEngine User model
    """
    def authenticate(self, request, email=None, password=None, **kwargs):
        if email is None or password is None:
            return None
        
        try:
            mongo_user = User.objects(email=email).first()
            if mongo_user and mongo_user.check_password(password):
                return CustomUser(mongo_user)
        except User.DoesNotExist:
            return None
        return None

    def get_user(self, user_id):
        try:
            mongo_user = User.objects(id=user_id).first()
            if mongo_user:
                return CustomUser(mongo_user)
        except User.DoesNotExist:
            return None
        return None
