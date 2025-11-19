from django.urls import path
from . import views

urlpatterns = [
    path('accounts/change_password/', views.change_password, name='change_password'),
]