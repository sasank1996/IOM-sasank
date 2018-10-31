from users.models import User, StoreIdea
from rest_framework import serializers
from rest_framework import validators
import re
def validate_hash(value):
    reg = re.compile('(\W|^)[\w.+\-]*@ggktech\.com(\W|$)')
    if ~(reg.match(value)) :
        raise serializers.ValidationError(u'%s hashtag doesnot comply' % value)

class UserSerializer(serializers.HyperlinkedModelSerializer):
    email = serializers.EmailField(validators=[validate_hash])
    class Meta:
        model = User
        fields = ('id', 'name', 'email', 'employee_id', 'role')

class StoreIdeaSerializer(serializers.HyperlinkedModelSerializer):
    store_user_id = UserSerializer()
    class Meta:
        model = StoreIdea
        fields = ('id', 'store_user_id', 'manager_name', 'team_name', 'idea', 'application')