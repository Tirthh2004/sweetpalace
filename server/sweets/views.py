from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from .models import User
from django.contrib.auth.hashers import make_password, check_password
from django.contrib.auth import authenticate
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from .models import Sweet
from .serializers import SweetSerializer
from .models import Sweet
from .serializers import SweetSerializer
from django.http import JsonResponse

def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    refresh["email"] = user.email  # Add email into JWT token
    refresh["name"] = user.name  # Add name into JWT token
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

    if User.objects(email=email).first():
        return Response({'detail': 'Email already registered.'}, status=400)

    user = User(email=email, name=name, password=make_password(password))
    user.save()

    # Generate JWT tokens for the new user
    tokens = get_tokens_for_user(user)

    return Response({
        'user': {   
            'id': str(user.id),
            'email': user.email,
            'name': user.name,
        },
        'access': tokens['access'],
        'refresh': tokens['refresh'],
        'detail': 'Registered successfully.'
    })

@api_view(['POST'])
@permission_classes([AllowAny])
def login_user(request):
    email = request.data.get('email')
    password = request.data.get('password')

    if not email or not password:
        return Response({'detail': 'Email and password are required.'}, status=400)

    user = User.objects(email=email).first()

    if not user or not check_password(password, user.password):
        return Response({'detail': 'Invalid credentials.'}, status=401)

    # Generate JWT tokens
    tokens = get_tokens_for_user(user)

    return Response({
        'user': {
            'id': str(user.id),
            'email': user.email,
            'name': user.name,
        },
        'access': tokens['access'],
        'refresh': tokens['refresh'],
        'detail': 'Login successful.'
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
    
    # sweets 

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_sweet(request):
    serializer = SweetSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_sweets(request):
    sweets = Sweet.objects.all()
    serializer = SweetSerializer(sweets, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def search_sweets(request):
    query = request.GET.get('q', '')
    category = request.GET.get('category', '')
    min_price = request.GET.get('min_price')
    max_price = request.GET.get('max_price')

    sweets = Sweet.objects.all()

    if query:
        sweets = sweets.filter(name__icontains=query)
    if category:
        sweets = sweets.filter(category=category)
    if min_price:
        sweets = sweets.filter(price__gte=min_price)
    if max_price:
        sweets = sweets.filter(price__lte=max_price)

    serializer = SweetSerializer(sweets, many=True)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_sweet(request, id):
    try:
        sweet = Sweet.objects.get(id=id)
    except Sweet.DoesNotExist:
        return Response({'error': 'Sweet not found'}, status=404)

    serializer = SweetSerializer(sweet, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def delete_sweet(request, id):
    try:
        sweet = Sweet.objects.get(id=id)
        sweet.delete()
        return Response({'message': 'Sweet deleted'})
    except Sweet.DoesNotExist:
        return Response({'error': 'Sweet not found'}, status=404)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def purchase_sweet(request, sweet_id):
    try:
        sweet = Sweet.objects.get(id=sweet_id)
        qty = int(request.data.get('quantity', 1))
        if sweet.quantity >= qty:
            sweet.quantity -= qty
            sweet.save()
            return Response({'detail': 'Purchase successful'})
        else:
            return Response({'detail': 'Not enough stock'}, status=400)
    except Sweet.DoesNotExist:
        return Response({'detail': 'Sweet not found'}, status=404)

# @api_view(['POST'])
# @permission_classes([IsAdminUser])
# def restock_sweet(request, id):
#     try:
#         sweet = Sweet.objects.get(id=id)
#         amount = int(request.data.get('amount', 0))
#         sweet.quantity += amount
#         sweet.save()
#         return Response({'message': 'Restocked successfully'})
#     except Sweet.DoesNotExist:
#         return Response({'error': 'Sweet not found'}, status=404)    
    
# views.py

# @api_view(['POST'])
# @permission_classes([IsAdminUser])
# def restock_sweet(request, sweet_id):
#     sweet = Sweet.objects.get(id=sweet_id)
#     amount = int(request.data.get("amount", 0))
#     sweet.quantity += amount
#     sweet.save()
#     return Response(sweet.to_json(), status=200)

#  ✅ FIXED RESTOCK FUNCTION
@api_view(['POST'])
@permission_classes([IsAdminUser])
def restock_sweet(request, sweet_id):
    try:
        sweet = Sweet.objects.get(id=sweet_id)
        amount = int(request.data.get("amount", 0))
        sweet.quantity += amount
        sweet.save()
        
        # Use serializer for consistent response format
        serializer = SweetSerializer(sweet)
        return Response(serializer.data, status=200)
        
    except Sweet.DoesNotExist:
        return Response({"error": "Sweet not found"}, status=404)
    except ValueError:
        return Response({"error": "Invalid amount"}, status=400)



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_sweets(request):
    sweets = Sweet.objects()
    serializer = SweetSerializer(sweets, many=True)
    return Response(serializer.data)

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def delete_sweet(request, sweet_id):
    try:
        sweet = Sweet.objects.get(id=sweet_id)
        sweet.delete()
        return Response({"message": "Sweet deleted successfully."})
    except Sweet.DoesNotExist:
        return Response({"detail": "Sweet not found."}, status=404)
