/**
 * Controlador de Autenticación
 * Maneja registro, login y perfil de usuarios
 */
const User = require('../models/User');
const { generateToken } = require('../utils/jwt');
const { asyncHandler } = require('../middlewares/errorHandler');

/**
 * @desc    Registrar nuevo usuario
 * @route   POST /api/auth/register
 * @access  Public
 */
const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Verificar si el email ya existe
  const existingUser = await User.emailExists(email);
  if (existingUser) {
    res.status(400);
    throw new Error('El email ya está registrado');
  }

  // Crear usuario
  const user = await User.create({ name, email, password });

  // Generar token
  const token = generateToken({ userId: user.id });

  res.status(201).json({
    message: 'Usuario registrado exitosamente',
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email
    }
  });
});

/**
 * @desc    Iniciar sesión
 * @route   POST /api/auth/login
 * @access  Public
 */
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Buscar usuario por email
  const user = await User.findByEmail(email);
  if (!user) {
    res.status(401);
    throw new Error('Credenciales inválidas');
  }

  // Verificar contraseña
  const isMatch = await User.comparePassword(password, user.password);
  if (!isMatch) {
    res.status(401);
    throw new Error('Credenciales inválidas');
  }

  // Generar token
  const token = generateToken({ userId: user.id });

  res.json({
    message: 'Inicio de sesión exitoso',
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email
    }
  });
});

/**
 * @desc    Obtener perfil del usuario autenticado
 * @route   GET /api/auth/profile
 * @access  Private
 */
const getProfile = asyncHandler(async (req, res) => {
  res.json({
    user: req.user
  });
});

/**
 * @desc    Actualizar perfil del usuario
 * @route   PUT /api/auth/profile
 * @access  Private
 */
const updateProfile = asyncHandler(async (req, res) => {
  const { name, email } = req.body;

  // Si quiere cambiar email, verificar que no exista
  if (email && email !== req.user.email) {
    const existingUser = await User.emailExists(email);
    if (existingUser) {
      res.status(400);
      throw new Error('El email ya está en uso');
    }
  }

  const updatedUser = await User.update(req.userId, { name, email });

  res.json({
    message: 'Perfil actualizado exitosamente',
    user: updatedUser
  });
});

module.exports = {
  register,
  login,
  getProfile,
  updateProfile
};