/**
 * Rutas de Proveedores
 */
const express = require('express');
const router = express.Router();
const {
  getSuppliers,
  getSupplierById,
  createSupplier,
  updateSupplier,
  deleteSupplier,
  searchSuppliers,
  getSuppliersCount
} = require('../controllers/supplierController');
const { authenticate } = require('../middlewares/authMiddleware');
const { validate } = require('../middlewares/validationMiddleware');
const { supplierRules } = require('../utils/validators');

// Todas las rutas requieren autenticación
router.use(authenticate);

// Rutas de proveedores
router.get('/search', searchSuppliers);
router.get('/count', getSuppliersCount);
router.get('/', getSuppliers);
router.get('/:id', getSupplierById);
router.post('/', supplierRules, validate, createSupplier);
router.put('/:id', supplierRules, validate, updateSupplier);
router.delete('/:id', deleteSupplier);

module.exports = router;