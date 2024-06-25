from django.db import models
from django.db.models.functions import Replace


# Create your models here.
class Product(models.Model):
    brand = models.CharField(max_length=100)
    rating = models.IntegerField()
    quantity=models.IntegerField(default=0)
    carName = models.CharField(max_length=100)
    imgUrl = models.URLField()
    model = models.CharField(max_length=100)
    price = models.IntegerField()
    speed = models.CharField(max_length=50)
    gps = models.CharField(max_length=100)
    seatType = models.CharField(max_length=100)
    automatic = models.CharField(max_length=50)
    description = models.TextField()

    def __str__(self):
        return self.carName
    

    @classmethod
    def get_car_name_from_img_url(cls, img_url):
        try:
            product = cls.objects.get(imgUrl=img_url)
            return product.carName
        except cls.DoesNotExist:
            return None
    


