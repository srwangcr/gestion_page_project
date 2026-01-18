/**
 * Rutas de Órdenes
 */
const express = require('express');
const router = express.Router();
const {
  getOrders,
  getOrderById,
  createOrder,
  updateOrder,
  updateOrderStatus,
  deleteOrder,
  getOrderStats
} = require('../controllers/orderController');
const { authenticate } = require('../middlewares/authMiddleware');
const { validate } = require('../middlewares/validationMiddleware');
const { orderRules, orderStatusRules } = require('../utils/validators');

// Todas las rutas requieren autenticación
router.use(authenticate);

// Rutas de órdenes
router.get('/stats', getOrderStats);
router.get('/', getOrders);
router.get('/:id', getOrderById);
router.post('/', orderRules, validate, createOrder);
router.put('/:id', orderRules, validate, updateOrder);
router.patch('/:id/status', orderStatusRules, validate, updateOrderStatus);
router.delete('/:id', deleteOrder);

module.exports = router;