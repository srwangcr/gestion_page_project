import { useState, useCallback } from 'react';
import { useAuth } from './useAuth';

/**
 * Hook personalizado para realizar llamadas a la API
 * Maneja automáticamente el token de autenticación y estados de carga/error
 * 
 * BACKEND: Este hook se conecta con tu API REST
 * Base URL configurada en: services/api.js
 */
export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { token } = useAuth();

  /**
   * Realiza una petición a la API
   * @param {string} url - Endpoint de la API
   * @param {object} options - Opciones de fetch (method, body, etc.)
   */
  const request = useCallback(async (url, options = {}) => {
    setLoading(true);
    setError(null);

    try {
      const headers = {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
        ...options.headers,
      };

      const response = await fetch(url, {
        ...options,
        headers,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error en la petición');
      }

      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [token]);

  return { request, loading, error };
};

export default useApi;