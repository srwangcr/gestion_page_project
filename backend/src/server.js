/**
 * Servidor principal
 * Inicia la aplicación y conecta a la base de datos
 */
require('dotenv').config();

const app = require('./app');
const { pool } = require('./config/database');
const env = require('./config/env');

// Puerto del servidor
const PORT = env.PORT;

// Función para probar conexión a la base de datos
const testDatabaseConnection = async () => {
  try {
    const result = await pool.query('SELECT NOW()');
    console.log('✅ Conexión a PostgreSQL exitosa');
    console.log(`   Hora del servidor DB: ${result.rows[0].now}`);
    return true;
  } catch (error) {
    console.error('❌ Error conectando a PostgreSQL:', error.message);
    return false;
  }
};

// Iniciar servidor
const startServer = async () => {
  console.log('\n🚀 Iniciando servidor...\n');

  // Probar conexión a la base de datos
  const dbConnected = await testDatabaseConnection();
  
  if (!dbConnected) {
    console.log('\n⚠️  El servidor se iniciará sin conexión a la base de datos');
    console.log('   Algunas funcionalidades podrían no estar disponibles\n');
  }

  // Iniciar servidor HTTP
  app.listen(PORT, () => {
    console.log(`\n✅ Servidor corriendo en puerto ${PORT}`);
    console.log(`   URL: http://localhost:${PORT}`);
    console.log(`   Modo: ${env.NODE_ENV}`);
    console.log(`\n📋 Endpoints disponibles:`);
    console.log(`   - GET  /api/health`);
    console.log(`   - POST /api/auth/register`);
    console.log(`   - POST /api/auth/login`);
    console.log(`   - GET  /api/auth/profile`);
    console.log(`   - GET  /api/orders`);
    console.log(`   - GET  /api/suppliers`);
    console.log('\n');
  });
};

// Manejar errores no capturados
process.on('unhandledRejection', (err) => {
  console.error('❌ Error no manejado:', err.message);
  process.exit(1);
});

process.on('uncaughtException', (err) => {
  console.error('❌ Excepción no capturada:', err.message);
  process.exit(1);
});

// Manejar cierre graceful
process.on('SIGTERM', async () => {
  console.log('\n👋 Cerrando servidor...');
  await pool.end();
  console.log('✅ Conexiones cerradas');
  process.exit(0);
});

// Iniciar
startServer();