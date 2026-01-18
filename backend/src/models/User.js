/**
 * Modelo de Usuario
 * Maneja todas las operaciones de base de datos relacionadas con usuarios
 */
const { query } = require('../config/database');
const bcrypt = require('bcryptjs');

class User {
  /**
   * Crear un nuevo usuario
   * @param {Object} userData - { name, email, password }
   * @returns {Object} Usuario creado (sin password)
   */
  static async create({ name, email, password }) {
    // Encriptar contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const result = await query(
      `INSERT INTO users (name, email, password) 
       VALUES ($1, $2, $3) 
       RETURNING id, name, email, created_at, updated_at`,
      [name, email, hashedPassword]
    );

    return result.rows[0];
  }

  /**
   * Buscar usuario por email
   * @param {string} email
   * @returns {Object|null} Usuario encontrado o null
   */
  static async findByEmail(email) {
    const result = await query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    return result.rows[0] || null;
  }

  /**
   * Buscar usuario por ID
   * @param {number} id
   * @returns {Object|null} Usuario encontrado (sin password) o null
   */
  static async findById(id) {
    const result = await query(
      'SELECT id, name, email, created_at, updated_at FROM users WHERE id = $1',
      [id]
    );
    return result.rows[0] || null;
  }

  /**
   * Verificar contraseña
   * @param {string} plainPassword - Contraseña sin encriptar
   * @param {string} hashedPassword - Contraseña encriptada
   * @returns {boolean} true si coinciden
   */
  static async comparePassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  /**
   * Actualizar usuario
   * @param {number} id - ID del usuario
   * @param {Object} data - Datos a actualizar
   * @returns {Object} Usuario actualizado
   */
  static async update(id, { name, email }) {
    const result = await query(
      `UPDATE users 
       SET name = COALESCE($1, name), 
           email = COALESCE($2, email),
           updated_at = NOW()
       WHERE id = $3 
       RETURNING id, name, email, created_at, updated_at`,
      [name, email, id]
    );
    return result.rows[0];
  }

  /**
   * Verificar si existe un email
   * @param {string} email
   * @returns {boolean}
   */
  static async emailExists(email) {
    const result = await query(
      'SELECT id FROM users WHERE email = $1',
      [email]
    );
    return result.rows.length > 0;
  }
}

module.exports = User;