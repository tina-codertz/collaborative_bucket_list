from django.shortcuts import render
from django.contrib.auth.password_validation import validate_password   
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.core.exceptions import ValidationError
from django.utils import timezone
from rest_framework.views import APIView
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken

class LoginView(APIView):
    permission_classes = [AllowAny]  

    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        user = authenticate(username=username, password=password)

        if user is None:
            return Response({"error": "Invalid credentials"}, status=400)

        refresh = RefreshToken.for_user(user)
        return Response({
            "refresh": str(refresh),
            "access": str(refresh.access_token),
        })

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def change_password(request):
    old_password = request.data.get('old_password')
    new_password = request.data.get('new_password')
    confirm_password = request.data.get('confirm_password')

    # checking if old password is correct
    if not request.user.check_password(old_password):
        return Response({'error': 'old password is incorrect'}, status=400)

    if new_password != confirm_password:
        return Response({'error': 'new password and confirm password do not match'}, status=400)

    # making sure we can't reuse old password
    if old_password == new_password:
        return Response({'error': 'new password cannot be the same as the old password'}, status=400)

    try:
        validate_password(new_password, user=request.user)
    except ValidationError as e:
        return Response({'error': e.messages}, status=400)

    user = request.user
    # update last_password_change only if the field exists on the user model
    if hasattr(user, 'last_password_change'):
        user.last_password_change = timezone.now()
    user.set_password(new_password)
    user.save()

    # issue new tokens for the user
    refresh = RefreshToken.for_user(user)

    return Response({
        'message': 'Password changed successfully',
        'access': str(refresh.access_token),
        'refresh': str(refresh),
    }, status=200)
