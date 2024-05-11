from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

@api_view(['POST'])
def sign_in_view(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(request, username=username, password=password)
    if user is not None:
        login(request, user)
        return Response({"message": "Logged in"}, status=status.HTTP_200_OK)
    else:
        return Response({"message": "Failed"}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['POST'])
def sign_up_view(request):
    username = request.data.get('username')
    email = request.data.get('email')
    password = request.data.get('password')
    
    if User.objects.filter(username=username).exists():
        return Response({"message": "Username already taken"}, status=status.HTTP_400_BAD_REQUEST)
    else:
        user = User.objects.create_user(username, email, password)
        login(request, user)
        response = Response({"message": "User registered successfully"}, status=status.HTTP_201_CREATED)
        return response
