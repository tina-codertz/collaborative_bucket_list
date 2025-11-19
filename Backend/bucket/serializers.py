from rest_framework import serializers
from .models import BucketListItem, Comment, Vote

class CommentSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()

    class Meta:
        model = Comment
        fields = ["id", "user", "text", "created_at"]

class BucketItemSerializer(serializers.ModelSerializer):
    comments = CommentSerializer(many=True, read_only=True)
    upvotes = serializers.SerializerMethodField()

    class Meta:
        model = BucketListItem
        fields = ["id", "title", "description", "status", "created_at", "user", "comments", "upvotes"]

    def get_upvotes(self, obj):
        return Vote.objects.filter(item=obj).count()
    
class BucketListStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = BucketListItem
        fields = ['status']