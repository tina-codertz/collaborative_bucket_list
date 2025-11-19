from django.urls import path
<<<<<<< HEAD
from .views import BucketListCreateView, CommentCreateView

urlpatterns = [
    path('buckets/', BucketListCreateView.as_view(), name='bucket_list_create'),
    path("bucket/<int:item_id>/comment/", CommentCreateView.as_view(), name="add-comment"),
=======
from . import views

urlpatterns = [
    path('bucket/items/<int:item_id>/', views.view_single_bucket_list_item, name='view_single_bucket_list_item'),
    path('bucket/items/', views.view_all_bucket_list_items, name='view_all_bucket_list_items'),
    path('bucket/items/<int:item_id>/update_status/', views.update_bucket_list_item_status, name='update_bucket_list_item_status'),
    
>>>>>>> 4bbf22a41385efa20261c1968abfe38f08cb0998
]
