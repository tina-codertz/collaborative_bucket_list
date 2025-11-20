from rest_framework import serializers
from .models import BucketItem, Comment, Vote

class CommentSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)
    item = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Comment
        fields = ["id", "user", "item", "text", "created_at"]

class BucketItemSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)
    comments = CommentSerializer(many=True, read_only=True)
    upvotes = serializers.IntegerField(source="total_upvotes", read_only=True)

    class Meta:
        model = BucketItem
        fields = ["id", "user", "title", "description", "status", "created_at", "comments", "upvotes"]

class BucketListStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = BucketItem
        fields = ['status']
