import { useEffect, useState } from 'react';
import axios from 'axios';
import ToDoItem from './ToDoItem';
import { useNavigate } from 'react-router-dom';

const ToDoList = () => {
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

    navigate('/login');
  };

  const handleCreate = () => {
    navigate('/create');
  };

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/todos/')
      .then(response => {
        setTodos(response.data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <h2>To-Do List</h2>
      <button onClick={handleLogout}>Logout</button>
      <button onClick={handleCreate}>Create</button>
      {todos.map(todo => (
        <ToDoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
};

export default ToDoList;
