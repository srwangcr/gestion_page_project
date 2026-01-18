import api from './api';

/**
 * Servicio de autenticación
 * BACKEND: Estos métodos consumen los endpoints de autenticación
 */
const authService = {
  /**
   * Iniciar sesión
   * BACKEND: POST /api/auth/login
   * Body: { email: string, password: string }
   * Response: { token: string, user: { id, name, email } }
   */
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    return response;
  },

  /**
   * Registrar nuevo usuario
   * BACKEND: POST /api/auth/register
   * Body: { name: string, email: string, password: string }
   * Response: { message: string, user: { id, name, email } }
   */
  register: async (name, email, password) => {
    const response = await api.post('/auth/register', { name, email, password });
    return response;
  },

  /**
   * Obtener perfil del usuario actual
   * BACKEND: GET /api/auth/profile
   * Headers: Authorization: Bearer <token>
   * Response: { user: { id, name, email } }
   */
  getProfile: async () => {
    const response = await api.get('/auth/profile');
    return response;
  },

  /**
   * Cerrar sesión (limpiar token local)
   */
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
};

export default authService;