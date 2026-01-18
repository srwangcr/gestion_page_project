import React from 'react';
import './Task.css';

const Task = ({ task, onToggle, onDelete }) => {
  return (
    <div className={`task ${task.completed ? 'completed' : ''}`}>
      <span onClick={() => onToggle(task.id)}>{task.name}</span>
      <button onClick={() => onDelete(task.id)}>Eliminar</button>
    </div>
  );
};

export default Task;