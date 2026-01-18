/**
 * Configuración base de la API
 * BACKEND: Cambiar esta URL según tu entorno
 */
const API_BASE_URL = 'http://localhost:3000/api';

/**
 * Configuración de headers por defecto
 */
const defaultHeaders = {
  'Content-Type': 'application/json',
};

/**
 * Obtener headers con token de autenticación
 */
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    ...defaultHeaders,
    ...(token && { 'Authorization': `Bearer ${token}` }),
  };
};

/**
 * Clase para manejar peticiones HTTP
 * BACKEND: Todos los endpoints deben estar bajo /api
 */
const api = {
  /**
   * GET request
   * @param {string} endpoint - Ruta del endpoint (ej: '/users')
   */
  get: async (endpoint) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  /**
   * POST request
   * @param {string} endpoint - Ruta del endpoint
   * @param {object} data - Datos a enviar
   */
  post: async (endpoint, data) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  /**
   * PUT request
   * @param {string} endpoint - Ruta del endpoint
   * @param {object} data - Datos a enviar
   */
  put: async (endpoint, data) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  /**
   * DELETE request
   * @param {string} endpoint - Ruta del endpoint
   */
  delete: async (endpoint) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },
};

/**
 * Manejar respuesta de la API
 */
const handleResponse = async (response) => {
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'Error en la petición');
  }
  
  return data;
};

export default api;
export { API_BASE_URL };