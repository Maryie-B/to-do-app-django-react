/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosConfig';

const ToDoItem = ({ todo }) => {
  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate(`/edit/${todo.id}`);
  };

  const handleDelete = () => {
    axiosInstance.delete(`http://127.0.0.1:8000/delete/${todo.id}`);
    navigate('/');
  };

  return (
    <div>
      <h3>{todo.title}</h3>
      <p>{todo.description}</p>
      <button onClick={handleEditClick}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default ToDoItem;
