import React from 'react';
import TaskItem from './TaskItem';

function TaskList({ tasks, toggleTaskStatus, deleteTask }) {
  if (tasks.length === 0) {
    return <p className="empty-message">Aucune tâche trouvée.</p>;
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          toggleTaskStatus={toggleTaskStatus}
          deleteTask={deleteTask}
        />
      ))}
    </div>
  );
}

export default TaskList;