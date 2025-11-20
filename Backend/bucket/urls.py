from django.urls import path
from .views import (
    BucketListCreateView,
    CommentCreateView,
    view_single_bucket_list_item,
    view_all_bucket_list_items,
    update_bucket_list_item_status,
)

urlpatterns = [
    path('buckets/', BucketListCreateView.as_view(), name='bucket_list_create'),
    path("bucket/<int:item_id>/comment/", CommentCreateView.as_view(), name="add-comment"),
    path('bucket/items/<int:item_id>/', view_single_bucket_list_item, name='view_single_bucket_list_item'),
    path('bucket/items/', view_all_bucket_list_items, name='view_all_bucket_list_items'),
    path('bucket/items/<int:item_id>/update_status/', update_bucket_list_item_status, name='update_bucket_list_item_status'),
]
