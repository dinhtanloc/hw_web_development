from django.contrib import admin
from .models import Product

# Register your models here.
class CarAdmin(admin.ModelAdmin):
    list_display = ('brand', 'carName', 'model', 'price', 'rating')
    search_fields = ('carName', 'brand', 'model')
    list_filter = ('brand', 'automatic')
    ordering = ('brand',)
    fields = (
        ('brand', 'carName', 'model'),
        'price',
        'rating',
        'speed',
        'gps',
        'seat_type',
        'automatic',
        'description',
        'imgUrl'
    )
    readonly_fields = ('rating',)
    list_editable = ('price',)
    prepopulated_fields = {'carName': ('brand', 'model')}

admin.site.register(Product, CarAdmin)
