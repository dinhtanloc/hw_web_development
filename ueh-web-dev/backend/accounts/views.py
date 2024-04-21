from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from datetime import datetime, timedelta
from django.http import JsonResponse,HttpResponse
import jwt
import bcrypt
import os
from dotenv import load_dotenv

load_dotenv()

def login_view(request):
    if request.method == 'POST':
        username = request.POST.get('email')
        password = request.POST.get('password')
        # Kiểm tra username và password
        if username == 'abc@gmail.com' and password == '123':
            return JsonResponse({'message': f'Login successful with {username} and {password}'})
        else:
            return JsonResponse({'error': 'Invalid credentials'}, status=400)
    else:
        return HttpResponse("Method not allowed", status=405)

@login_required
def logout_view(request):
    logout(request)
    return JsonResponse({'message': 'Logout successful'})

def register_view(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')

        if User.objects.filter(username=email).exists():
            return JsonResponse({'error': 'User already exists'}, status=400)

        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        user = User.objects.create_user(username=email, password=hashed_password)
        login(request, user)
        return JsonResponse({'message': 'Registration successful'})

# def secrets_view(request):
#     if request.user.is_authenticated:
#         return JsonResponse({'message': 'Welcome to the secret page'})
#     else:
#         return JsonResponse({'error': 'You are not logged in'}, status=401)
