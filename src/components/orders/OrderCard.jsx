import React from 'react';
import './OrderCard.css';

const OrderCard = ({ order, onDelete, onUpdateStatus }) => {
  const getStatusClass = (status) => {
    switch (status) {
      case 'pendiente': return 'status-pending';
      case 'en_proceso': return 'status-processing';
      case 'completada': return 'status-completed';
      case 'cancelada': return 'status-cancelled';
      default: return '';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'pendiente': return 'Pendiente';
      case 'en_proceso': return 'En proceso';
      case 'completada': return 'Completada';
      case 'cancelada': return 'Cancelada';
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
        <p><strong>Proveedor:</strong> {order.supplier_name || 'No especificado'}</p>
      </div>

      <div className="order-card-actions">
        <select 
          value={order.status} 
          onChange={(e) => onUpdateStatus(order.id, e.target.value)}
          className="status-select"
        >
          <option value="pendiente">Pendiente</option>
          <option value="en_proceso">En proceso</option>
          <option value="completada">Completada</option>
          <option value="cancelada">Cancelada</option>
        </select>
        <button className="btn-delete" onClick={() => onDelete(order.id)}>
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default OrderCard;