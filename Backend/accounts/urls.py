from django.urls import path
from .views import LoginView, change_password

urlpatterns = [
    path("login/", LoginView.as_view(), name="login"),
    path("change_password/", change_password, name="change_password"),
]
