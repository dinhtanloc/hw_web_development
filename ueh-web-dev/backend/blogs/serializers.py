from rest_framework import serializers
from .models import BlogPost

class BlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogPost
        fields = '__all__'

    def get_imgUrl(self, obj):
        request = self.context.get('request')
        return request.build_absolute_uri(obj.imgUrl.url)
