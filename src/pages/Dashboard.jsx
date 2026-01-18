import React from 'react';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      <p>Bienvenido al panel de control</p>
      
      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Órdenes</h3>
          <p className="stat-number">0</p>
          <span>Total de órdenes</span>
        </div>
        <div className="stat-card">
          <h3>Proveedores</h3>
          <p className="stat-number">0</p>
          <span>Proveedores activos</span>
        </div>
        <div className="stat-card">
          <h3>Pendientes</h3>
          <p className="stat-number">0</p>
          <span>Órdenes pendientes</span>
        </div>
      </div>

      <div className="dashboard-recent">
        <h2>Actividad Reciente</h2>
        <div className="activity-list">
          <p className="no-activity">No hay actividad reciente</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;