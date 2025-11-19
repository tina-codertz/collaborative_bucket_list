from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .models import BucketListItem
from .serializers import BucketItemSerializer, BucketListStatusSerializer



# Create your views here.

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def view_single_bucket_list_item(request, item_id):
    try:
        item=BucketListItem.objects.get(id=item_id)
    except BucketListItem.DoesNotExist:
        return Response({'error': 'Bucket list item not found'}, status=404)
    
    serializer= BucketItemSerializer(item)
    return Response(serializer.data)
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def view_all_bucket_list_items(request):
    items=BucketListItem.objects.all()
    serializer= BucketItemSerializer(items, many=True)
    return Response(serializer.data)

@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def update_bucket_list_item_status(request, item_id):
    try:
        item=BucketListItem.objects.get(id=item_id)
    except BucketListItem.DoesNotExist:
        return Response({'error': 'Bucket list item not found'}, status=404)
    
    if item.user != request.user:
        return Response({'error': 'You do not have permission to update this item'}, status=403)
    
    serializer= BucketListStatusSerializer(item, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)
