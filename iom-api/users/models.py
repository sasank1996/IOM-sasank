import uuid
from django.db import models


# Create your models here.
class User(models.Model):
    name = models.CharField(max_length=255,unique =True,null=False)
    email = models.CharField(max_length=255, null=False)
    employee_id = models.CharField(max_length=255, null=False)
    ROLE_CHOICES = ((1, 'admin'),(2, 'viewers'),(3, 'voters'),(4, 'player'))
    role = models.CharField(max_length=255, choices = ROLE_CHOICES, default='4')
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

class StoreIdea(models.Model):
    store_user_id = models.ForeignKey('User',on_delete = models.CASCADE)
    team_name = models.CharField(max_length=255, null=False)
    manager_name = models.CharField(max_length=255, null=False)
    idea = models.CharField(max_length=255, null=True)
    application = models.CharField(max_length=255, null=True)