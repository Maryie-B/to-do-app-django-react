/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';
import { useNavigate, useParams } from 'react-router-dom';

const AddEditToDo = ({ existingToDo }) => {
  const [title, setTitle] = useState(existingToDo ? existingToDo.title : '');
  const [description, setDescription] = useState(existingToDo ? existingToDo.description : '');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      // Fetch the existing To-Do item
      axiosInstance.get(`http://127.0.0.1:8000/todo/${id}`)
        .then(response => {
          console.log(response);
          setTitle(response.data.title);
          setDescription(response.data.description);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, [id]);
  

  const handleSubmit = (e) => {
    e.preventDefault();

    const toDoData = { title, description };

    if (id) {
      // Edit logic
      axiosInstance.put(`http://127.0.0.1:8000/update/${id}`, toDoData)
        .then(response => {
          console.log(response);
          navigate('/');
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      axiosInstance.post('http://127.0.0.1:8000/create/', toDoData)
      .then(response => {
        console.log(response.data);
        navigate('/');
      })
      .catch(error => {
        console.error("Error: ", error.response);
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Title:</label>
      <input 
        type="text" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
      />
      <label>Description:</label>
      <textarea 
        value={description} 
        onChange={(e) => setDescription(e.target.value)} 
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default AddEditToDo;
