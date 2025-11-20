from django.db import models
from django.conf import settings

STATUS_CHOICES = (
    ("Pending", "Pending"),
    ("Completed", "Completed"),
)

class BucketItem(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="bucket_items")
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="Pending")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

    @property
    def total_upvotes(self):
        return self.votes.count()

    @property
    def total_comments(self):
        return self.comments.count()

class Vote(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="votes")
    item = models.ForeignKey(BucketItem, on_delete=models.CASCADE, related_name="votes")

    class Meta:
        unique_together = ("user", "item")

class Comment(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    item = models.ForeignKey(BucketItem, on_delete=models.CASCADE, related_name="comments")
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Comment by {self.user.username}"

    @property
    def snippet(self):
        words = self.text.split()
        if len(words) <= 50:
            return self.text
        return ' '.join(words[:50]) + '...'

