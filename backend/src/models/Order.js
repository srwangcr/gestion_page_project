/**
 * Modelo de Orden
 * Maneja todas las operaciones de base de datos relacionadas con órdenes
 */
const { query } = require('../config/database');

class Order {
  /**
   * Crear una nueva orden
   * @param {Object} orderData - Datos de la orden
   * @param {number} userId - ID del usuario que crea la orden
   * @returns {Object} Orden creada
   */
  static async create({ name, description, quantity, supplier }, userId) {
    const result = await query(
      `INSERT INTO orders (name, description, quantity, supplier_id, status, user_id) 
       VALUES ($1, $2, $3, $4, 'pendiente', $5) 
       RETURNING *`,
      [name, description || null, quantity || 1, supplier || null, userId]
    );
    return result.rows[0];
  }

  /**
   * Obtener todas las órdenes de un usuario
   * @param {number} userId - ID del usuario
   * @param {Object} filters - Filtros opcionales { status, page, limit }
   * @returns {Object} { orders, total, page, limit }
   */
  static async findAllByUser(userId, { status, page = 1, limit = 10 } = {}) {
    let whereClause = 'WHERE user_id = $1';
    const params = [userId];

    if (status && status !== 'all') {
      whereClause += ' AND status = $2';
      params.push(status);
    }

    // Contar total
    const countResult = await query(
      `SELECT COUNT(*) FROM orders ${whereClause}`,
      params
    );
    const total = parseInt(countResult.rows[0].count);

    // Obtener órdenes paginadas
    const offset = (page - 1) * limit;
    const ordersResult = await query(
      `SELECT * FROM orders ${whereClause} 
       ORDER BY created_at DESC 
       LIMIT $${params.length + 1} OFFSET $${params.length + 2}`,
      [...params, limit, offset]
    );

    return {
      orders: ordersResult.rows,
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(total / limit)
    };
  }

  /**
   * Obtener una orden por ID
   * @param {number} id - ID de la orden
   * @param {number} userId - ID del usuario (para verificar propiedad)
   * @returns {Object|null} Orden encontrada o null
   */
  static async findById(id, userId) {
    const result = await query(
      'SELECT * FROM orders WHERE id = $1 AND user_id = $2',
      [id, userId]
    );
    return result.rows[0] || null;
  }

  /**
   * Actualizar una orden
   * @param {number} id - ID de la orden
   * @param {Object} data - Datos a actualizar
   * @param {number} userId - ID del usuario
   * @returns {Object|null} Orden actualizada o null
   */
  static async update(id, { name, description, quantity, supplier, status }, userId) {
    const result = await query(
      `UPDATE orders 
       SET name = COALESCE($1, name),
           description = COALESCE($2, description),
           quantity = COALESCE($3, quantity),
           supplier_id = COALESCE($4, supplier_id),
           status = COALESCE($5, status),
           updated_at = NOW()
       WHERE id = $6 AND user_id = $7
       RETURNING *`,
      [name, description, quantity, supplier, status, id, userId]
    );
    return result.rows[0] || null;
  }

  /**
   * Actualizar solo el estado de una orden
   * @param {number} id - ID de la orden
   * @param {string} status - Nuevo estado
   * @param {number} userId - ID del usuario
   * @returns {Object|null} Orden actualizada o null
   */
  static async updateStatus(id, status, userId) {
    const result = await query(
      `UPDATE orders 
       SET status = $1, updated_at = NOW()
       WHERE id = $2 AND user_id = $3
       RETURNING *`,
      [status, id, userId]
    );
    return result.rows[0] || null;
  }

  /**
   * Eliminar una orden
   * @param {number} id - ID de la orden
   * @param {number} userId - ID del usuario
   * @returns {boolean} true si se eliminó
   */
  static async delete(id, userId) {
    const result = await query(
      'DELETE FROM orders WHERE id = $1 AND user_id = $2 RETURNING id',
      [id, userId]
    );
    return result.rows.length > 0;
  }

  /**
   * Obtener estadísticas de órdenes de un usuario
   * @param {number} userId
   * @returns {Object} Estadísticas
   */
  static async getStats(userId) {
    const result = await query(
      `SELECT 
         COUNT(*) as total,
         COUNT(*) FILTER (WHERE status = 'pendiente') as pending,
         COUNT(*) FILTER (WHERE status = 'en_proceso') as processing,
         COUNT(*) FILTER (WHERE status = 'completada') as completed,
         COUNT(*) FILTER (WHERE status = 'cancelada') as cancelled
       FROM orders WHERE user_id = $1`,
      [userId]
    );
    return result.rows[0];
  }
}

module.exports = Order;