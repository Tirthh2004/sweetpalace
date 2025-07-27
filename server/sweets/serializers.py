from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import Sweet, User

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['email'] = user.email
        token['name'] = user.name
        return token

class SweetSerializer(serializers.Serializer):
    id = serializers.CharField(read_only=True)
    name = serializers.CharField()
    price = serializers.FloatField()
    original_price = serializers.FloatField(allow_null=True, required=False)
    category = serializers.CharField()
    rating = serializers.FloatField()
    reviews = serializers.IntegerField()
    description = serializers.CharField()
    image_url = serializers.CharField()
    in_stock = serializers.BooleanField()
    quantity = serializers.IntegerField()

    def create(self, validated_data):
        sweet = Sweet(**validated_data)
        sweet.save()
        return sweet

    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance

class UserSerializer(serializers.Serializer):
    id = serializers.CharField(read_only=True)
    email = serializers.EmailField()
    name = serializers.CharField()
    phone = serializers.CharField(required=False, allow_blank=True)

    def to_representation(self, instance):
        return {
            'id': str(instance.id),
            'email': instance.email,
            'name': instance.name,
            'phone': getattr(instance, 'phone', ''),
        }
