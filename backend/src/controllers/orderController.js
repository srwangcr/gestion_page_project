/**
 * Controlador de Órdenes
 * Maneja CRUD de órdenes
 */
const Order = require('../models/Order');
const { asyncHandler } = require('../middlewares/errorHandler');

/**
 * @desc    Obtener todas las órdenes del usuario
 * @route   GET /api/orders
 * @access  Private
 */
const getOrders = asyncHandler(async (req, res) => {
  const { status, page = 1, limit = 10 } = req.query;

  const result = await Order.findAllByUser(req.userId, {
    status,
    page: parseInt(page),
    limit: parseInt(limit)
  });

  res.json(result);
});

/**
 * @desc    Obtener una orden por ID
 * @route   GET /api/orders/:id
 * @access  Private
 */
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id, req.userId);

  if (!order) {
    res.status(404);
    throw new Error('Orden no encontrada');
  }

  res.json({ order });
});

/**
 * @desc    Crear nueva orden
 * @route   POST /api/orders
 * @access  Private
 */
const createOrder = asyncHandler(async (req, res) => {
  const { name, description, quantity, supplier } = req.body;

  const order = await Order.create(
    { name, description, quantity, supplier },
    req.userId
  );

  res.status(201).json({
    message: 'Orden creada exitosamente',
    order
  });
});

/**
 * @desc    Actualizar una orden
 * @route   PUT /api/orders/:id
 * @access  Private
 */
const updateOrder = asyncHandler(async (req, res) => {
  const { name, description, quantity, supplier, status } = req.body;

  // Verificar que la orden existe
  const existingOrder = await Order.findById(req.params.id, req.userId);
  if (!existingOrder) {
    res.status(404);
    throw new Error('Orden no encontrada');
  }

  const order = await Order.update(
    req.params.id,
    { name, description, quantity, supplier, status },
    req.userId
  );

  res.json({
    message: 'Orden actualizada exitosamente',
    order
  });
});

/**
 * @desc    Actualizar estado de una orden
 * @route   PUT /api/orders/:id/status
 * @access  Private
 */
const updateOrderStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;

  // Verificar que la orden existe
  const existingOrder = await Order.findById(req.params.id, req.userId);
  if (!existingOrder) {
    res.status(404);
    throw new Error('Orden no encontrada');
  }

  const order = await Order.updateStatus(req.params.id, status, req.userId);

  res.json({
    message: 'Estado actualizado exitosamente',
    order
  });
});

/**
 * @desc    Eliminar una orden
 * @route   DELETE /api/orders/:id
 * @access  Private
 */
const deleteOrder = asyncHandler(async (req, res) => {
  const deleted = await Order.delete(req.params.id, req.userId);

  if (!deleted) {
    res.status(404);
    throw new Error('Orden no encontrada');
  }

  res.json({
    message: 'Orden eliminada exitosamente'
  });
});

/**
 * @desc    Obtener estadísticas de órdenes
 * @route   GET /api/orders/stats
 * @access  Private
 */
const getOrderStats = asyncHandler(async (req, res) => {
  const stats = await Order.getStats(req.userId);

  res.json({ stats });
});

module.exports = {
  getOrders,
  getOrderById,
  createOrder,
  updateOrder,
  updateOrderStatus,
  deleteOrder,
  getOrderStats
};