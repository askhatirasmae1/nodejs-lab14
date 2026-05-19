import React from 'react';

function TaskItem({ task, toggleTaskStatus, deleteTask }) {
  const formattedDate = new Date(task.createdAt).toLocaleDateString();

  return (
    <div className={`task-item ${task.done ? 'task-done' : ''}`}>
      <div className="task-content">
        <input
          type="checkbox"
          checked={task.done}
          onChange={() => toggleTaskStatus(task._id, task.done)}
        />

        <div className="task-details">
          <h3>{task.title}</h3>

          {task.description && (
            <p className="task-description">{task.description}</p>
          )}

          {task.assignedTo && (
            <p className="assigned">Assignée à : {task.assignedTo}</p>
          )}

          <small>Créée le {formattedDate}</small>
        </div>
      </div>

      <button className="btn-delete" onClick={() => deleteTask(task._id)}>
        Supprimer
      </button>
    </div>
  );
}

export default TaskItem;