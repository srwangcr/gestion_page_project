/**
 * Validadores personalizados para la API
 */
const { body, param, query } = require('express-validator');

/**
 * Validaciones para autenticación
 */
const authValidators = {
  // Validar registro de usuario
  register: [
    body('name')
      .trim()
      .notEmpty().withMessage('El nombre es requerido')
      .isLength({ min: 2, max: 100 }).withMessage('El nombre debe tener entre 2 y 100 caracteres'),
    body('email')
      .trim()
      .notEmpty().withMessage('El email es requerido')
      .isEmail().withMessage('Debe ser un email válido')
      .normalizeEmail(),
    body('password')
      .notEmpty().withMessage('La contraseña es requerida')
      .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
  ],

  // Validar login
  login: [
    body('email')
      .trim()
      .notEmpty().withMessage('El email es requerido')
      .isEmail().withMessage('Debe ser un email válido')
      .normalizeEmail(),
    body('password')
      .notEmpty().withMessage('La contraseña es requerida')
  ]
};

/**
 * Validaciones para órdenes
 */
const orderValidators = {
  // Validar creación de orden
  create: [
    body('name')
      .trim()
      .notEmpty().withMessage('El nombre de la orden es requerido')
      .isLength({ min: 2, max: 200 }).withMessage('El nombre debe tener entre 2 y 200 caracteres'),
    body('description')
      .optional()
      .trim()
      .isLength({ max: 1000 }).withMessage('La descripción no puede exceder 1000 caracteres'),
    body('quantity')
      .notEmpty().withMessage('La cantidad es requerida')
      .isInt({ min: 1 }).withMessage('La cantidad debe ser un número entero positivo'),
    body('supplier')
      .optional()
      .trim()
      .isLength({ max: 200 }).withMessage('El proveedor no puede exceder 200 caracteres')
  ],

  // Validar actualización de orden
  update: [
    param('id').isInt().withMessage('ID de orden inválido'),
    body('name')
      .optional()
      .trim()
      .isLength({ min: 2, max: 200 }).withMessage('El nombre debe tener entre 2 y 200 caracteres'),
    body('description')
      .optional()
      .trim()
      .isLength({ max: 1000 }).withMessage('La descripción no puede exceder 1000 caracteres'),
    body('quantity')
      .optional()
      .isInt({ min: 1 }).withMessage('La cantidad debe ser un número entero positivo'),
    body('status')
      .optional()
      .isIn(['pendiente', 'en_proceso', 'completada', 'cancelada'])
      .withMessage('Estado inválido')
  ],

  // Validar actualización de estado
  updateStatus: [
    param('id').isInt().withMessage('ID de orden inválido'),
    body('status')
      .notEmpty().withMessage('El estado es requerido')
      .isIn(['pendiente', 'en_proceso', 'completada', 'cancelada'])
      .withMessage('Estado inválido. Debe ser: pendiente, en_proceso, completada o cancelada')
  ],

  // Validar ID de orden
  getById: [
    param('id').isInt().withMessage('ID de orden inválido')
  ]
};

/**
 * Validaciones para proveedores
 */
const supplierValidators = {
  // Validar creación de proveedor
  create: [
    body('name')
      .trim()
      .notEmpty().withMessage('El nombre del proveedor es requerido')
      .isLength({ min: 2, max: 200 }).withMessage('El nombre debe tener entre 2 y 200 caracteres'),
    body('contact')
      .optional()
      .trim()
      .isLength({ max: 100 }).withMessage('El contacto no puede exceder 100 caracteres'),
    body('email')
      .optional()
      .trim()
      .isEmail().withMessage('Debe ser un email válido')
      .normalizeEmail(),
    body('phone')
      .optional()
      .trim()
      .isLength({ max: 20 }).withMessage('El teléfono no puede exceder 20 caracteres'),
    body('address')
      .optional()
      .trim()
      .isLength({ max: 500 }).withMessage('La dirección no puede exceder 500 caracteres')
  ],

  // Validar actualización de proveedor
  update: [
    param('id').isInt().withMessage('ID de proveedor inválido'),
    body('name')
      .optional()
      .trim()
      .isLength({ min: 2, max: 200 }).withMessage('El nombre debe tener entre 2 y 200 caracteres'),
    body('contact')
      .optional()
      .trim()
      .isLength({ max: 100 }).withMessage('El contacto no puede exceder 100 caracteres'),
    body('email')
      .optional()
      .trim()
      .isEmail().withMessage('Debe ser un email válido')
      .normalizeEmail(),
    body('phone')
      .optional()
      .trim()
      .isLength({ max: 20 }).withMessage('El teléfono no puede exceder 20 caracteres'),
    body('address')
      .optional()
      .trim()
      .isLength({ max: 500 }).withMessage('La dirección no puede exceder 500 caracteres')
  ],

  // Validar ID de proveedor
  getById: [
    param('id').isInt().withMessage('ID de proveedor inválido')
  ]
};

module.exports = {
  authValidators,
  orderValidators,
  supplierValidators,
  // Exports directos para las rutas
  registerRules: authValidators.register,
  loginRules: authValidators.login,
  orderRules: orderValidators.create,
  orderStatusRules: orderValidators.updateStatus,
  supplierRules: supplierValidators.create
};