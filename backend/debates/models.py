from django.db import models

class Debate(models.Model):
    title = models.CharField(max_length=100)
