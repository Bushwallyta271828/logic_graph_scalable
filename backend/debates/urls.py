from django.urls import path
from . import views

urlpatterns = [
    path('get-debate/<int:debate_id>/', views.getDebate),
]
