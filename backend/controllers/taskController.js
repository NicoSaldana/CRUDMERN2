const asyncHandler = require('express-async-handler');
const Task = require('../models/Task');

// Crear una nueva tarea
const createTask = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  const task = new Task({
    title,
    description,
  });
  const createdTask = await task.save();
  res.status(201).json(createdTask);
});

// Obtener todas las tareas
const getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({});
  res.json(tasks);
});

// Obtener una tarea por ID
const getTaskById = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (task) {
    res.json(task);
  } else {
    res.status(404);
    throw new Error('Task not found');
  }
});

// Actualizar una tarea
const updateTask = asyncHandler(async (req, res) => {
  const { title, description, completed } = req.body;
  const task = await Task.findById(req.params.id);

  if (task) {
    task.title = title || task.title;
    task.description = description || task.description;
    task.completed = completed !== undefined ? completed : task.completed;

    const updatedTask = await task.save();
    res.json(updatedTask);
  } else {
    res.status(404);
    throw new Error('Task not found');
  }
});

// Eliminar una tarea
const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findByIdAndDelete(req.params.id);

  if (task) {
    res.json({ message: 'Task removed' });
  } else {
    res.status(404);
    throw new Error('Task not found');
  }
});

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
};
