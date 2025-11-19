from django.urls import path
<<<<<<< HEAD
from .views import LoginView

urlpatterns = [
    path("login/", LoginView.as_view(), name="login"),
]
=======
from . import views

urlpatterns = [
    path('accounts/change_password/', views.change_password, name='change_password'),
]
>>>>>>> 4bbf22a41385efa20261c1968abfe38f08cb0998
