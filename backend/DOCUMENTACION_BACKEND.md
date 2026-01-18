# 📚 Documentación del Backend - Sistema de Gestión de Órdenes

## 📋 Índice
1. [Visión General](#visión-general)
2. [Arquitectura](#arquitectura)
3. [Base de Datos](#base-de-datos)
4. [Endpoints de la API](#endpoints-de-la-api)
5. [Instalación y Configuración](#instalación-y-configuración)
6. [Seguridad](#seguridad)

---

## 🎯 Visión General

Backend RESTful API desarrollado con **Node.js** y **Express** para gestionar órdenes y proveedores. Utiliza **PostgreSQL** como base de datos y **JWT** para autenticación.

### Stack Tecnológico
| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| Node.js | 18.x+ | Runtime JavaScript |
| Express | 4.x | Framework web |
| PostgreSQL | 15.x+ | Base de datos relacional |
| bcryptjs | 2.x | Encriptación de contraseñas |
| jsonwebtoken | 9.x | Autenticación JWT |
| express-validator | 7.x | Validación de datos |
| cors | 2.x | Manejo de CORS |
| helmet | 7.x | Seguridad HTTP |
| morgan | 1.x | Logging de requests |
| dotenv | 16.x | Variables de entorno |
| pg | 8.x | Cliente PostgreSQL |

---

## 🏗️ Arquitectura

### Estructura del Proyecto
```
backend/src/
├── app.js                 # Configuración Express
├── server.js              # Punto de entrada
├── config/
│   ├── database.js        # Conexión PostgreSQL
│   └── env.js             # Variables de entorno
├── controllers/
│   ├── authController.js  # Lógica de autenticación
│   ├── orderController.js # Lógica de órdenes
│   └── supplierController.js # Lógica de proveedores
├── db/
│   ├── migrations/        # Scripts SQL de migración
│   └── seeds/             # Datos de prueba
├── middlewares/
│   ├── authMiddleware.js  # Verificación JWT
│   ├── errorHandler.js    # Manejo de errores
│   └── validationMiddleware.js # Validación
├── models/
│   ├── User.js            # Modelo de usuario
│   ├── Order.js           # Modelo de orden
│   └── Supplier.js        # Modelo de proveedor
├── routes/
│   ├── authRoutes.js      # Rutas de autenticación
│   ├── orderRoutes.js     # Rutas de órdenes
│   └── supplierRoutes.js  # Rutas de proveedores
└── utils/
    ├── jwt.js             # Utilidades JWT
    └── validators.js      # Reglas de validación
```

### Patrón de Diseño
- **MVC (Model-View-Controller)**: Separación clara de responsabilidades
- **Repository Pattern**: Modelos encapsulan acceso a datos
- **Middleware Pattern**: Cadena de procesamiento de requests

---

## 🗄️ Base de Datos

### Cantidad de Bases de Datos: **1 (UNA)**

Nombre recomendado: `orders_db`

### Tablas Requeridas: **3 (TRES)**

---

### 📊 Diagrama Entidad-Relación

```
┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐
│     users       │       │    suppliers    │       │     orders      │
├─────────────────┤       ├─────────────────┤       ├─────────────────┤
│ id (PK)         │──┐    │ id (PK)         │──┐    │ id (PK)         │
│ name            │  │    │ user_id (FK)    │◄─┼────│ user_id (FK)    │
│ email           │  │    │ name            │  │    │ supplier_id(FK) │◄──┐
│ password        │  │    │ contact         │  │    │ name            │   │
│ created_at      │  │    │ email           │  │    │ description     │   │
│ updated_at      │  │    │ phone           │  │    │ quantity        │   │
└─────────────────┘  │    │ address         │  │    │ status          │   │
                     │    │ created_at      │  │    │ created_at      │   │
                     │    │ updated_at      │  │    │ updated_at      │   │
                     │    └─────────────────┘  │    └─────────────────┘   │
                     │                         │                          │
                     └─────────────────────────┴──────────────────────────┘
```

---

### 📋 Tabla: `users`

| Columna | Tipo | Restricciones | Descripción |
|---------|------|---------------|-------------|
| `id` | SERIAL | PRIMARY KEY | Identificador único |
| `name` | VARCHAR(100) | NOT NULL | Nombre del usuario |
| `email` | VARCHAR(255) | NOT NULL, UNIQUE | Correo electrónico |
| `password` | VARCHAR(255) | NOT NULL | Contraseña hasheada (bcrypt) |
| `created_at` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Fecha de creación |
| `updated_at` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Fecha de actualización |

**Índices:**
- `idx_users_email` en columna `email`

---

### 📋 Tabla: `suppliers`

| Columna | Tipo | Restricciones | Descripción |
|---------|------|---------------|-------------|
| `id` | SERIAL | PRIMARY KEY | Identificador único |
| `user_id` | INTEGER | NOT NULL, FK → users(id) | Usuario propietario |
| `name` | VARCHAR(150) | NOT NULL | Nombre del proveedor |
| `contact` | VARCHAR(100) | | Persona de contacto |
| `email` | VARCHAR(255) | | Email del proveedor |
| `phone` | VARCHAR(50) | | Teléfono |
| `address` | TEXT | | Dirección completa |
| `created_at` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Fecha de creación |
| `updated_at` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Fecha de actualización |

**Índices:**
- `idx_suppliers_user_id` en columna `user_id`
- `idx_suppliers_name` en columna `name`

**Relaciones:**
- ON DELETE CASCADE desde `users`

---

### 📋 Tabla: `orders`

| Columna | Tipo | Restricciones | Descripción |
|---------|------|---------------|-------------|
| `id` | SERIAL | PRIMARY KEY | Identificador único |
| `user_id` | INTEGER | NOT NULL, FK → users(id) | Usuario propietario |
| `supplier_id` | INTEGER | FK → suppliers(id) | Proveedor asociado (opcional) |
| `name` | VARCHAR(200) | NOT NULL | Nombre/título de la orden |
| `description` | TEXT | | Descripción detallada |
| `quantity` | INTEGER | DEFAULT 1 | Cantidad |
| `status` | VARCHAR(50) | CHECK constraint | Estado de la orden |
| `created_at` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Fecha de creación |
| `updated_at` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Fecha de actualización |

**Estados válidos (CHECK constraint):**
- `pendiente` - Orden creada, esperando procesamiento
- `en_proceso` - Orden siendo procesada
- `completada` - Orden finalizada exitosamente
- `cancelada` - Orden cancelada

**Índices:**
- `idx_orders_user_id` en columna `user_id`
- `idx_orders_status` en columna `status`
- `idx_orders_supplier_id` en columna `supplier_id`
- `idx_orders_created_at` en columna `created_at` (DESC)

**Relaciones:**
- ON DELETE CASCADE desde `users`
- ON DELETE SET NULL desde `suppliers`

---

### 🔧 Comandos SQL para Crear la Base de Datos

```sql
-- 1. Crear la base de datos
CREATE DATABASE orders_db;

-- 2. Conectar a la base de datos
\c orders_db

-- 3. Ejecutar migración
-- Usar el archivo: backend/src/db/migrations/001_initial_schema.sql

-- 4. (Opcional) Cargar datos de prueba
-- Usar el archivo: backend/src/db/seeds/dev_data.sql
```

---

## 🔌 Endpoints de la API

### Base URL: `http://localhost:3000/api`

---

### 🔐 Autenticación (`/auth`)

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| POST | `/auth/register` | Registrar usuario | ❌ |
| POST | `/auth/login` | Iniciar sesión | ❌ |
| GET | `/auth/profile` | Obtener perfil | ✅ |
| PUT | `/auth/profile` | Actualizar perfil | ✅ |

#### POST /auth/register
```json
// Request
{
  "name": "Juan Pérez",
  "email": "juan@example.com",
  "password": "password123"
}

// Response 201
{
  "message": "Usuario registrado exitosamente",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": 1,
    "name": "Juan Pérez",
    "email": "juan@example.com"
  }
}
```

#### POST /auth/login
```json
// Request
{
  "email": "juan@example.com",
  "password": "password123"
}

// Response 200
{
  "message": "Inicio de sesión exitoso",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": 1,
    "name": "Juan Pérez",
    "email": "juan@example.com"
  }
}
```

---

### 📦 Órdenes (`/orders`)

> Todas las rutas requieren autenticación (Header: `Authorization: Bearer <token>`)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/orders` | Listar órdenes (paginado) |
| GET | `/orders/stats` | Obtener estadísticas |
| GET | `/orders/:id` | Obtener orden por ID |
| POST | `/orders` | Crear nueva orden |
| PUT | `/orders/:id` | Actualizar orden |
| PATCH | `/orders/:id/status` | Actualizar solo estado |
| DELETE | `/orders/:id` | Eliminar orden |

#### GET /orders
```
Query params:
- status: filtrar por estado (pendiente, en_proceso, completada, cancelada)
- page: número de página (default: 1)
- limit: resultados por página (default: 10)
```

```json
// Response 200
{
  "orders": [...],
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalItems": 48,
    "limit": 10
  }
}
```

#### POST /orders
```json
// Request
{
  "name": "Pedido de materiales",
  "description": "Materiales para proyecto X",
  "quantity": 100,
  "supplier": 1
}

// Response 201
{
  "message": "Orden creada exitosamente",
  "order": {
    "id": 1,
    "name": "Pedido de materiales",
    "description": "Materiales para proyecto X",
    "quantity": 100,
    "status": "pendiente",
    "supplier_id": 1,
    "user_id": 1,
    "created_at": "2024-01-15T10:30:00Z"
  }
}
```

---

### 👥 Proveedores (`/suppliers`)

> Todas las rutas requieren autenticación (Header: `Authorization: Bearer <token>`)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/suppliers` | Listar proveedores (paginado) |
| GET | `/suppliers/search?q=` | Buscar por nombre |
| GET | `/suppliers/count` | Obtener cantidad total |
| GET | `/suppliers/:id` | Obtener proveedor por ID |
| POST | `/suppliers` | Crear nuevo proveedor |
| PUT | `/suppliers/:id` | Actualizar proveedor |
| DELETE | `/suppliers/:id` | Eliminar proveedor |

#### POST /suppliers
```json
// Request
{
  "name": "Proveedor ABC",
  "contact": "Juan López",
  "email": "juan@proveedorabc.com",
  "phone": "+52 55 1234 5678",
  "address": "Av. Principal 123, Ciudad"
}

// Response 201
{
  "message": "Proveedor creado exitosamente",
  "supplier": {
    "id": 1,
    "name": "Proveedor ABC",
    "contact": "Juan López",
    "email": "juan@proveedorabc.com",
    "phone": "+52 55 1234 5678",
    "address": "Av. Principal 123, Ciudad",
    "user_id": 1,
    "created_at": "2024-01-15T10:30:00Z"
  }
}
```

---

### 🏥 Health Check

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/health` | Estado del servidor |

```json
// Response 200
{
  "status": "OK",
  "message": "API funcionando correctamente",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

---

## 🚀 Instalación y Configuración

### 1. Prerrequisitos
- Node.js 18.x o superior
- PostgreSQL 15.x o superior
- npm o yarn

### 2. Instalación

```bash
# Navegar a la carpeta del backend
cd backend/src

# Instalar dependencias
npm install

# Copiar archivo de configuración
cp .env.example .env

# Editar .env con tus valores
nano .env
```

### 3. Configurar Base de Datos

```bash
# Conectar a PostgreSQL
psql -U postgres

# Crear base de datos
CREATE DATABASE orders_db;

# Salir de psql
\q

# Ejecutar migración
psql -U postgres -d orders_db -f db/migrations/001_initial_schema.sql

# (Opcional) Cargar datos de prueba
psql -U postgres -d orders_db -f db/seeds/dev_data.sql
```

### 4. Ejecutar Servidor

```bash
# Modo desarrollo
npm run dev

# Modo producción
npm start
```

El servidor estará disponible en `http://localhost:3000`

---

## 🔒 Seguridad

### Autenticación JWT
- Tokens firmados con algoritmo HS256
- Expiración configurable (default: 7 días)
- Token debe enviarse en header: `Authorization: Bearer <token>`

### Contraseñas
- Hash con bcrypt (10 salt rounds)
- Nunca se almacenan en texto plano
- Validación de longitud mínima (6 caracteres)

### Middlewares de Seguridad
- **Helmet**: Headers HTTP seguros
- **CORS**: Control de origen cruzado
- **Rate Limiting**: (Recomendado agregar en producción)

### Validación de Datos
- express-validator en todas las rutas
- Sanitización de inputs
- Mensajes de error descriptivos

---

## 📝 Variables de Entorno

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `PORT` | Puerto del servidor | `3000` |
| `NODE_ENV` | Entorno de ejecución | `development` |
| `DB_HOST` | Host de PostgreSQL | `localhost` |
| `DB_PORT` | Puerto de PostgreSQL | `5432` |
| `DB_NAME` | Nombre de la base de datos | `orders_db` |
| `DB_USER` | Usuario de PostgreSQL | `postgres` |
| `DB_PASSWORD` | Contraseña de PostgreSQL | `password` |
| `JWT_SECRET` | Clave secreta para JWT | `mi_clave_super_secreta_32chars` |
| `JWT_EXPIRES_IN` | Duración del token | `7d` |
| `CORS_ORIGIN` | Origen permitido CORS | `http://localhost:5173` |

---

## 📄 Scripts Disponibles

```json
{
  "start": "node server.js",
  "dev": "nodemon server.js"
}
```

---

## 👨‍💻 Autor

Sistema desarrollado como parte del proyecto de gestión de órdenes.

---

**Versión:** 1.0.0  
**Última actualización:** Enero 2024
