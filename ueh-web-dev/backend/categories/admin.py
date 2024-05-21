from django.contrib import admin
from .models import Product

# Register your models here.
class CarAdmin(admin.ModelAdmin):
    list_display = ('brand', 'car_name', 'model', 'price', 'rating')
    search_fields = ('car_name', 'brand', 'model')
    list_filter = ('brand', 'automatic')
    ordering = ('brand',)
    fields = (
        ('brand', 'car_name', 'model'),
        'price',
        'rating',
        'speed',
        'gps',
        'seat_type',
        'automatic',
        'description',
        'img_url'
    )
    readonly_fields = ('rating',)
    list_editable = ('price',)
    prepopulated_fields = {'car_name': ('brand', 'model')}

admin.site.register(Product, CarAdmin)
