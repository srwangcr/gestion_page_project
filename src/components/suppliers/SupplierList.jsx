import React from 'react';
import SupplierCard from './SupplierCard';
import './SupplierList.css';

const SupplierList = ({ suppliers, onDelete, onEdit }) => {
  if (suppliers.length === 0) {
    return (
      <div className="supplier-list-empty">
        <p>No hay proveedores registrados</p>
        <span>Agrega un nuevo proveedor para comenzar</span>
      </div>
    );
  }

  return (
    <div className="supplier-list">
      {suppliers.map(supplier => (
        <SupplierCard
          key={supplier.id}
          supplier={supplier}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};

export default SupplierList;