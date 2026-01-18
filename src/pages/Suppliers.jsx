import React, { useState, useEffect } from 'react';
import SupplierList from '../components/suppliers/SupplierList';
import SupplierForm from '../components/suppliers/SupplierForm';
import Modal from '../components/common/Modal';
import api from '../services/api';
import './Suppliers.css';

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Cargar proveedores al montar el componente
  useEffect(() => {
    loadSuppliers();
  }, []);

  const loadSuppliers = async () => {
    try {
      setLoading(true);
      const response = await api.get('/suppliers');
      setSuppliers(response.suppliers || []);
    } catch (err) {
      setError('Error al cargar proveedores');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddSupplier = async (newSupplier) => {
    try {
      if (editingSupplier) {
        const response = await api.put(`/suppliers/${editingSupplier.id}`, newSupplier);
        setSuppliers(suppliers.map(s => 
          s.id === editingSupplier.id ? response.supplier : s
        ));
        setEditingSupplier(null);
      } else {
        const response = await api.post('/suppliers', newSupplier);
        setSuppliers([response.supplier, ...suppliers]);
      }
      setIsModalOpen(false);
    } catch (err) {
      setError('Error al guardar proveedor');
      console.error(err);
    }
  };

  const handleDeleteSupplier = async (id) => {
    try {
      await api.delete(`/suppliers/${id}`);
      setSuppliers(suppliers.filter(supplier => supplier.id !== id));
    } catch (err) {
      setError('Error al eliminar proveedor');
      console.error(err);
    }
  };

  const handleEditSupplier = (supplier) => {
    setEditingSupplier(supplier);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingSupplier(null);
  };

  if (loading) return <div className="loading">Cargando proveedores...</div>;

  return (
    <div className="suppliers-container">
      <div className="suppliers-header">
        <h1>Gestión de Proveedores</h1>
        <button className="btn-primary" onClick={() => setIsModalOpen(true)}>
          + Nuevo Proveedor
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

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