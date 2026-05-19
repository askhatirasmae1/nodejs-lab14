import React, { useState } from 'react';

function TaskForm({ createTask }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignedTo, setAssignedTo] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    createTask({
      title,
      description,
      assignedTo
    });

    setTitle('');
    setDescription('');
    setAssignedTo('');
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <h2>Ajouter une nouvelle tâche</h2>

      <div className="form-group">
        <label>Titre</label>
        <input
          type="text"
          placeholder="Titre de la tâche"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label>Description</label>
        <textarea
          placeholder="Description de la tâche"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="3"
        />
      </div>

      <div className="form-group">
        <label>Assignée à</label>
        <input
          type="text"
          placeholder="Nom utilisateur"
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
        />
      </div>

      <button type="submit" className="btn-submit">
        Ajouter
      </button>
    </form>
  );
}

export default TaskForm;