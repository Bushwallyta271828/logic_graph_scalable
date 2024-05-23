import uuid
from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Debate(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=200)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='debates')
