# backend/base/serializers.py
from rest_framework import serializers
from .models import ToDo

class ToDoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ToDo
        fields = ['id', 'author', 'title', 'description']
        read_only_fields = ['author']
