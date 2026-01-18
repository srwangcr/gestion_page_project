import React from 'react';
import './OrderFilters.css';

const OrderFilters = ({ filter, setFilter }) => {
  const filters = [
    { value: 'all', label: 'Todas' },
    { value: 'pending', label: 'Pendientes' },
    { value: 'processing', label: 'En proceso' },
    { value: 'completed', label: 'Completadas' },
    { value: 'cancelled', label: 'Canceladas' },
  ];

  return (
    <div className="order-filters">
      {filters.map(f => (
        <button
          key={f.value}
          className={`filter-btn ${filter === f.value ? 'active' : ''}`}
          onClick={() => setFilter(f.value)}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
};

export default OrderFilters;