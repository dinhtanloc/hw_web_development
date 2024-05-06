from django.shortcuts import render
from django.http import JsonResponse
from .models import User,Profile

from .serializers import MyTokenObtainPairSerializer, RegisterSerializer,ProfileSerializer,ChangePasswordSerializer
from django.http import JsonResponse

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes


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


# @api_view(['GET', 'POST'])
# @permission_classes([IsAuthenticated])
# def testEndPoint(request):
#     if request.method == 'GET':
#         data = f"Congratulation {request.user}, your API just responded to GET request"
#         return Response({'response': JsonResponse(request.user)}, status=status.HTTP_200_OK)
#     elif request.method == 'POST':
#         text = "Hello buddy"
#         data = f'Congratulation your API just responded to POST request with text: {text}'
#         return Response({'response': data}, status=status.HTTP_200_OK)
#     return Response({}, status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def testEndPoint(request):
    if request.method == 'GET':
        user_info = {
            'id': request.user.id,
            'username': request.user.username,
            'email': request.user.email,
            # Thêm các thông tin khác của người dùng mà bạn muốn hiển thị
        }
        data = f"Congratulations {request.user}, your API just responded to GET request"
        return Response({'response': user_info}, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        text = "Hello buddy"
        data = f'Congratulations, your API just responded to POST request with text: {text}'
        return Response({'response': data}, status=status.HTTP_200_OK)
    return Response({}, status=status.HTTP_400_BAD_REQUEST)


# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def get_profile(request):
#     try:
#         profile = Profile.objects.get(user=request.user)
#         serializer = ProfileSerializer(profile)
#         return Response(serializer.data)
#     except Profile.DoesNotExist:
#         return Response({"error": "Profile does not exist"}, status=status.HTTP_404_NOT_FOUND)
    
# class UserProfileView(APIView):
#     def get(self, request):
#         user_profile = Profile.objects.get(user=request.user)
#         serializer = ProfileSerializer(user_profile)
#         return Response(serializer.data)

#     def put(self, request):
#         user_profile = Profile.objects.get(user=request.user)
#         serializer = ProfileSerializer(user_profile, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT'])
@permission_classes([IsAuthenticated])    
def profileView(request):
    if request.method == "GET":
        user_profile = Profile.objects.get(user=request.user)
        serializer = ProfileSerializer(user_profile)
        return Response(serializer.data)
    elif request.method == "PUT":
        user_profile = Profile.objects.get(user=request.user)
        serializer = ProfileSerializer(user_profile, data=request.data)
        if request.files.get('image'):
            image_file = request.FILES.get('image')
            user_profile = Profile.objects.get(id=request.user.id)
            user_profile.image = image_file
            user_profile.save()
        if 'current_password' in request.data and 'new_password' in request.data and 'confirm_password' in request.data:
            password_serializer = ChangePasswordSerializer(data=request.data, context={'request': request})
            if password_serializer.is_valid():
                request.user.set_password(request.data['new_password'])
                request.user.save()
                return Response({'message': 'Password changed successfully'}, status=status.HTTP_200_OK)
            else:
                return Response(password_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['POST'])
@permission_classes([IsAuthenticated])    
def upload_image(request):
    image_file = request.FILES.get('image')
    if image_file:
        user_profile = Profile.objects.get(id=request.user.id)
        user_profile.image = image_file
        user_profile.save()
        return Response({'message': 'Image uploaded successfully.'}, status=status.HTTP_200_OK)
    return Response({'message': 'No image uploaded.'}, status=status.HTTP_400_BAD_REQUEST)

