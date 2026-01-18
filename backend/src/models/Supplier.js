/**
 * Modelo de Proveedor
 * Maneja todas las operaciones de base de datos relacionadas con proveedores
 */
const { query } = require('../config/database');

class Supplier {
  /**
   * Crear un nuevo proveedor
   * @param {Object} supplierData - Datos del proveedor
   * @param {number} userId - ID del usuario que crea el proveedor
   * @returns {Object} Proveedor creado
   */
  static async create({ name, contact, email, phone, address }, userId) {
    const result = await query(
      `INSERT INTO suppliers (name, contact, email, phone, address, user_id) 
       VALUES ($1, $2, $3, $4, $5, $6) 
       RETURNING *`,
      [name, contact || null, email || null, phone || null, address || null, userId]
    );
    return result.rows[0];
  }

  /**
   * Obtener todos los proveedores de un usuario
   * @param {number} userId - ID del usuario
   * @param {Object} options - Opciones de paginación { page, limit }
   * @returns {Object} { suppliers, total, page, limit }
   */
  static async findAllByUser(userId, { page = 1, limit = 20 } = {}) {
    // Contar total
    const countResult = await query(
      'SELECT COUNT(*) FROM suppliers WHERE user_id = $1',
      [userId]
    );
    const total = parseInt(countResult.rows[0].count);

    // Obtener proveedores paginados
    const offset = (page - 1) * limit;
    const suppliersResult = await query(
      `SELECT * FROM suppliers WHERE user_id = $1 
       ORDER BY name ASC 
       LIMIT $2 OFFSET $3`,
      [userId, limit, offset]
    );

    return {
      suppliers: suppliersResult.rows,
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(total / limit)
    };
  }

  /**
   * Obtener un proveedor por ID
   * @param {number} id - ID del proveedor
   * @param {number} userId - ID del usuario
   * @returns {Object|null} Proveedor encontrado o null
   */
  static async findById(id, userId) {
    const result = await query(
      'SELECT * FROM suppliers WHERE id = $1 AND user_id = $2',
      [id, userId]
    );
    return result.rows[0] || null;
  }

  /**
   * Actualizar un proveedor
   * @param {number} id - ID del proveedor
   * @param {Object} data - Datos a actualizar
   * @param {number} userId - ID del usuario
   * @returns {Object|null} Proveedor actualizado o null
   */
  static async update(id, { name, contact, email, phone, address }, userId) {
    const result = await query(
      `UPDATE suppliers 
       SET name = COALESCE($1, name),
           contact = COALESCE($2, contact),
           email = COALESCE($3, email),
           phone = COALESCE($4, phone),
           address = COALESCE($5, address),
           updated_at = NOW()
       WHERE id = $6 AND user_id = $7
       RETURNING *`,
      [name, contact, email, phone, address, id, userId]
    );
    return result.rows[0] || null;
  }

  /**
   * Eliminar un proveedor
   * @param {number} id - ID del proveedor
   * @param {number} userId - ID del usuario
   * @returns {boolean} true si se eliminó
   */
  static async delete(id, userId) {
    const result = await query(
      'DELETE FROM suppliers WHERE id = $1 AND user_id = $2 RETURNING id',
      [id, userId]
    );
    return result.rows.length > 0;
  }

  /**
   * Buscar proveedores por nombre
   * @param {string} searchTerm - Término de búsqueda
   * @param {number} userId - ID del usuario
   * @returns {Array} Proveedores encontrados
   */
  static async search(searchTerm, userId) {
    const result = await query(
      `SELECT * FROM suppliers 
       WHERE user_id = $1 AND name ILIKE $2
       ORDER BY name ASC
       LIMIT 10`,
      [userId, `%${searchTerm}%`]
    );
    return result.rows;
  }

  /**
   * Obtener cantidad total de proveedores de un usuario
   * @param {number} userId
   * @returns {number} Cantidad de proveedores
   */
  static async count(userId) {
    const result = await query(
      'SELECT COUNT(*) FROM suppliers WHERE user_id = $1',
      [userId]
    );
    return parseInt(result.rows[0].count);
  }
}

module.exports = Supplier;