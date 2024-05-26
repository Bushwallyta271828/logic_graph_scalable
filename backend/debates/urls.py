from django.urls import path
from .views import DebateListCreateView, DebateDetailView

urlpatterns = [
    path('debates/', DebateListCreateView.as_view(), name='debate-list-create'),
    path('debates/<int:pk>/', DebateDetailView.as_view(), name='debate-detail'),
]
