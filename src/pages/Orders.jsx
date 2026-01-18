import React, { useState } from 'react';
import OrderList from '../components/orders/OrderList';
import OrderForm from '../components/orders/OrderForm';
import OrderFilters from '../components/orders/OrderFilters';
import Modal from '../components/common/Modal';
import './Orders.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState('all');

  const handleAddOrder = (newOrder) => {
    setOrders([...orders, { ...newOrder, id: Date.now(), status: 'pending' }]);
    setIsModalOpen(false);
  };

  const handleDeleteOrder = (id) => {
    setOrders(orders.filter(order => order.id !== id));
  };

  const handleUpdateStatus = (id, status) => {
    setOrders(orders.map(order => 
      order.id === id ? { ...order, status } : order
    ));
  };

  const filteredOrders = filter === 'all' 
    ? orders 
    : orders.filter(order => order.status === filter);

  return (
    <div className="orders-container">
      <div className="orders-header">
        <h1>Gestión de Órdenes</h1>
        <button className="btn-primary" onClick={() => setIsModalOpen(true)}>
          + Nueva Orden
        </button>
      </div>

      <OrderFilters filter={filter} setFilter={setFilter} />

      <OrderList 
        orders={filteredOrders} 
        onDelete={handleDeleteOrder}
        onUpdateStatus={handleUpdateStatus}
      />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2>Nueva Orden</h2>
        <OrderForm onSubmit={handleAddOrder} />
      </Modal>
    </div>
  );
};

export default Orders;