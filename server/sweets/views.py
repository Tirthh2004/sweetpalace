from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    refresh["email"] = user.email  # Add email into JWT token
    refresh["name"] = user.first_name  # Add name into JWT token
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def protected_view(request):
    return Response({'message': f'Hello, {request.user.first_name}! You are authenticated.'})

@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    email = request.data.get('email')
    password = request.data.get('password')
    name = request.data.get('name')
    
    if not email or not password or not name:
        return Response({'detail': 'All fields are required.'}, status=400)
    
    if User.objects.filter(username=email).exists():
        return Response({'detail': 'Email already registered.'}, status=400)
    
    user = User.objects.create_user(username=email, email=email, password=password, first_name=name)
    
    tokens = get_tokens_for_user(user)
    
    return Response({
        'access': tokens['access'],  # ✅ Changed from 'token' to 'access'
        'refresh': tokens['refresh'], # ✅ Added refresh token
        'user': {
            'id': user.id,
            'email': user.email,
            'name': user.first_name,
        }
    })

@api_view(['POST'])
@permission_classes([AllowAny])
def login_user(request):
    email = request.data.get('email')
    password = request.data.get('password')
    
    if not email or not password:
        return Response({'detail': 'Email and password are required.'}, status=400)
    
    user = authenticate(username=email, password=password)
    
    if user is None:
        return Response({'detail': 'Invalid credentials.'}, status=401)
    
    tokens = get_tokens_for_user(user)
    
    return Response({
        'access': tokens['access'],   # ✅ Changed from 'token' to 'access'  
        'refresh': tokens['refresh'], # ✅ Added refresh token
        'user': {
            'id': user.id,
            'email': user.email,
            'name': user.first_name,
        }
    })

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_user(request):
    try:
        refresh_token = request.data.get('refresh')
        if refresh_token:
            token = RefreshToken(refresh_token)
            token.blacklist()
        return Response({'detail': 'Successfully logged out.'}, status=200)
    except Exception as e:
        return Response({'detail': 'Error logging out.'}, status=400)