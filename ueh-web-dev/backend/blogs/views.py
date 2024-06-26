from django.shortcuts import render
from rest_framework import viewsets
from .models import BlogPost
from .serializers import BlogSerializer
from .populate_data import blog_data



# Create your views here.
try:
    if not BlogPost.objects.exists():
        for blog in blog_data:
            BlogPost.objects.create(
                title=blog["title"],
                author=blog["author"],
                date=blog["date"],
                time=blog["time"],
                imgUrl=blog["img_url"],
                description=blog["description"],
                quote=blog["quote"]
            )

        print("Data imported successfully!")
    else:
        print("Data already exists. No import needed.")
except Exception as e:
    print('Database blogs_blog cần được khởi tạo')

class BlogViewSet(viewsets.ModelViewSet):
    queryset = BlogPost.objects.all().order_by('id')
    serializer_class = BlogSerializer