-- ============================================
-- DATOS DE DESARROLLO/PRUEBA
-- Sistema de Gestión de Órdenes
-- ============================================
-- NOTA: Las contraseñas aquí son hashes de bcrypt
-- Para desarrollo, usar: password123
-- Hash generado con bcryptjs (10 rounds)

-- ============================================
-- Limpiar datos existentes (solo desarrollo)
-- ============================================
-- TRUNCATE orders, suppliers, users RESTART IDENTITY CASCADE;

-- ============================================
-- USUARIOS DE PRUEBA
-- Contraseña para todos: password123
-- ============================================
INSERT INTO users (name, email, password) VALUES
('Admin Usuario', 'admin@example.com', '$2a$10$rQnM1vP5YKfz3jL7h8m9xOqE5dW2cA1bC6vN4mK8jI3hG0fE5dC2a'),
('Juan Pérez', 'juan@example.com', '$2a$10$rQnM1vP5YKfz3jL7h8m9xOqE5dW2cA1bC6vN4mK8jI3hG0fE5dC2a'),
('María García', 'maria@example.com', '$2a$10$rQnM1vP5YKfz3jL7h8m9xOqE5dW2cA1bC6vN4mK8jI3hG0fE5dC2a')
ON CONFLICT (email) DO NOTHING;

-- ============================================
-- PROVEEDORES DE PRUEBA
-- ============================================
INSERT INTO suppliers (user_id, name, contact, email, phone, address) VALUES
-- Proveedores del Admin
(1, 'Distribuidora Central', 'Carlos Mendoza', 'contacto@distcentral.com', '+52 55 1234 5678', 'Av. Principal 123, Ciudad de México'),
(1, 'Suministros Express', 'Ana López', 'ventas@sumexpress.com', '+52 55 9876 5432', 'Calle Comercio 456, Guadalajara'),
(1, 'Materiales del Norte', 'Roberto Sánchez', 'info@matnorte.com', '+52 81 5555 1234', 'Blvd. Industrial 789, Monterrey'),
-- Proveedores de Juan
(2, 'Proveedor Local SA', 'Luis Hernández', 'luis@provlocal.com', '+52 33 4444 5555', 'Av. Comercial 321, Guadalajara'),
(2, 'Importaciones MX', 'Diana Torres', 'diana@importmx.com', '+52 55 6666 7777', 'Zona Industrial Sur, CDMX'),
-- Proveedores de María
(3, 'Logística Integral', 'Patricia Ruiz', 'patricia@logint.com', '+52 81 8888 9999', 'Parque Industrial Norte, Monterrey')
ON CONFLICT DO NOTHING;

-- ============================================
-- ÓRDENES DE PRUEBA
-- ============================================
INSERT INTO orders (user_id, supplier_id, name, description, quantity, status) VALUES
-- Órdenes del Admin
(1, 1, 'Papelería mensual', 'Resmas de papel, carpetas y material de oficina', 50, 'completada'),
(1, 2, 'Equipos de cómputo', 'Laptops Dell para nuevo personal', 5, 'en_proceso'),
(1, 3, 'Mobiliario oficina', 'Escritorios y sillas ergonómicas', 10, 'pendiente'),
(1, 1, 'Suministros limpieza', 'Productos de limpieza trimestral', 100, 'completada'),
(1, 2, 'Herramientas técnicas', 'Kit de herramientas para mantenimiento', 3, 'cancelada'),
-- Órdenes de Juan
(2, 4, 'Materia prima textil', 'Telas para producción mensual', 200, 'en_proceso'),
(2, 5, 'Componentes electrónicos', 'Microcontroladores y sensores', 500, 'pendiente'),
(2, 4, 'Insumos empaque', 'Cajas y material de empaque', 1000, 'completada'),
-- Órdenes de María
(3, 6, 'Productos farmacéuticos', 'Medicamentos para inventario', 150, 'pendiente'),
(3, 6, 'Equipo médico', 'Instrumental quirúrgico básico', 20, 'en_proceso'),
(3, 6, 'Material desechable', 'Guantes, mascarillas y gasas', 500, 'completada')
ON CONFLICT DO NOTHING;

-- ============================================
-- Verificar datos insertados
-- ============================================
-- SELECT 'Usuarios insertados:' as info, COUNT(*) as count FROM users;
-- SELECT 'Proveedores insertados:' as info, COUNT(*) as count FROM suppliers;
-- SELECT 'Órdenes insertadas:' as info, COUNT(*) as count FROM orders;

-- SELECT 'Datos de desarrollo cargados exitosamente' as status;