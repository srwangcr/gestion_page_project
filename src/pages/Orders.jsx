import React, { useState, useEffect } from 'react';
import OrderList from '../components/orders/OrderList';
import OrderForm from '../components/orders/OrderForm';
import OrderFilters from '../components/orders/OrderFilters';
import Modal from '../components/common/Modal';
import api from '../services/api';
import './Orders.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Cargar órdenes al montar el componente
  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const response = await api.get('/orders');
      setOrders(response.orders || []);
    } catch (err) {
      setError('Error al cargar órdenes');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddOrder = async (newOrder) => {
    try {
      const response = await api.post('/orders', newOrder);
      setOrders([response.order, ...orders]);
      setIsModalOpen(false);
    } catch (err) {
      setError('Error al crear orden');
      console.error(err);
    }
  };

  const handleDeleteOrder = async (id) => {
    try {
      await api.delete(`/orders/${id}`);
      setOrders(orders.filter(order => order.id !== id));
    } catch (err) {
      setError('Error al eliminar orden');
      console.error(err);
    }
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      await api.patch(`/orders/${id}/status`, { status });
      setOrders(orders.map(order => 
        order.id === id ? { ...order, status } : order
      ));
    } catch (err) {
      setError('Error al actualizar estado');
      console.error(err);
    }
  };

  const filteredOrders = filter === 'all' 
    ? orders 
    : orders.filter(order => order.status === filter);

  if (loading) return <div className="loading">Cargando órdenes...</div>;

  return (
    <div className="orders-container">
      <div className="orders-header">
        <h1>Gestión de Órdenes</h1>
        <button className="btn-primary" onClick={() => setIsModalOpen(true)}>
          + Nueva Orden
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

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