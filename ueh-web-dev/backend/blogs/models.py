from django.db import models

# Create your models here.
class BlogPost(models.Model):
    title = models.CharField(max_length=200)
    author = models.CharField(max_length=100)
    date = models.DateField()
    time = models.TimeField()
    imgUrl = models.ImageField(upload_to='all-images/blog_images/')
    description = models.TextField()
    quote = models.TextField()

    def __str__(self):
        return self.title
    
   


