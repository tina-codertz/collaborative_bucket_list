from django.urls import path
from . import views

urlpatterns = [
    path('bucket/items/<int:item_id>/', views.view_single_bucket_list_item, name='view_single_bucket_list_item'),
    path('bucket/items/', views.view_all_bucket_list_items, name='view_all_bucket_list_items'),
    path('bucket/items/<int:item_id>/update_status/', views.update_bucket_list_item_status, name='update_bucket_list_item_status'),
    
]
