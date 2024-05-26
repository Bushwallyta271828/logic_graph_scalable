from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import DebateViewSet

router = DefaultRouter()
router.register('debates', DebateViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
