/**
 * Rutas de Autenticación
 */
const express = require('express');
const router = express.Router();
const { register, login, getProfile, updateProfile } = require('../controllers/authController');
const { authenticate } = require('../middlewares/authMiddleware');
const { validate } = require('../middlewares/validationMiddleware');
const { registerRules, loginRules } = require('../utils/validators');

// Rutas públicas
router.post('/register', registerRules, validate, register);
router.post('/login', loginRules, validate, login);

// Rutas protegidas
router.get('/profile', authenticate, getProfile);
router.put('/profile', authenticate, updateProfile);

module.exports = router;