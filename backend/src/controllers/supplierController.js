/**
 * Controlador de Proveedores
 * Maneja CRUD de proveedores
 */
const Supplier = require('../models/Supplier');
const { asyncHandler } = require('../middlewares/errorHandler');

/**
 * @desc    Obtener todos los proveedores del usuario
 * @route   GET /api/suppliers
 * @access  Private
 */
const getSuppliers = asyncHandler(async (req, res) => {
  const { page = 1, limit = 20 } = req.query;

  const result = await Supplier.findAllByUser(req.userId, {
    page: parseInt(page),
    limit: parseInt(limit)
  });

  res.json(result);
});

/**
 * @desc    Obtener un proveedor por ID
 * @route   GET /api/suppliers/:id
 * @access  Private
 */
const getSupplierById = asyncHandler(async (req, res) => {
  const supplier = await Supplier.findById(req.params.id, req.userId);

  if (!supplier) {
    res.status(404);
    throw new Error('Proveedor no encontrado');
  }

  res.json({ supplier });
});

/**
 * @desc    Crear nuevo proveedor
 * @route   POST /api/suppliers
 * @access  Private
 */
const createSupplier = asyncHandler(async (req, res) => {
  const { name, contact, email, phone, address } = req.body;

  const supplier = await Supplier.create(
    { name, contact, email, phone, address },
    req.userId
  );

  res.status(201).json({
    message: 'Proveedor creado exitosamente',
    supplier
  });
});

/**
 * @desc    Actualizar un proveedor
 * @route   PUT /api/suppliers/:id
 * @access  Private
 */
const updateSupplier = asyncHandler(async (req, res) => {
  const { name, contact, email, phone, address } = req.body;

  // Verificar que el proveedor existe
  const existingSupplier = await Supplier.findById(req.params.id, req.userId);
  if (!existingSupplier) {
    res.status(404);
    throw new Error('Proveedor no encontrado');
  }

  const supplier = await Supplier.update(
    req.params.id,
    { name, contact, email, phone, address },
    req.userId
  );

  res.json({
    message: 'Proveedor actualizado exitosamente',
    supplier
  });
});

/**
 * @desc    Eliminar un proveedor
 * @route   DELETE /api/suppliers/:id
 * @access  Private
 */
const deleteSupplier = asyncHandler(async (req, res) => {
  const deleted = await Supplier.delete(req.params.id, req.userId);

  if (!deleted) {
    res.status(404);
    throw new Error('Proveedor no encontrado');
  }

  res.json({
    message: 'Proveedor eliminado exitosamente'
  });
});

/**
 * @desc    Buscar proveedores por nombre
 * @route   GET /api/suppliers/search
 * @access  Private
 */
const searchSuppliers = asyncHandler(async (req, res) => {
  const { q } = req.query;

  if (!q || q.trim().length < 2) {
    res.status(400);
    throw new Error('El término de búsqueda debe tener al menos 2 caracteres');
  }

  const suppliers = await Supplier.search(q, req.userId);

  res.json({ suppliers });
});

/**
 * @desc    Obtener cantidad total de proveedores
 * @route   GET /api/suppliers/count
 * @access  Private
 */
const getSuppliersCount = asyncHandler(async (req, res) => {
  const count = await Supplier.count(req.userId);

  res.json({ count });
});

module.exports = {
  getSuppliers,
  getSupplierById,
  createSupplier,
  updateSupplier,
  deleteSupplier,
  searchSuppliers,
  getSuppliersCount
};