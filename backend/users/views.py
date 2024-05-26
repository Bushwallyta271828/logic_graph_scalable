from django.contrib.auth import authenticate, login, logout, update_session_auth_hash
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .decorators import require_authentication


@api_view(['GET'])
def account_details(request):
    if request.user.is_authenticated:
        return Response({"authenticated": True, "username": request.user.username})
    else:
        return Response({"authenticated": False})

@api_view(['POST'])
def sign_in(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(request, username=username, password=password)
    if user is not None:
        login(request, user)
        return Response({"message": "Logged in"})
    else:
        return Response({"detail": "Failed"}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['POST'])
def create_account(request):
    username = request.data.get('username')
    password = request.data.get('password')
    confirm_password = request.data.get('confirm-password')
   
    if password != confirm_password:
        return Response({"detail": "The provided passwords don't match"}, status=status.HTTP_400_BAD_REQUEST)
    elif User.objects.filter(username=username).exists():
        return Response({"detail": "Username already taken"}, status=status.HTTP_400_BAD_REQUEST)
    else:
        user = User.objects.create_user(username=username, password=password)
        login(request, user)
        return Response({"message": "User registered successfully"}, status=status.HTTP_201_CREATED)

@api_view(['POST'])
def sign_out(request):
    if request.user.is_authenticated:
        logout(request)
    return Response({"message": "User successfully logged out"})

@api_view(['DELETE'])
@require_authentication
def delete_account(request):
    request.user.delete()
    logout(request)
    return Response({"message": "User deleted successfully"})

@api_view(['PATCH'])
@require_authentication
def change_username(request):
    new_username = request.data.get('new-username')
    if User.objects.filter(username=new_username).exists():
        return Response({"detail": "Username already taken"}, status=status.HTTP_400_BAD_REQUEST)
    request.user.username = new_username
    request.user.save()
    return Response({"message": "Username changed successfully"})

@api_view(['PATCH'])
@require_authentication
def change_password(request):
    new_password = request.data.get('new-password')
    confirm_new_password = request.data.get('confirm-new-password')
    
    if new_password != confirm_new_password:
        return Response({"detail": "The provided passwords don't match"}, status=status.HTTP_400_BAD_REQUEST)
    else:
        request.user.set_password(new_password)
        request.user.save()
        update_session_auth_hash(request, request.user)
        return Response({"message": "Password changed successfully"})
