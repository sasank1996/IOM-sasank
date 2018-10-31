"""iom URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, re_path
from users import views as user_views
from django.conf.urls import include, url


urlpatterns = [
    path('admin/', admin.site.urls),
    path('users/', user_views.UserViewSet.user_index, name ='user_index'),
    path('users/register/', user_views.UserViewSet.user_create, name ='user_create'),
    re_path('users/update/(?P<pk>\d+)/', user_views.UserViewSet.user_update, name ='user_update'),
    re_path('users/delete/(?P<pk>\d+)/', user_views.UserViewSet.user_delete,  name ='user_delete'),
    re_path('users/(?P<user_id>\d+)/store/(?P<page_count>\d+)/(?P<page_number>\d+)', user_views.StoreIdeaViewSet.store_idea_index, name ='store_idea_index'),
    re_path('users/store/(?P<pk>\d+)', user_views.StoreIdeaViewSet.Idea_get, name ='Idea_get'),
    # re_path('users/store/(?P<user_id>\d+)', user_views.StoreIdeaViewSet.Idea_create, name ='Idea_create'),
    path('o/', include('oauth2_provider.urls', namespace='oauth2_provider')),
]
