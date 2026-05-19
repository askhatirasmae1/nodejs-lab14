import React from 'react';

function TaskFilter({ filter, setFilter }) {
  return (
    <div className="task-filter">
      <span>Filtrer :</span>

      <button
        className={filter === 'all' ? 'active' : ''}
        onClick={() => setFilter('all')}
      >
        Toutes
      </button>

      <button
        className={filter === 'active' ? 'active' : ''}
        onClick={() => setFilter('active')}
      >
        À faire
      </button>

      <button
        className={filter === 'completed' ? 'active' : ''}
        onClick={() => setFilter('completed')}
      >
        Terminées
      </button>
    </div>
  );
}

export default TaskFilter;