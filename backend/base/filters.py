import django_filters
from .models import *

class OrderFilter(django_filters.FilterSet):
    class Meta: 
        model = Product
        fields = '__all__'
