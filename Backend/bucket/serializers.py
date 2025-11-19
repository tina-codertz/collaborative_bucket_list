from rest_framework import serializers
from .models import BucketItem, Comment

class BucketItemSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = BucketItem
        fields = ["id", "user", "title", "description", "created_at"]

class CommentSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)
    item = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Comment
        fields = ["id", "user", "item", "text", "created_at"]


