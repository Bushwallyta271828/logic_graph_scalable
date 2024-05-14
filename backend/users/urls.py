from django.urls import path
from . import views

urlpatterns = [
    path('authenticated', views.authenticated_view),
    path('account-details', views.account_details_view),
    path('sign-in', views.sign_in_view),
    path('create-account', views.create_account_view),
    path('sign-out', views.sign_out_view),
    path('delete-account', views.delete_account_view),
    path('change-username', views.change_username_view),
    path('change-email', views.change_email_view),
    path('change-password', views.change_password_view),
]
