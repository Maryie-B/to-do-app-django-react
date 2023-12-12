from django.urls import path
from . import views

urlpatterns = [
    path('todos/', views.getToDos),
    path('todo/<str:id>', views.getSingleToDo),
    path('register/', views.register_user, name='register'),
    path('login/', views.login_user, name='login'),
    path('create/', views.create_todo, name='create'),
    path('update/<str:id>', views.update_todo, name='update'),
    path('delete/<int:id>', views.delete_todo, name='delete'),

]
