import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Mi Proyecto</Link>
      </div>
      <ul className="navbar-links">
        <li><Link to="/">Inicio</Link></li>
        {isAuthenticated && (
          <>
            <li><Link to="/orders">Órdenes</Link></li>
            <li><Link to="/suppliers">Proveedores</Link></li>
          </>
        )}
        {isAuthenticated ? (
          <>
            <li className="user-name">Hola, {user?.name}</li>
            <li>
              <button className="btn-logout" onClick={handleLogout}>
                Cerrar Sesión
              </button>
            </li>
          </>
        ) : (
          <li><Link to="/login">Iniciar Sesión</Link></li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;