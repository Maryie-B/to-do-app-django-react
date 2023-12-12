from rest_framework import status
from rest_framework.response import Response
from django.contrib.auth import authenticate
from .models import ToDo
from .serializers import ToDoSerializer
from django.contrib.auth.models import User
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.hashers import make_password
from rest_framework_simplejwt.tokens import RefreshToken

@api_view(['GET'])
def getToDos(request):
    todos = ToDo.objects.all()
    serializer = ToDoSerializer(todos, many=True)
    response = Response(serializer.data)
    response['Access-Control-Allow-Origin'] = '*'
    return response

@api_view(['GET'])
def getSingleToDo(request, id):
    post = ToDo.objects.get(id=id)
    serializer = ToDoSerializer(post, many=False)
    response = Response(serializer.data)
    response['Access-Control-Allow-Origin'] = '*'
    print(response.has_header('Access-Control-Allow-Origin'))
    return response

@api_view(['POST'])
def register_user(request):
    username = request.data.get('username')
    password = request.data.get('password')
    email = request.data.get('email')

    if not username or not password or not email:
        return Response({'error': 'Username, password, and email are required.'}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(username=username).exists():
        return Response({'error': 'Username already exists.'}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create(
        username=username,
        email=email,
        password=make_password(password) 
    )

    return Response({'message': 'User created successfully.'}, status=status.HTTP_201_CREATED)


@api_view(['POST'])
def login_user(request):
    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(username=username, password=password)
    if user is not None:
        refresh = RefreshToken.for_user(user)
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        })
    else:
        return Response({'error': 'Invalid Credentials'}, status=status.HTTP_401_UNAUTHORIZED)
    

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_todo(request):
    serializer = ToDoSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(author=request.user) 
        return Response(serializer.data)
    return Response(serializer.errors)


@api_view(['PUT'])
def update_todo(request, id):
    try:
        todo = ToDo.objects.get(pk=id)
    except ToDo.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        serializer = ToDoSerializer(todo, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)
    

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_todo(request, id):
    try:
        todo = ToDo.objects.get(pk=id)
    except ToDo.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.user != todo.author:
        return Response({'error': 'You do not have permission to delete this ToDo item'}, status=status.HTTP_403_FORBIDDEN)

    todo.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)