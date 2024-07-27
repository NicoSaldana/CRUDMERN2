import React, { useState, useEffect } from 'react';
import axios from '../../utils/axios';
import './Crud.css'; // Importar el archivo CSS

const Crud = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editing, setEditing] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get('/api/tasks');
      setTasks(res.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await axios.put(`/api/tasks/${currentTask._id}`, { title, description });
        setEditing(false);
        setCurrentTask(null);
      } else {
        await axios.post('/api/tasks', { title, description });
      }
      setTitle('');
      setDescription('');
      fetchTasks();
    } catch (error) {
      console.error('Error submitting task:', error);
    }
  };

  const handleEdit = (task) => {
    setEditing(true);
    setCurrentTask(task);
    setTitle(task.title);
    setDescription(task.description);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/tasks/${id}`);
      fetchTasks(); // Volver a cargar las tareas después de eliminar una tarea
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="container">
      <h2>Tareas</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          id="description"
          name="description"
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">{editing ? 'Actualizar' : 'Crear'}</button>
      </form>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <div>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
            </div>
            <div>
              <button onClick={() => handleEdit(task)}>Editar</button>
              <button onClick={() => handleDelete(task._id)}>Eliminar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Crud;
