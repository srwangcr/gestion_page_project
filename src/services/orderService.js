import api from './api';

/**
 * Servicio de órdenes
 * BACKEND: Estos métodos consumen los endpoints de órdenes
 */
const orderService = {
  /**
   * Obtener todas las órdenes
   * BACKEND: GET /api/orders
   * Headers: Authorization: Bearer <token>
   * Response: { orders: [{ id, name, description, quantity, supplier, status, createdAt }] }
   */
  getAll: async () => {
    const response = await api.get('/orders');
    return response;
  },

  /**
   * Obtener una orden por ID
   * BACKEND: GET /api/orders/:id
   * Headers: Authorization: Bearer <token>
   * Response: { order: { id, name, description, quantity, supplier, status, createdAt } }
   */
  getById: async (id) => {
    const response = await api.get(`/orders/${id}`);
    return response;
  },

  /**
   * Crear nueva orden
   * BACKEND: POST /api/orders
   * Headers: Authorization: Bearer <token>
   * Body: { name: string, description: string, quantity: number, supplier: string }
   * Response: { message: string, order: { id, name, description, quantity, supplier, status } }
   */
  create: async (orderData) => {
    const response = await api.post('/orders', orderData);
    return response;
  },

  /**
   * Actualizar orden
   * BACKEND: PUT /api/orders/:id
   * Headers: Authorization: Bearer <token>
   * Body: { name?, description?, quantity?, supplier?, status? }
   * Response: { message: string, order: { ... } }
   */
  update: async (id, orderData) => {
    const response = await api.put(`/orders/${id}`, orderData);
    return response;
  },

  /**
   * Actualizar estado de la orden
   * BACKEND: PUT /api/orders/:id/status
   * Headers: Authorization: Bearer <token>
   * Body: { status: 'pending' | 'processing' | 'completed' | 'cancelled' }
   * Response: { message: string, order: { ... } }
   */
  updateStatus: async (id, status) => {
    const response = await api.put(`/orders/${id}/status`, { status });
    return response;
  },

  /**
   * Eliminar orden
   * BACKEND: DELETE /api/orders/:id
   * Headers: Authorization: Bearer <token>
   * Response: { message: string }
   */
  delete: async (id) => {
    const response = await api.delete(`/orders/${id}`);
    return response;
  },
};

export default orderService;