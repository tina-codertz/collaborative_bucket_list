from django.urls import path
from .views import BucketListCreateView, CommentCreateView

urlpatterns = [
    path('buckets/', BucketListCreateView.as_view(), name='bucket_list_create'),
    path("bucket/<int:item_id>/comment/", CommentCreateView.as_view(), name="add-comment"),
]
