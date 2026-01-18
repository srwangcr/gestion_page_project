import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import './OrderForm.css';

const OrderForm = ({ onSubmit, initialData = null }) => {
  const [name, setName] = useState(initialData?.name || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [quantity, setQuantity] = useState(initialData?.quantity || 1);
  const [supplierId, setSupplierId] = useState(initialData?.supplier_id || '');
  const [suppliers, setSuppliers] = useState([]);

  // Cargar lista de proveedores
  useEffect(() => {
    const loadSuppliers = async () => {
      try {
        const response = await api.get('/suppliers');
        setSuppliers(response.suppliers || []);
      } catch (err) {
        console.error('Error cargando proveedores:', err);
      }
    };
    loadSuppliers();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ 
      name, 
      description, 
      quantity: parseInt(quantity), 
      supplier: supplierId ? parseInt(supplierId) : null 
    });
    // Limpiar formulario
    setName('');
    setDescription('');
    setQuantity(1);
    setSupplierId('');
  };

  return (
    <form className="order-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Nombre de la Orden</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nombre de la orden"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Descripción</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descripción de la orden"
          rows="3"
        />
      </div>

      <div className="form-group">
        <label htmlFor="quantity">Cantidad</label>
        <input
          type="number"
          id="quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          min="1"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="supplier">Proveedor (opcional)</label>
        <select
          id="supplier"
          value={supplierId}
          onChange={(e) => setSupplierId(e.target.value)}
        >
          <option value="">-- Sin proveedor --</option>
          {suppliers.map(s => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>
      </div>

      <button type="submit" className="btn-submit">
        {initialData ? 'Actualizar Orden' : 'Crear Orden'}
      </button>
    </form>
  );
};

export default OrderForm;