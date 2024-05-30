from django.db import models
from accounts.models import User

PAYMENT_METHOD_CHOICES = [
        ('bank_transfer', 'Direct Bank Transfer'),
        ('cheque', 'Cheque Payment'),
        ('mastercard', 'Master Card'),
        ('paypal', 'Paypal'),
    ]

# Create your models here.
class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    Firstname=models.CharField(max_length=100)
    Lastname=models.CharField(max_length=100)
    email = models.EmailField()
    address=models.CharField(max_length=1000)
    payment_method=models.CharField(max_length=50, choices=PAYMENT_METHOD_CHOICES)
    # Các trường khác của đơn hàng
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    note=models.CharField(max_length=1000)
    # journey_time = models.DateField()


    def __str__(self):
        return f"Order {self.pk} by {self.full_name} ({self.email}) at {self.created_at}"


    def save(self, *args, **kwargs):
        if not self.email:
            self.email = self.user.email
        if not self.full_name:
            self.full_name = self.user.profile.full_name if hasattr(self.user, 'profile') else self.user.username
        if not self.address:
            self.address = self.user.profile.address if hasattr(self.user, 'profile') else ""
        super().save(*args, **kwargs)