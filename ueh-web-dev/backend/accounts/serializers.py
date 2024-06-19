from .models import User,Profile
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from django.contrib.auth import authenticate

from rest_framework.validators import UniqueValidator
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
import random



class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        
        # These are claims, you can add custom claims
        token['full_name'] = user.profile.full_name
        token['username'] = user.username
        token['email'] = user.email
        token['bio'] = user.profile.bio
        token['phone'] = user.profile.phone
        token['address'] = user.profile.address
        token['job'] = user.profile.job
        token['image'] = str(user.profile.image)
        token['verified'] = user.profile.verified
        # ...
        return token
    
class StaffTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        if not self.user.is_staff:
            raise serializers.ValidationError('User is not staff')
        return data


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password])
    # password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('email', 'username', 'password')

    # def validate(self, attrs):
    #     if attrs['password'] != attrs['password2']:
    #         raise serializers.ValidationError(
    #             {"password": "Password fields didn't match."})

    #     return attrs

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email']

        )

        user.set_password(validated_data['password'])
        user.save()

        return user
    
class ProfileSerializer(serializers.ModelSerializer):
    email = serializers.CharField(source='user.email', read_only=True)
    password = serializers.CharField(source='user.password', read_only=True)
    username = serializers.CharField(source='user.username', read_only=True)
    date_joined = serializers.DateTimeField(source='user.date_joined', read_only=True)
    class Meta:
        model = Profile
        fields = ['user', 'full_name','phone','address','job','username','email','password', 'bio', 'image','date_joined',
        'verified']

class ChangePasswordSerializer(serializers.Serializer):
    current_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=False)
    confirm_password = serializers.CharField(required=False)

    def validate(self, data):
        if 'new_password' in data and 'confirm_password' in data:
            if data['new_password'] != data['confirm_password']:
                raise serializers.ValidationError({'confirm_password': 'Passwords do not match'})

        user = authenticate(username=self.context['request'].user.username, password=data['current_password'])
        if not user:
            raise serializers.ValidationError({'current_password': 'Incorrect current password'})
        




class UserSerializer(serializers.ModelSerializer):
    is_staff = serializers.BooleanField(read_only=True)
    is_superuser = serializers.BooleanField(read_only=True)
    profile = ProfileSerializer(read_only=True)
    class Meta:
        model = User
        fields = ('id', 'username', 'email','date_joined','is_staff','is_superuser','profile')


