/**
 * Middleware de validación
 * Procesa los resultados de express-validator
 */
const { validationResult } = require('express-validator');

/**
 * Middleware para validar los resultados de express-validator
 * Retorna errores 400 si hay validaciones fallidas
 */
const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const extractedErrors = errors.array().map(err => ({
      field: err.path,
      message: err.msg
    }));

    return res.status(400).json({
      message: 'Error de validación',
      errors: extractedErrors
    });
  }

  next();
};

module.exports = {
  validate
};