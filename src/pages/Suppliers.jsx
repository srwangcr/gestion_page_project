import React, { useState } from 'react';
import SupplierList from '../components/suppliers/SupplierList';
import SupplierForm from '../components/suppliers/SupplierForm';
import Modal from '../components/common/Modal';
import './Suppliers.css';

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState(null);

  const handleAddSupplier = (newSupplier) => {
    if (editingSupplier) {
      setSuppliers(suppliers.map(s => 
        s.id === editingSupplier.id ? { ...newSupplier, id: s.id } : s
      ));
      setEditingSupplier(null);
    } else {
      setSuppliers([...suppliers, { ...newSupplier, id: Date.now() }]);
    }
    setIsModalOpen(false);
  };

  const handleDeleteSupplier = (id) => {
    setSuppliers(suppliers.filter(supplier => supplier.id !== id));
  };

  const handleEditSupplier = (supplier) => {
    setEditingSupplier(supplier);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingSupplier(null);
  };

  return (
    <div className="suppliers-container">
      <div className="suppliers-header">
        <h1>Gestión de Proveedores</h1>
        <button className="btn-primary" onClick={() => setIsModalOpen(true)}>
          + Nuevo Proveedor
        </button>
      </div>

      <SupplierList 
        suppliers={suppliers} 
        onDelete={handleDeleteSupplier}
        onEdit={handleEditSupplier}
      />

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <h2>{editingSupplier ? 'Editar Proveedor' : 'Nuevo Proveedor'}</h2>
        <SupplierForm onSubmit={handleAddSupplier} initialData={editingSupplier} />
      </Modal>
    </div>
  );
};

export default Suppliers;