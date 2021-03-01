from django.urls import path
from . import views

urlpatterns = [
    path('api/devices/', views.DeviceListCreate.as_view() ),
]