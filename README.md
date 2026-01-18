# 📦 Sistema de Gestión de Órdenes y Proveedores

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-brown)
![React](https://img.shields.io/badge/React-18.x-black)
![Node.js](https://img.shields.io/badge/Node.js-18.x-brown)
![License](https://img.shields.io/badge/license-MIT-black)

**Un sistema moderno y minimalista para la gestión de órdenes y proveedores**

[Características](#-características) •
[Instalación](#-instalación) •
[Uso](#-uso) •
[API](#-api-endpoints) •
[Contribuir](#-contribuir)

</div>

---

## 📋 Descripción

Sistema web full-stack diseñado para gestionar órdenes de compra y proveedores. Cuenta con una interfaz minimalista en tonos negros y cafés, autenticación segura con JWT, y una arquitectura escalable.

## ✨ Características

### Frontend
- 🎨 **Diseño Minimalista** - Interfaz elegante en colores negros y cafés
- 📱 **Responsive** - Adaptable a todos los dispositivos
- 🔐 **Autenticación** - Sistema de login/registro con JWT
- 📊 **Dashboard** - Panel con estadísticas en tiempo real
- 📦 **Gestión de Órdenes** - CRUD completo con filtros avanzados
- 👥 **Gestión de Proveedores** - Administración de proveedores
- 🛡️ **Rutas Protegidas** - Acceso restringido por autenticación

### Backend
- 🚀 **API RESTful** - Endpoints bien estructurados
- 🔑 **JWT Authentication** - Tokens seguros con expiración
- 🗄️ **PostgreSQL** - Base de datos robusta
- ✅ **Validaciones** - Middleware de validación de datos
- 🛡️ **Seguridad** - Protección contra ataques comunes

## 🛠️ Tecnologías

### Frontend
| Tecnología | Versión | Descripción |
|------------|---------|-------------|
| React | 18.x | Biblioteca UI |
| React Router | 6.x | Enrutamiento SPA |
| Vite | 7.x | Build tool |
| CSS3 | - | Estilos personalizados |

### Backend
| Tecnología | Versión | Descripción |
|------------|---------|-------------|
| Node.js | 18.x | Runtime JavaScript |
| Express | 4.x | Framework web |
| PostgreSQL | 15.x | Base de datos |
| JWT | - | Autenticación |
| bcryptjs | - | Encriptación |

## 📁 Estructura del Proyecto

```
proyect1
├── 📂 public/
│   └── index.html
├── 📂 src/
│   ├── 📂 assets/              # Recursos estáticos
│   ├── 📂 components/
│   │   ├── 📂 auth/            # Componentes de autenticación
│   │   │   ├── LoginForm.jsx
│   │   │   ├── RegisterForm.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── 📂 common/          # Componentes reutilizables
│   │   │   ├── Button.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── Table.jsx
│   │   │   └── Task.jsx
│   │   ├── 📂 orders/          # Componentes de órdenes
│   │   │   ├── OrderCard.jsx
│   │   │   ├── OrderFilters.jsx
│   │   │   ├── OrderForm.jsx
│   │   │   └── OrderList.jsx
│   │   └── 📂 suppliers/       # Componentes de proveedores
│   │       ├── SupplierCard.jsx
│   │       ├── SupplierForm.jsx
│   │       └── SupplierList.jsx
│   ├── 📂 context/
│   │   └── AuthContext.jsx     # Contexto de autenticación
│   ├── 📂 hooks/
│   │   ├── useApi.js           # Hook para llamadas API
│   │   └── useAuth.js          # Hook de autenticación
│   ├── 📂 pages/
│   │   ├── Dashboard.jsx       # Página principal
│   │   ├── Login.jsx           # Inicio de sesión
│   │   ├── Register.jsx        # Registro
│   │   ├── Orders.jsx          # Gestión de órdenes
│   │   ├── Suppliers.jsx       # Gestión de proveedores
│   │   └── NotFound.jsx        # Página 404
│   ├── 📂 services/
│   │   ├── api.js              # Cliente HTTP base
│   │   ├── authService.js      # Servicio de autenticación
│   │   ├── orderService.js     # Servicio de órdenes
│   │   └── supplierService.js  # Servicio de proveedores
│   ├── 📂 utils/
│   │   ├── formatters.js       # Funciones de formato
│   │   └── validators.js       # Validaciones
│   ├── App.jsx                 # Componente principal
│   ├── App.css                 # Estilos globales
│   ├── main.jsx                # Punto de entrada
│   └── index.css               # Variables CSS
├── 📂 backend/
│   └── 📂 src/
│       ├── 📂 config/          # Configuraciones
│       ├── 📂 controllers/     # Controladores
│       ├── 📂 db/              # Migraciones y seeds
│       ├── 📂 middlewares/     # Middlewares
│       ├── 📂 models/          # Modelos
│       ├── 📂 routes/          # Rutas
│       ├── 📂 utils/           # Utilidades
│       ├── app.js              # Configuración Express
│       └── server.js           # Servidor
├── package.json
├── vite.config.js
└── README.md
```

## 🚀 Instalación

### Prerrequisitos
- Node.js 18.x o superior
- PostgreSQL 15.x o superior
- npm o yarn

### 1. Clonar el repositorio
```bash
git clone https://github.com/srwangcr/gestion_page_project.git
cd gestion_page_project
```

### 2. Instalar dependencias del Frontend
```bash
npm install
```

### 3. Instalar dependencias del Backend
```bash
cd backend/src
npm install
```

### 4. Configurar variables de entorno

Crear archivo `.env` en `backend/src/`:
```env
# Servidor
PORT=3000
NODE_ENV=development

# Base de datos
DB_HOST=localhost
DB_PORT=5432
DB_NAME=orders_db
DB_USER=tu_usuario
DB_PASSWORD=tu_password

# JWT
JWT_SECRET=tu_secreto_super_seguro_minimo_32_caracteres
JWT_EXPIRES_IN=24h

# CORS (cambiar según el puerto del frontend)
CORS_ORIGIN=http://localhost:5173
```

### 5. Configurar base de datos

**Opción A - Con usuario postgres:**
```bash
# Crear la base de datos
sudo -u postgres psql -c "CREATE DATABASE orders_db;"

# Ejecutar migraciones
cat backend/src/db/migrations/001_initial_schema.sql | sudo -u postgres psql -d orders_db

# Cargar datos de prueba (opcional)
cat backend/src/db/seeds/dev_data.sql | sudo -u postgres psql -d orders_db
```

**Opción B - Con tu usuario (si tienes permisos):**
```bash
psql -c "CREATE DATABASE orders_db;"
psql -d orders_db -f backend/src/db/migrations/001_initial_schema.sql
psql -d orders_db -f backend/src/db/seeds/dev_data.sql
```

### 6. Iniciar la aplicación

**Terminal 1 - Backend:**
```bash
cd backend/src
npm run dev
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

## 💻 Uso

### Acceder a la aplicación
- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:3000
- **Health Check:** http://localhost:3000/api/health

### Credenciales de prueba
Si cargaste los datos de prueba (`dev_data.sql`), puedes usar:
```
Email: admin@example.com
Password: password123
```

O registra un nuevo usuario desde la aplicación.

## 🔌 API Endpoints

### Autenticación
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `POST` | `/api/auth/register` | Registrar usuario |
| `POST` | `/api/auth/login` | Iniciar sesión |
| `GET` | `/api/auth/profile` | Obtener perfil |
| `PUT` | `/api/auth/profile` | Actualizar perfil |

### Órdenes
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/api/orders` | Listar órdenes (paginado) |
| `GET` | `/api/orders/stats` | Estadísticas de órdenes |
| `GET` | `/api/orders/:id` | Obtener orden |
| `POST` | `/api/orders` | Crear orden |
| `PUT` | `/api/orders/:id` | Actualizar orden |
| `PATCH` | `/api/orders/:id/status` | Cambiar estado |
| `DELETE` | `/api/orders/:id` | Eliminar orden |

### Proveedores
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/api/suppliers` | Listar proveedores |
| `GET` | `/api/suppliers/search?q=` | Buscar proveedores |
| `GET` | `/api/suppliers/count` | Contar proveedores |
| `GET` | `/api/suppliers/:id` | Obtener proveedor |
| `POST` | `/api/suppliers` | Crear proveedor |
| `PUT` | `/api/suppliers/:id` | Actualizar proveedor |
| `DELETE` | `/api/suppliers/:id` | Eliminar proveedor |

### Health Check
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/api/health` | Estado del servidor |

## 🎨 Paleta de Colores

| Color | Hex | Uso |
|-------|-----|-----|
| Negro Principal | `#1a1a1a` | Fondos principales |
| Negro Secundario | `#2d2d2d` | Tarjetas, modales |
| Café Oscuro | `#3d2b1f` | Acentos, bordes |
| Café Medio | `#5c4033` | Botones primarios |
| Café Claro | `#8b6914` | Hover, highlights |
| Crema | `#d4c4a8` | Texto secundario |
| Blanco | `#f5f5f5` | Texto principal |

## 📱 Capturas de Pantalla

### Dashboard
```
┌─────────────────────────────────────────┐
│  🏠 Dashboard                           │
├─────────────────────────────────────────┤
│  ┌─────────┐ ┌─────────┐ ┌─────────┐   │
│  │ Órdenes │ │ Proveed │ │ Pend... │   │
│  │   124   │ │   45    │ │   12    │   │
│  └─────────┘ └─────────┘ └─────────┘   │
│                                         │
│  📊 Órdenes Recientes                   │
│  ├── Orden #001 - Pendiente            │
│  ├── Orden #002 - Completada           │
│  └── Orden #003 - En proceso           │
└─────────────────────────────────────────┘
```

## 🧪 Testing

```bash
# Ejecutar tests del frontend
npm run test

# Ejecutar tests del backend
cd backend/src
npm run test
```

## 📦 Scripts Disponibles

### Frontend
| Script | Descripción |
|--------|-------------|
| `npm run dev` | Inicia servidor de desarrollo |
| `npm run build` | Genera build de producción |
| `npm run preview` | Previsualiza build |
| `npm run lint` | Ejecuta linter |

### Backend
| Script | Descripción |
|--------|-------------|
| `npm run dev` | Inicia con nodemon |
| `npm start` | Inicia en producción |
| `npm run test` | Ejecuta tests |

## 🤝 Contribuir

1. Fork el proyecto
2. Crea tu rama (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

## 👤 Autor

**srwangcr**
- GitHub: [@srwangcr](https://github.com/srwangcr)

## 🗄️ Base de Datos

El sistema utiliza **1 base de datos PostgreSQL** con **3 tablas**:

### Diagrama de Tablas
```
┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐
│     users       │       │    suppliers    │       │     orders      │
├─────────────────┤       ├─────────────────┤       ├─────────────────┤
│ id (PK)         │──┐    │ id (PK)         │──┐    │ id (PK)         │
│ name            │  │    │ user_id (FK)    │◄─┼────│ user_id (FK)    │
│ email (UNIQUE)  │  │    │ name            │  │    │ supplier_id(FK) │◄┐
│ password        │  │    │ contact         │  │    │ name            │ │
│ created_at      │  │    │ email           │  │    │ description     │ │
│ updated_at      │  │    │ phone           │  │    │ quantity        │ │
└─────────────────┘  │    │ address         │  │    │ status          │ │
                     │    │ created_at      │  │    │ created_at      │ │
                     │    │ updated_at      │  │    │ updated_at      │ │
                     │    └─────────────────┘  │    └─────────────────┘ │
                     └─────────────────────────┴───────────────────────┘
```

### Estados de Órdenes
- `pendiente` - Orden creada, esperando procesamiento
- `en_proceso` - Orden siendo procesada
- `completada` - Orden finalizada exitosamente
- `cancelada` - Orden cancelada

## 🔒 Seguridad

- **Contraseñas**: Encriptadas con bcrypt (10 salt rounds)
- **Autenticación**: JWT con expiración configurable
- **CORS**: Configurado para orígenes específicos
- **Helmet**: Headers HTTP seguros
- **Validación**: express-validator en todas las rutas

## 🐛 Solución de Problemas

### Error de CORS
Si ves errores de CORS, verifica que `CORS_ORIGIN` en `.env` coincida con la URL del frontend.

### Error de conexión a PostgreSQL
```bash
# Verificar que PostgreSQL esté corriendo
sudo systemctl status postgresql

# Verificar conexión
psql -d orders_db -c "SELECT 1"
```

### Puerto en uso
```bash
# Matar proceso en puerto 3000
lsof -ti:3000 | xargs -r kill -9
```

---

<div align="center">

**Hecho con ❤️ y ☕**

⭐ Si te gustó el proyecto, dale una estrella en GitHub ⭐

</div>