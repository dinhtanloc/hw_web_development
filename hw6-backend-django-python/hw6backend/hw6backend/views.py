from math import pi
from django.views.decorators.http import require_GET
from django.http import JsonResponse

# HW1
@require_GET
def circle_area_and_circumference(request, r):
    area = r**2*pi
    circle = pi * 2 * r
    response = {
        'area': area,
        'circle': circle
    }
    return JsonResponse(response)

# HW2
@require_GET
def rectangle_area_and_perimeter(request, width, height):
    area = width * height
    perimeter = (width + height) * 2
    response = {
        'area': area,
        'perimeter': perimeter
    }
    return JsonResponse(response)

# HW3
@require_GET
def power_calculation(request, base, exponent):
    root = request.GET.get('root', False)
    
    if root == 'true':
        result = pow(base, exponent)
        response = {
            'result': result,
            'root': exponent
        }
    else:
        result = base**exponent
        response = {
            'result': result
        }
    
    return JsonResponse(response)