from django.contrib.auth.models import Group, Permission, AbstractUser
from django.db import models
from django.utils import timezone

# Create your models here.
class User(AbstractUser):
    last_password_change = models.DateTimeField(default=timezone.now)

    # override to avoid reverse accessor name clashes with auth.User
    groups = models.ManyToManyField(
        Group,
        related_name="accounts_user_set",
        related_query_name="accounts_user",
        blank=True,
        help_text="The groups this user belongs to.",
        verbose_name="groups",
    )

    user_permissions = models.ManyToManyField(
        Permission,
        related_name="accounts_user_set_permissions",
        related_query_name="accounts_user_permissions",
        blank=True,
        help_text="Specific permissions for this user.",
        verbose_name="user permissions",
    )
