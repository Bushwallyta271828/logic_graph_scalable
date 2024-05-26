from rest_framework import generics, permissions
from .models import Debate
from .serializers import DebateSerializer
from .permissions import IsOwner

class DebateListCreateView(generics.ListCreateAPIView):
    serializer_class = DebateSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Debate.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class DebateDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = DebateSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwner]

    def get_queryset(self):
        return Debate.objects.filter(user=self.request.user)
