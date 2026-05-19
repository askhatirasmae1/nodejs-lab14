import React from 'react';
import './App.css';

import { useTasks } from './hooks/useTasks';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import TaskFilter from './components/TaskFilter';

function App() {
  const {
    tasks,
    allTasks,
    filter,
    setFilter,
    isLoading,
    error,
    createTask,
    deleteTask,
    toggleTaskStatus
  } = useTasks();

  const totalTasks = allTasks.length;
  const completedTasks = allTasks.filter((task) => task.done).length;
  const activeTasks = allTasks.filter((task) => !task.done).length;

  return (
    <div className="app">
      <header className="header">
        <h1>Task Manager Collaboratif</h1>
        <p>Application de gestion de tâches en temps réel</p>
      </header>

      <main className="container">
        <section className="stats">
          <div className="stat-card">
            <h3>{totalTasks}</h3>
            <p>Total</p>
          </div>

          <div className="stat-card">
            <h3>{activeTasks}</h3>
            <p>À faire</p>
          </div>

          <div className="stat-card">
            <h3>{completedTasks}</h3>
            <p>Terminées</p>
          </div>
        </section>

        <TaskForm createTask={createTask} />

        <TaskFilter filter={filter} setFilter={setFilter} />

        {error && <div className="error">{error}</div>}

        {isLoading ? (
          <p className="loading">Chargement...</p>
        ) : (
          <TaskList
            tasks={tasks}
            deleteTask={deleteTask}
            toggleTaskStatus={toggleTaskStatus}
          />
        )}
      </main>
    </div>
  );
}

export default App;