from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Debate(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='debates')

    def __str__(self):
        return self.title
