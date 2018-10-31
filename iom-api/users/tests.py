from django.test import TestCase
from rest_framework.test import APIClient
from users.models import User


class TestUserApi(TestCase):

    def setUp(self):
        User.objects.create(name="lion", email="roar@gmail.com", employee_id="133")
        User.objects.create(name="cat", email="roar@gmail.com", employee_id="134")

    def test_user_details(self):
        lion = User.objects.get(name="lion")
        cat = User.objects.get(name="cat")
        self.assertEqual(lion.role, '4')
