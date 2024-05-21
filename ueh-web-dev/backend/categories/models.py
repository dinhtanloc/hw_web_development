from django.db import models
from django.db.models.functions import Replace


# Create your models here.
class Product(models.Model):
    brand = models.CharField(max_length=100)
    rating = models.IntegerField()
    carName = models.CharField(max_length=100)
    imgUrl = models.URLField()
    model = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    speed = models.CharField(max_length=50)
    gps = models.CharField(max_length=100)
    seatType = models.CharField(max_length=100)
    automatic = models.CharField(max_length=50)
    description = models.TextField()

    def __str__(self):
        return self.car_name
    

