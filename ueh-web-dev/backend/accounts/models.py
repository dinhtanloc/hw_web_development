from django.db import models
from django.db.models.signals import post_save
from django.contrib.auth.models import AbstractUser
from django.dispatch import receiver



class User(AbstractUser):
    username = models.CharField(max_length=100)
    email = models.EmailField(unique=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']


    def profile(self):
        profile = Profile.objects.get(user=self)

    def __str__(self):
        return f"{self.username}: ({self.email})"

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    full_name = models.CharField(max_length=1000)
    phone= models.CharField(max_length=100)
    address = models.CharField(max_length=1000)
    job=models.CharField(max_length=100)
    bio = models.CharField(max_length=100)
    image = models.ImageField(upload_to="user_images", default="default.png")
    verified = models.BooleanField(default=False)

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        profile = Profile.objects.create(user=instance)
        profile.full_name = instance.username  # Lấy username từ User và gán vào full_name của Profile
        profile.save()

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
        if hasattr(instance, 'profile'):
            instance.profile.save()

# post_save.connect(create_user_profile, sender=User)
# post_save.connect(save_user_profile, sender=User)