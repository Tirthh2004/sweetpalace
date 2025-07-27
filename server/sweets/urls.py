# sweets/urls.py

from django.urls import path
from .views import (
    register_user, login_user, logout_user,
    add_sweet, search_sweets, update_sweet,
    delete_sweet, purchase_sweet, restock_sweet, get_sweets
)

urlpatterns = [
    path('auth/register/', register_user, name='register'),
    path('auth/login/', login_user, name='login'),
    path('auth/logout/', logout_user, name='logout'),
    
    path('sweets/', get_sweets, name='get_sweets'),
    path('sweets/add/', add_sweet, name='add_sweet'),
    path('sweets/search/', search_sweets, name='search_sweets'),
    path('sweets/<str:sweet_id>/purchase/', purchase_sweet, name='purchase_sweet'),
    path('sweets/<str:id>/', update_sweet, name='update_sweet'),
    path('sweets/<str:id>/restock/', restock_sweet, name='restock_sweet'),
    path('sweets/<str:id>/delete/', delete_sweet, name='delete_sweet'),
]
