from django.shortcuts import render
from .serializers import DeviceSerializer
from .models import Device
from rest_framework import generics

# Create your views here.
class DeviceListCreate(generics.ListCreateAPIView):
    queryset = Device.objects.all()
    serializer_class = DeviceSerializer
