from django.contrib import admin
from .models import BlogPost

# Register your models here.

class BlogPostAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'date', 'time', 'imgUrl')
    search_fields = ('title', 'author')
    list_filter = ('date', 'author')
    ordering = ('-date',)

admin.site.register(BlogPost, BlogPostAdmin)