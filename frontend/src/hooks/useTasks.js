import { useEffect, useState } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';

const API_URL = 'http://localhost:4000/api/tasks';
const socket = io('http://localhost:4000');

export function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTasks();

    socket.on('taskCreated', (newTask) => {
      setTasks((prev) => [newTask, ...prev]);
    });

    socket.on('taskUpdated', (updatedTask) => {
      setTasks((prev) =>
        prev.map((task) => (task._id === updatedTask._id ? updatedTask : task))
      );
    });

    socket.on('taskDeleted', (taskId) => {
      setTasks((prev) => prev.filter((task) => task._id !== taskId));
    });

    return () => {
      socket.off('taskCreated');
      socket.off('taskUpdated');
      socket.off('taskDeleted');
    };
  }, []);

  const fetchTasks = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(API_URL);
      setTasks(response.data);
      setError('');
    } catch (err) {
      setError('Erreur lors du chargement des tâches');
    } finally {
      setIsLoading(false);
    }
  };

  const createTask = async (taskData) => {
    try {
      const response = await axios.post(API_URL, taskData);
      const newTask = response.data;

      setTasks((prev) => [newTask, ...prev]);
      socket.emit('taskCreated', newTask);
    } catch (err) {
      setError('Erreur lors de la création de la tâche');
    }
  };

  const updateTask = async (id, taskData) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, taskData);
      const updatedTask = response.data;

      setTasks((prev) =>
        prev.map((task) => (task._id === id ? updatedTask : task))
      );

      socket.emit('taskUpdated', updatedTask);
    } catch (err) {
      setError('Erreur lors de la mise à jour de la tâche');
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);

      setTasks((prev) => prev.filter((task) => task._id !== id));
      socket.emit('taskDeleted', id);
    } catch (err) {
      setError('Erreur lors de la suppression de la tâche');
    }
  };

  const toggleTaskStatus = async (id, done) => {
    await updateTask(id, { done: !done });
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.done;
    if (filter === 'completed') return task.done;
    return true;
  });

  return {
    tasks: filteredTasks,
    allTasks: tasks,
    filter,
    setFilter,
    isLoading,
    error,
    createTask,
    updateTask,
    deleteTask,
    toggleTaskStatus
  };
}