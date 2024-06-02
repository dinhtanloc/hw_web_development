from django.db import models
from accounts.models import User
from categories.models import Product
from datetime import timedelta
from django.utils import timezone



PAYMENT_METHOD_CHOICES = [
        ('bank_transfer', 'Direct Bank Transfer'),
        ('cheque', 'Cheque Payment'),
        ('mastercard', 'Master Card'),
        ('paypal', 'Paypal'),
    ]

# Create your models here.
class Orders(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    Firstname=models.CharField(max_length=100)
    Lastname=models.CharField(max_length=100)
    email = models.EmailField()
    phoneNumber=models.CharField(max_length=100)
    address=models.CharField(max_length=100)
    total_price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    payment_method=models.CharField(null=True,choices=PAYMENT_METHOD_CHOICES)
    shipping_deadline = models.DateField(null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    note=models.CharField(max_length=1000)


    def __str__(self):
        return f"Order {self.id} by {self.user.username}"

    def update_total_price(self):
        self.total_price = sum(item.get_total_price() for item in self.orderitem_set.all())
        self.save()

   
    def save(self, *args, **kwargs):
        if not self.id:  # Only calculate shipping_deadline when creating a new order
            print('o day')
            self.created_at = timezone.now()
            self.shipping_deadline = self.created_at.date() + timedelta(days=21)
        super().save(*args, **kwargs)


class OrdersItem(models.Model):
    order = models.ForeignKey(Orders, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    unit_price = models.DecimalField(max_digits=10, decimal_places=2)  # Thêm trường unit_price
    color = models.CharField(max_length=20,null=True)
    quantity = models.PositiveIntegerField()
    total_price = models.DecimalField(max_digits=10, decimal_places=2)  # Thêm trường total_price


    def __str__(self):
        return f"{self.product.name} ({self.quantity})"

    def save(self, *args, **kwargs):
        print('meomeomeo')
        self.unit_price = self.product.price
        self.total_price = self.quantity * self.unit_price
        super().save(*args, **kwargs)
    def get_total_price(self):
        return self.total_price