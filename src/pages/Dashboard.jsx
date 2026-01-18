import React, { useState, useEffect } from 'react';
import api from '../services/api';
import './Dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalSuppliers: 0,
    pendingOrders: 0
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        // Cargar órdenes
        const ordersRes = await api.get('/orders');
        const orders = ordersRes.orders || [];
        
        // Cargar proveedores
        const suppliersRes = await api.get('/suppliers');
        const suppliers = suppliersRes.suppliers || [];
        
        // Calcular estadísticas
        setStats({
          totalOrders: orders.length,
          totalSuppliers: suppliers.length,
          pendingOrders: orders.filter(o => o.status === 'pendiente').length
        });
        
        // Últimas 5 órdenes
        setRecentOrders(orders.slice(0, 5));
      } catch (err) {
        console.error('Error cargando dashboard:', err);
      } finally {
        setLoading(false);
      }
    };
    
    loadDashboardData();
  }, []);

  if (loading) return <div className="loading">Cargando dashboard...</div>;

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      <p>Bienvenido al panel de control</p>
      
      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Órdenes</h3>
          <p className="stat-number">{stats.totalOrders}</p>
          <span>Total de órdenes</span>
        </div>
        <div className="stat-card">
          <h3>Proveedores</h3>
          <p className="stat-number">{stats.totalSuppliers}</p>
          <span>Proveedores activos</span>
        </div>
        <div className="stat-card">
          <h3>Pendientes</h3>
          <p className="stat-number">{stats.pendingOrders}</p>
          <span>Órdenes pendientes</span>
        </div>
      </div>

      <div className="dashboard-recent">
        <h2>Actividad Reciente</h2>
        <div className="activity-list">
          {recentOrders.length === 0 ? (
            <p className="no-activity">No hay actividad reciente</p>
          ) : (
            recentOrders.map(order => (
              <div key={order.id} className="activity-item">
                <span className="activity-name">{order.name}</span>
                <span className="activity-status">{order.status}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;