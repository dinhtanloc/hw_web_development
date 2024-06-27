from django.shortcuts import render
from django.http import JsonResponse
from .models import User,Profile
from rest_framework.views import APIView

from .serializers import MyTokenObtainPairSerializer , RegisterSerializer,ProfileSerializer,ChangePasswordSerializer, StaffTokenObtainPairSerializer,UserSerializer
from django.http import JsonResponse

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from .permissions import IsStaffUser


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer


# Get All Routes

@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token/',
        '/api/register/',
        '/api/token/refresh/'
    ]
    return Response(routes)



@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def testEndPoint(request):
    if request.method == 'GET':
        user_info = {
            'id': request.user.id,
            'username': request.user.username,
            'email': request.user.email,
        }
        data = f"Congratulations {request.user}, your API just responded to GET request"
        return Response({'response': user_info}, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        text = "Hello buddy"
        data = f'Congratulations, your API just responded to POST request with text: {text}'
        return Response({'response': data}, status=status.HTTP_200_OK)
    return Response({}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def isStaffEndpoint(request):
    if request.method == 'GET':
        is_staff = request.user.is_staff
        serializer = UserSerializer(request.user)
        return Response({"is_staff": is_staff, "staff":serializer.data})


@api_view(['GET'])
@permission_classes([IsAuthenticated, IsStaffUser])  
def staff_list_view(request):
    if request.method == 'GET':
        staff_users = User.objects.filter(is_staff=True)
        serializer = UserSerializer(staff_users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET', 'PATCH'])
@permission_classes([IsAuthenticated])
def profileView(request):
    if request.method == "GET":
        user_profile = Profile.objects.get(user=request.user)
        serializer = ProfileSerializer(user_profile)
        return Response(serializer.data)
    elif request.method == "PATCH":
        user_profile = Profile.objects.get(user=request.user)
        serializer = ProfileSerializer(user_profile, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:print(serializer.data)
        if 'image' in request.FILES:
            image_file = request.FILES.get('image')
            user_profile.image = image_file
            user_profile.save()
        if 'current_password' in request.data and 'new_password' in request.data and 'confirm_password' in request.data:
            current_password = request.data['current_password']
            new_password = request.data['new_password']
            confirm_password = request.data['confirm_password']
            if not request.user.check_password(current_password):
                return Response({'error': 'Current password is incorrect'}, status=status.HTTP_400_BAD_REQUEST)
            if new_password != confirm_password:
                return Response({'error': 'New password and confirm password do not match'}, status=status.HTTP_400_BAD_REQUEST)
            request.user.set_password(new_password)
            request.user.save()

            return Response({'message': 'Password changed successfully'}, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    


