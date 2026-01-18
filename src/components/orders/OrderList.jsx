import React from 'react';
import OrderCard from './OrderCard';
import './OrderList.css';

const OrderList = ({ orders, onDelete, onUpdateStatus }) => {
  if (orders.length === 0) {
    return (
      <div className="order-list-empty">
        <p>No hay órdenes disponibles</p>
        <span>Crea una nueva orden para comenzar</span>
      </div>
    );
  }

  return (
    <div className="order-list">
      {orders.map(order => (
        <OrderCard
          key={order.id}
          order={order}
          onDelete={onDelete}
          onUpdateStatus={onUpdateStatus}
        />
      ))}
    </div>
  );
};

export default OrderList;