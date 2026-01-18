import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">Mi Proyecto</div>
      <ul className="navbar-links">
        <li><a href="/">Inicio</a></li>
        <li><a href="/orders">Órdenes</a></li>
        <li><a href="/suppliers">Proveedores</a></li>
        <li><a href="/login">Iniciar Sesión</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;