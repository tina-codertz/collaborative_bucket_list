from django.db import models
from django.contrib.auth.models import User

class BucketItem(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="bucket_items")
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class Comment(models.Model):
    item = models.ForeignKey(BucketItem, on_delete=models.CASCADE, related_name="comments")
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Comment by {self.user.username}"
