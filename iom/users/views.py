from django.shortcuts import render
from rest_framework import generics
from users.models import User as  UserModel
from django.http import HttpResponse
from users.serializers import UserSerializer
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json


@csrf_exempt 
    user_array = []
    user_list = list(UserModel.objects.all().values())
    serializer_class = UserSerializer
    return JsonResponse(user_list, safe=False)

@csrf_exempt 
def user_create(request):
    userName = json.loads(request.body.decode("utf-8"))["name"]
    userMail = json.loads(request.body.decode("utf-8"))["email"]
    employeeid = json.loads(request.body.decode("utf-8"))["employee_id"]

    # TODO: check if already existed

    user = UserModel.objects.create(name = userName, email = userMail, employee_id = employeeid)
    user.save()
    return HttpResponse(status=204)

@csrf_exempt 
def user_update(request, pk=None):
    updating_user = UserModel.objects.get(id = pk)
    updating_user.name = json.loads(request.body.decode("utf-8"))["name"]
    updating_user.email = json.loads(request.body.decode("utf-8"))["email"]
    updating_user.employee_id = json.loads(request.body.decode("utf-8"))["employee_id"]
    updating_user.save()
    return HttpResponse(status=204)

@csrf_exempt 
def user_delete(request, pk=None):
    deleting_user = UserModel.objects.get(id = pk)
    if deleting_user:
        deleting_user.delete()
    return HttpResponse(status=204)
