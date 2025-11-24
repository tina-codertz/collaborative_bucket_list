from rest_framework import serializers
<<<<<<< HEAD
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


=======
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
>>>>>>> 4bbf22a41385efa20261c1968abfe38f08cb0998
