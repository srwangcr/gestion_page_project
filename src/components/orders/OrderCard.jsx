import React from 'react';
import './OrderCard.css';

const OrderCard = ({ order, onDelete, onUpdateStatus }) => {
  const getStatusClass = (status) => {
    switch (status) {
      case 'pending': return 'status-pending';
      case 'processing': return 'status-processing';
      case 'completed': return 'status-completed';
      case 'cancelled': return 'status-cancelled';
      default: return '';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'pending': return 'Pendiente';
      case 'processing': return 'En proceso';
      case 'completed': return 'Completada';
      case 'cancelled': return 'Cancelada';
      default: return status;
    }
  };

  return (
    <div className="order-card">
      <div className="order-card-header">
        <h3>{order.name}</h3>
        <span className={`order-status ${getStatusClass(order.status)}`}>
          {getStatusLabel(order.status)}
        </span>
      </div>
      
      <div className="order-card-body">
        <p><strong>Descripción:</strong> {order.description || 'Sin descripción'}</p>
        <p><strong>Cantidad:</strong> {order.quantity || 1}</p>
        <p><strong>Proveedor:</strong> {order.supplier || 'No especificado'}</p>
      </div>

      <div className="order-card-actions">
        <select 
          value={order.status} 
          onChange={(e) => onUpdateStatus(order.id, e.target.value)}
          className="status-select"
        >
          <option value="pending">Pendiente</option>
          <option value="processing">En proceso</option>
          <option value="completed">Completada</option>
          <option value="cancelled">Cancelada</option>
        </select>
        <button className="btn-delete" onClick={() => onDelete(order.id)}>
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default OrderCard;