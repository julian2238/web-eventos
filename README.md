# Web Eventos Yosmar

Aplicación web para la gestión de eventos y usuarios, construida con React, Vite y Tailwind CSS.

## 🚀 Características

### 1. Módulo de Usuarios
- ✅ **Listar usuarios** - Vista completa de todos los usuarios registrados
- ✅ **Editar usuarios** - Modificar información personal de usuarios
- ✅ **Cambiar rol** - Asignar roles (ADMIN, COORDINADOR, USUARIO)
- ✅ **Revocar tokens** - Forzar logout de usuarios desde todos los dispositivos
- ✅ **Gestión completa** - Interfaz intuitiva para administración de usuarios

### 2. Módulo de Eventos
- ✅ **Listar eventos** - Filtros por estado (Activos, Inactivos, Finalizados)
- ✅ **Activar/Inactivar** - Cambiar estado de eventos fácilmente
- ✅ **Generar reportes** - Exportar datos de eventos en formato CSV
- ✅ **Editar eventos** - Modificar información de eventos existentes
- ✅ **Eliminar eventos** - Gestión completa del ciclo de vida

### 3. Dashboard Inicial
- ✅ **Estadísticas generales** - Usuarios registrados, eventos activos
- ✅ **Usuarios por rol** - Distribución visual de roles
- ✅ **Usuarios recientes** - Lista de últimos registros
- ✅ **Eventos populares** - Ranking de eventos más participativos
- ✅ **Métricas en tiempo real** - Datos actualizados automáticamente

### 4. Gestión de Categorías
- ✅ **Listar categorías** - Vista de todas las categorías disponibles
- ✅ **Crear categorías** - Agregar nuevas categorías de eventos
- ✅ **Editar categorías** - Modificar información existente
- ✅ **Interfaz intuitiva** - Gestión visual y fácil de usar

## 🛠️ Tecnologías

- **React 18** - Framework principal
- **Vite** - Build tool y dev server
- **React Router** - Navegación
- **Zustand** - Gestión de estado
- **Axios** - Cliente HTTP
- **React Hook Form** - Manejo de formularios
- **React Icons** - Iconografía
- **Tailwind CSS** - Estilos (implícito en los componentes)

## 📦 Instalación

1. **Clonar el repositorio**
```bash
git clone <repository-url>
cd web-eventos-yosmar
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
```bash
# Crear archivo .env
VITE_API_URL=http://localhost:8000/api/v1
```

4. **Ejecutar en desarrollo**
```bash
npm run dev
```

## 🔧 Scripts Disponibles

- `npm run dev` - Servidor de desarrollo
- `npm run build` - Build para producción
- `npm run preview` - Preview del build
- `npm run lint` - Verificar código con ESLint

## 🏗️ Estructura del Proyecto

```
src/
├── components/           # Componentes reutilizables
├── core/                # Componentes principales
│   ├── Navbar/          # Barra de navegación
│   ├── Sidebar/         # Barra lateral
│   └── PrivateLayout/   # Layout para rutas privadas
├── pages/               # Páginas de la aplicación
│   ├── dashboard/       # Dashboard principal
│   ├── users/           # Gestión de usuarios
│   ├── events/          # Gestión de eventos
│   ├── categories/      # Gestión de categorías
│   └── login/           # Página de login
├── services/            # Servicios de API
│   ├── auth.services.js
│   ├── users.services.js
│   ├── events.services.js
│   ├── categories.services.js
│   └── dashboard.services.js
├── store/               # Estado global (Zustand)
│   └── useAuthStore.js
└── routes/              # Configuración de rutas
    └── PrivateRoutes.jsx
```

## 🔐 Autenticación

La aplicación maneja la autenticación de forma automática:

- **Login automático** - Persistencia de sesión
- **Refresh tokens** - Renovación automática de tokens
- **Logout global** - Cierre de sesión en todos los dispositivos
- **Protección de rutas** - Acceso controlado por roles

## 📊 Funcionalidades del Dashboard

### Estadísticas Principales
- Total de usuarios registrados
- Eventos activos, inactivos y finalizados
- Distribución de usuarios por rol
- Eventos más populares

### Gestión de Usuarios
- Lista completa con información detallada
- Edición inline de datos personales
- Cambio de roles con confirmación
- Revocación de tokens de acceso

### Gestión de Eventos
- Vista por pestañas (Activos/Inactivos/Finalizados)
- Acciones rápidas (Activar/Desactivar/Eliminar)
- Generación de reportes CSV
- Edición completa de eventos

### Gestión de Categorías
- CRUD completo de categorías
- Interfaz visual intuitiva
- Validación de formularios

## 🎨 Diseño

- **Responsive** - Adaptable a todos los dispositivos
- **Moderno** - Interfaz limpia y profesional
- **Intuitivo** - Navegación fácil y clara
- **Consistente** - Diseño uniforme en toda la aplicación

## 🔄 Integración con API

La aplicación se conecta con la API REST que implementa:

- **Clean Architecture** - Separación de responsabilidades
- **Vertical Slicing** - Organización por características
- **JWT Authentication** - Tokens seguros
- **Firebase Integration** - Base de datos en tiempo real

## 🚀 Despliegue

1. **Build de producción**
```bash
npm run build
```

2. **Servir archivos estáticos**
```bash
npm run preview
```

3. **Configurar variables de entorno de producción**
```bash
VITE_API_URL=https://your-api-domain.com/api/v1
```

## 🤝 Contribución

1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia ISC.