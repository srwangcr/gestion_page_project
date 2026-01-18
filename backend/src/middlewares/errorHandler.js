/**
 * Middleware para manejo centralizado de errores
 */

/**
 * Manejador de errores no encontrados (404)
 */
const notFound = (req, res, next) => {
  const error = new Error(`Ruta no encontrada: ${req.originalUrl}`);
  res.status(404);
  next(error);
};

/**
 * Manejador global de errores
 */
const errorHandler = (err, req, res, next) => {
  // Determinar código de estado
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  
  // Log del error en desarrollo
  if (process.env.NODE_ENV === 'development') {
    console.error('❌ Error:', err.message);
    console.error('Stack:', err.stack);
  }

  // Respuesta de error
  res.status(statusCode).json({
    message: err.message,
    ...(process.env.NODE_ENV === 'development' && {
      stack: err.stack
    })
  });
};

/**
 * Wrapper para manejar errores en funciones async
 * @param {Function} fn - Función async a envolver
 */
const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

module.exports = {
  notFound,
  errorHandler,
  asyncHandler
};