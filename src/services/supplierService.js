import api from './api';

/**
 * Servicio de proveedores
 * BACKEND: Estos métodos consumen los endpoints de proveedores
 */
const supplierService = {
  /**
   * Obtener todos los proveedores
   * BACKEND: GET /api/suppliers
   * Headers: Authorization: Bearer <token>
   * Response: { suppliers: [{ id, name, contact, email, phone, address }] }
   */
  getAll: async () => {
    const response = await api.get('/suppliers');
    return response;
  },

  /**
   * Obtener un proveedor por ID
   * BACKEND: GET /api/suppliers/:id
   * Headers: Authorization: Bearer <token>
   * Response: { supplier: { id, name, contact, email, phone, address } }
   */
  getById: async (id) => {
    const response = await api.get(`/suppliers/${id}`);
    return response;
  },

  /**
   * Crear nuevo proveedor
   * BACKEND: POST /api/suppliers
   * Headers: Authorization: Bearer <token>
   * Body: { name: string, contact: string, email: string, phone: string, address: string }
   * Response: { message: string, supplier: { id, name, contact, email, phone, address } }
   */
  create: async (supplierData) => {
    const response = await api.post('/suppliers', supplierData);
    return response;
  },

  /**
   * Actualizar proveedor
   * BACKEND: PUT /api/suppliers/:id
   * Headers: Authorization: Bearer <token>
   * Body: { name?, contact?, email?, phone?, address? }
   * Response: { message: string, supplier: { ... } }
   */
  update: async (id, supplierData) => {
    const response = await api.put(`/suppliers/${id}`, supplierData);
    return response;
  },

  /**
   * Eliminar proveedor
   * BACKEND: DELETE /api/suppliers/:id
   * Headers: Authorization: Bearer <token>
   * Response: { message: string }
   */
  delete: async (id) => {
    const response = await api.delete(`/suppliers/${id}`);
    return response;
  },
};

export default supplierService;