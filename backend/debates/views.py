from rest_framework import viewsets, permissions
from .models import Debate
from .serializers import DebateSerializer
from rest_framework.decorators import action
from rest_framework.response import Response

class DebateViewSet(viewsets.ModelViewSet):
    queryset = Debate.objects.all()
    serializer_class = DebateSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=False, methods=['get'])
    def my_debates(self, request):
        debates = self.get_queryset()
        serializer = self.get_serializer(debates, many=True)
        return Response(serializer.data)
