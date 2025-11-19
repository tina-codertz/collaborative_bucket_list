from rest_framework import generics, permissions
from .models import BucketItem ,Comment
from .serializers import BucketItemSerializer ,CommentSerializer

class BucketListCreateView(generics.ListCreateAPIView):
    queryset = BucketItem.objects.all().order_by("-created_at")
    serializer_class = BucketItemSerializer
    permission_classes = [permissions.IsAuthenticated]  

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)  

class CommentCreateView(generics.CreateAPIView):
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        item_id = self.kwargs["item_id"]
        serializer.save(user=self.request.user, item_id=item_id)
