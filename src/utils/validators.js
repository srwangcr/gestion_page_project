/**
 * Utilidades de validación
 * Funciones para validar datos en formularios
 */

/**
 * Validar email
 * @param {string} email - Email a validar
 * @returns {boolean} true si es válido
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validar contraseña (mínimo 6 caracteres)
 * @param {string} password - Contraseña a validar
 * @returns {boolean} true si es válida
 */
export const isValidPassword = (password) => {
  return password && password.length >= 6;
};

/**
 * Validar que un campo no esté vacío
 * @param {string} value - Valor a validar
 * @returns {boolean} true si no está vacío
 */
export const isRequired = (value) => {
  return value && value.trim().length > 0;
};

/**
 * Validar número de teléfono
 * @param {string} phone - Teléfono a validar
 * @returns {boolean} true si es válido
 */
export const isValidPhone = (phone) => {
  const phoneRegex = /^[\d\s\-\+\(\)]{7,20}$/;
  return phoneRegex.test(phone);
};

/**
 * Validar que un número sea positivo
 * @param {number} value - Número a validar
 * @returns {boolean} true si es positivo
 */
export const isPositiveNumber = (value) => {
  return typeof value === 'number' && value > 0;
};

/**
 * Validar formulario de login
 * @param {object} data - { email, password }
 * @returns {object} { isValid, errors }
 */
export const validateLoginForm = (data) => {
  const errors = {};
  
  if (!isValidEmail(data.email)) {
    errors.email = 'Email inválido';
  }
  
  if (!isValidPassword(data.password)) {
    errors.password = 'La contraseña debe tener al menos 6 caracteres';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Validar formulario de registro
 * @param {object} data - { name, email, password, confirmPassword }
 * @returns {object} { isValid, errors }
 */
export const validateRegisterForm = (data) => {
  const errors = {};
  
  if (!isRequired(data.name)) {
    errors.name = 'El nombre es requerido';
  }
  
  if (!isValidEmail(data.email)) {
    errors.email = 'Email inválido';
  }
  
  if (!isValidPassword(data.password)) {
    errors.password = 'La contraseña debe tener al menos 6 caracteres';
  }
  
  if (data.password !== data.confirmPassword) {
    errors.confirmPassword = 'Las contraseñas no coinciden';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};