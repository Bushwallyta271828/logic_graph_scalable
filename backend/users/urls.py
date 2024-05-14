from django.urls import path
from . import views

urlpatterns = [
    path('authenticated', views.authenticated),
    path('sign-in', views.sign_in),
    path('create-account', views.create_account),
    path('sign-out', views.sign_out),
    path('delete-account', views.delete_account),
    path('account-details', views.account_details),
    path('change-username', views.change_username),
    path('change-email', views.change_email),
    path('change-password', views.change_password),
]
