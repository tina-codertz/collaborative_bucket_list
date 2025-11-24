from django.db import models
<<<<<<< HEAD
from django.contrib.auth.models import User

class BucketItem(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="bucket_items")
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
=======
from Backend.accounts.models import User


class BucketListItem(models.Model):
    STATUS_CHOICES = (
        ("Pending", "Pending"),
        ("Completed", "Completed"),
    )

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="bucket_items")
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="Pending")
>>>>>>> 4bbf22a41385efa20261c1968abfe38f08cb0998
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

<<<<<<< HEAD
class Comment(models.Model):
    item = models.ForeignKey(BucketItem, on_delete=models.CASCADE, related_name="comments")
    user = models.ForeignKey(User, on_delete=models.CASCADE)
=======
    @property
    def total_upvotes(self):
        return self.votes.count()

    @property
    def total_comments(self):
        return self.comments.count()

class Vote(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="votes")
    item = models.ForeignKey(BucketListItem, on_delete=models.CASCADE, related_name="votes")

    class Meta:
        unique_together = ("user", "item")  # prevent double voting

class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    item = models.ForeignKey(BucketListItem, on_delete=models.CASCADE, related_name="comments")
>>>>>>> 4bbf22a41385efa20261c1968abfe38f08cb0998
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Comment by {self.user.username}"
