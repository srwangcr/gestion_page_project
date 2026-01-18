import React, { useState } from 'react';
import './OrderForm.css';

const OrderForm = ({ onSubmit, initialData = null }) => {
  const [name, setName] = useState(initialData?.name || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [quantity, setQuantity] = useState(initialData?.quantity || 1);
  const [supplier, setSupplier] = useState(initialData?.supplier || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, description, quantity, supplier });
    // Limpiar formulario
    setName('');
    setDescription('');
    setQuantity(1);
    setSupplier('');
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
          onChange={(e) => setQuantity(parseInt(e.target.value))}
          min="1"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="supplier">Proveedor</label>
        <input
          type="text"
          id="supplier"
          value={supplier}
          onChange={(e) => setSupplier(e.target.value)}
          placeholder="Nombre del proveedor"
        />
      </div>

      <button type="submit" className="btn-submit">
        {initialData ? 'Actualizar Orden' : 'Crear Orden'}
      </button>
    </form>
  );
};

export default OrderForm;