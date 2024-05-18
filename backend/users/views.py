from django.contrib.auth import authenticate, login, logout, update_session_auth_hash
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status


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
        return Response({"message": "Failed"}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['POST'])
def create_account(request):
    username = request.data.get('username')
    password = request.data.get('password')
    
    if User.objects.filter(username=username).exists():
        return Response({"message": "Username already taken"}, status=status.HTTP_400_BAD_REQUEST)
    else:
        user = User.objects.create_user(username=username, password=password)
        login(request, user)
        return Response({"message": "User registered successfully"}, status=status.HTTP_201_CREATED)

@api_view(['POST'])
def sign_out(request):
    if request.user.is_authenticated:
        logout(request)
    return Response({"message": "User successfully logged out"})

@api_view(['POST'])
def delete_account(request):
    if request.user.is_authenticated:
        request.user.delete()
        logout(request)
        return Response({"message": "User deleted successfully"})
    else:
        return Response({"message": "Not signed in"}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['POST'])
def change_username(request):
    if request.user.is_authenticated:
        new_username = request.data.get('new-username')
        if User.objects.filter(username=new_username).exists():
            return Response({"message": "Username already taken"}, status=status.HTTP_400_BAD_REQUEST)
        request.user.username = new_username
        request.user.save()
        return Response({"message": "Username changed successfully"})
    else:
        return Response({"message": "Not signed in"}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['POST'])
def change_password(request):
    if request.user.is_authenticated:
        request.user.set_password(request.data.get('new-password'))
        request.user.save()
        update_session_auth_hash(request, request.user)
        return Response({"message": "Password changed successfully"})
    else:
        return Response({"message": "Not signed in"}, status=status.HTTP_401_UNAUTHORIZED)
