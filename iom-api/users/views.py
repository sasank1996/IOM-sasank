from django.shortcuts import render
from rest_framework import generics
from users.models import User as  UserModel
from users.models import StoreIdea as  StoreIdeaModel

from django.http import HttpResponse, HttpResponseRedirect
from users.serializers import UserSerializer
from users.serializers import StoreIdeaSerializer

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from rest_framework import viewsets
from rest_framework.response import Response
from django.core.paginator import Paginator
from rest_framework.settings import api_settings
from rest_framework import serializers, generics, pagination, test
from oauth2_provider.views.generic import ProtectedResourceView
from rest_framework.authtoken.models import Token as TokenModel

class UserViewSet(viewsets.ViewSet):

    @csrf_exempt 
    def user_index(request):
        user_list = UserModel.objects.all()
        serializer = UserSerializer(user_list, many=True)
        return JsonResponse(serializer.data, safe =False)
    
    @csrf_exempt 
    def user_get(request, pk=None):
        getting_user = UserModel.objects.get(id = pk)
        serializer = UserSerializer(getting_user, many=True)
        return JsonResponse(serializer.data, safe =False)

    @csrf_exempt 
    def user_create(request):
        userName = request.POST["name"]
        userMail = request.POST["email"]
        employeeid = request.POST["employee_id"]
        user = UserModel.objects.create(name = userName, email = userMail, employee_id = employeeid)
        user.save()
        return HttpResponse(status=204)

    @csrf_exempt 
    def user_update(request, pk=None):
        updating_user = UserModel.objects.get(id = pk)
        updating_user.name = request.POST["name"]   
        updating_user.email = request.POST["email"]
        updating_user.employee_id = request.POST["employee_id"]
        updating_user.save()
        return HttpResponse(status=204)

    @csrf_exempt 
    def user_delete(request, pk=None):
        deleting_user = UserModel.objects.get(id = pk)
        if deleting_user:
            deleting_user.delete()
        return HttpResponse(status=204)
class SmallPagination(pagination.PageNumberPagination):
    page_size = 5

class StoreIdeaViewSet(viewsets.ViewSet):
    query_set = StoreIdeaModel.objects.all()
    serializer_class = StoreIdeaSerializer
    pagination_class = SmallPagination
    @csrf_exempt
    def store_idea_index(request, user_id=None, page_count= 10, page_number= 1):
        if request.method == "POST":
            StoreIdeaViewSet.Idea_create(request, user_id)
        user_store = StoreIdeaModel.objects.filter(store_user_id = user_id)
        total_count = user_store.count()
        # page = StoreIdeaViewSet.paginate_queryset(user_store)
        result_page = Paginator(user_store, page_count)
        page_present = result_page.page(page_number)
        present_page_list = page_present.object_list
        serializer = StoreIdeaSerializer(present_page_list, many=True)
        return JsonResponse({'store_data': serializer.data,'total_count': total_count}, safe =False)

    @csrf_exempt
    def Idea_get(request, pk=None):
        getting_user = StoreIdeaModel.objects.get(id = pk)
        serializer = StoreIdeaSerializer(user_store, many=True)
        return JsonResponse(serializer.data, safe =False)

    @csrf_exempt 
    def Idea_create(request, user_id=None):
        teamName = request.POST["team_name"]
        managerName = request.POST["manager_name"]
        Idea = request.POST["idea"]
        Application = request.POST["application"]
        user = UserModel.objects.get(id = user_id)
        store = StoreIdeaModel.objects.create(store_user_id = user, team_name = teamName, manager_name = managerName, idea = Idea,application = Application)
        store.save()
        return HttpResponse(status=204)

class ApiEndpoint(ProtectedResourceView):
    def get(self, request,*args,**kwargs):
        return HttpResponse("protected with oAuth2!")






