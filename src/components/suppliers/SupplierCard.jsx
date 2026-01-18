import React from 'react';
import './SupplierCard.css';

const SupplierCard = ({ supplier, onDelete, onEdit }) => {
  return (
    <div className="supplier-card">
      <div className="supplier-card-header">
        <h3>{supplier.name}</h3>
      </div>
      
      <div className="supplier-card-body">
        <p><strong>Contacto:</strong> {supplier.contact || 'No especificado'}</p>
        <p><strong>Email:</strong> {supplier.email || 'No especificado'}</p>
        <p><strong>Teléfono:</strong> {supplier.phone || 'No especificado'}</p>
        <p><strong>Dirección:</strong> {supplier.address || 'No especificada'}</p>
      </div>

      <div className="supplier-card-actions">
        <button className="btn-edit" onClick={() => onEdit(supplier)}>
          Editar
        </button>
        <button className="btn-delete" onClick={() => onDelete(supplier.id)}>
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default SupplierCard;