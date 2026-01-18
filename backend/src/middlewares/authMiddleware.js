/**
 * Middleware de autenticación
 * Verifica el token JWT en las peticiones protegidas
 */
const { verifyToken } = require('../utils/jwt');
const User = require('../models/User');

/**
 * Middleware para verificar autenticación
 * Extrae el token del header Authorization y verifica su validez
 */
const authenticate = async (req, res, next) => {
  try {
    // Obtener el header de autorización
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: 'Token de autenticación no proporcionado'
      });
    }

    // Verificar formato "Bearer <token>"
    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      return res.status(401).json({
        message: 'Formato de token inválido. Use: Bearer <token>'
      });
    }

    const token = parts[1];

    // Verificar el token
    const decoded = verifyToken(token);

    // Buscar el usuario
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({
        message: 'Usuario no encontrado'
      });
    }

    // Agregar usuario a la request
    req.user = user;
    req.userId = user.id;

    next();
  } catch (error) {
    console.error('Error en autenticación:', error.message);
    
    if (error.message === 'Token expirado') {
      return res.status(401).json({
        message: 'Token expirado. Por favor, inicia sesión nuevamente'
      });
    }

    if (error.message === 'Token inválido') {
      return res.status(401).json({
        message: 'Token inválido'
      });
    }

    return res.status(500).json({
      message: 'Error al verificar autenticación'
    });
  }
};

/**
 * Middleware opcional de autenticación
 * No bloquea si no hay token, pero si hay, lo verifica
 */
const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return next();
    }

    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      return next();
    }

    const token = parts[1];
    const decoded = verifyToken(token);
    const user = await User.findById(decoded.userId);

    if (user) {
      req.user = user;
      req.userId = user.id;
    }

    next();
  } catch (error) {
    // Si hay error, simplemente continúa sin usuario
    next();
  }
};

module.exports = {
  authenticate,
  optionalAuth
};