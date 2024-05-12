from django.urls import path
from . import views

urlpatterns = [
    path('sign-in', views.sign_in_view),
    path('sign-up', views.sign_up_view),
    path('change-username', views.change_username_view),
    path('change-email', views.change_email_view),
    path('change-password', views.change_password_view),
]
