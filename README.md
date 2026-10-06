# Proyecto 2 - Sistema de Pedidos de Comida

## English

### Overview
This project is a food ordering system composed of two applications:
- **Mobile App (Customer)**: Built with React Native and Expo, allowing customers to browse restaurants, customize dishes, place orders (one-time or recurring), and manage their account.
- **Web App (Restaurant)**: Built with React and Vite, enabling restaurants to manage their menu, view and update orders, and receive notifications about reviews.

Both applications use **Supabase** as the backend (database, authentication, real-time subscriptions).

### Features

#### Mobile App (Customer)
- User registration and login
- Browse restaurants and view details
- View restaurant menus
- Customize dishes with extra ingredients and preparation instructions
- Place one-time or recurring orders
- View order summary and confirm
- Manage account information and settings (theme, language, font size)

#### Web App (Restaurant)
- Kitchen registration and login
- Dashboard for active orders (update status: received, preparing, ready, completed)
- Order history with search by ID or client name
- Menu management (add, edit, delete dishes, set availability)
- Notifications for new reviews
- Settings (theme, language, font size)

### Technologies
- **Mobile**: React Native, Expo, React Navigation, Supabase JS, AsyncStorage
- **Web**: React, Vite, React Router, Supabase JS, bcryptjs
- **Backend**: Supabase (PostgreSQL, Auth, Realtime)

### Project Structure
```
proyecto2/
├── mobile/          # React Native app (Expo)
│   ├── Screens/
│   ├── Context/
│   ├── services/
│   ├── App.js
│   └── ...
└── web/             # React web app (Vite)
    ├── src/
    │   ├── pages/
    │   ├── context/
    │   ├── services/
    │   ├── App.jsx
    │   └── ...
    ├── index.html
    └── ...
```

### Setup

#### Prerequisites
- Node.js (v18 or later)
- Expo CLI (for mobile)
- A Supabase account and project

#### Environment Variables
Create a `.env` file in each project root.

For the **web** app (Vite):
```
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

For the **mobile** app (Expo):
```
EXPO_PUBLIC_SUPABASE_URL=your-supabase-url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

#### Mobile App
```bash
cd mobile
npm install
npx expo start
```

#### Web App
```bash
cd web
npm install
npm run dev
```

### Database Schema
The Supabase database includes tables such as:
`usuarios`, `cocinas`, `platosbase`, `pedidos`, `ingredientes`, `ingredientes_pedido`, `provincias`, `cantones`, `distritos`, `idiomas`, `temas`, `textos`, `tiposcocinas`, etc.
Refer to the source code for detailed column definitions and relationships.

### License
This project is for educational purposes (Summer Software Design Project, 2024).

---

## Español

### Descripción General
Este proyecto es un sistema de pedidos de comida compuesto por dos aplicaciones:
- **App Móvil (Cliente)**: Desarrollada con React Native y Expo, permite a los clientes explorar restaurantes, personalizar platos, realizar pedidos (únicos o recurrentes) y gestionar su cuenta.
- **App Web (Restaurante)**: Desarrollada con React y Vite, permite a los restaurantes gestionar su menú, ver y actualizar pedidos, y recibir notificaciones sobre reseñas.

Ambas aplicaciones utilizan **Supabase** como backend (base de datos, autenticación, suscripciones en tiempo real).

### Características

#### App Móvil (Cliente)
- Registro e inicio de sesión de usuarios
- Explorar restaurantes y ver detalles
- Ver menús de restaurantes
- Personalizar platos con ingredientes extra e instrucciones de preparación
- Realizar pedidos únicos o recurrentes
- Ver resumen del pedido y confirmar
- Gestionar información de cuenta y configuración (tema, idioma, tamaño de texto)

#### App Web (Restaurante)
- Registro e inicio de sesión de cocinas
- Panel de pedidos activos (actualizar estado: recibido, en preparación, listo, completado)
- Historial de pedidos con búsqueda por ID o nombre del cliente
- Gestión de menú (agregar, editar, eliminar platos, disponibilidad)
- Notificaciones de nuevas reseñas
- Configuración (tema, idioma, tamaño de texto)

### Tecnologías
- **Móvil**: React Native, Expo, React Navigation, Supabase JS, AsyncStorage
- **Web**: React, Vite, React Router, Supabase JS, bcryptjs
- **Backend**: Supabase (PostgreSQL, Auth, Realtime)

### Estructura del Proyecto
```
proyecto2/
├── mobile/          # App React Native (Expo)
│   ├── Screens/
│   ├── Context/
│   ├── services/
│   ├── App.js
│   └── ...
└── web/             # App web React (Vite)
    ├── src/
    │   ├── pages/
    │   ├── context/
    │   ├── services/
    │   ├── App.jsx
    │   └── ...
    ├── index.html
    └── ...
```

### Configuración

#### Requisitos
- Node.js (v18 o superior)
- Expo CLI (para móvil)
- Una cuenta y proyecto en Supabase

#### Variables de Entorno
Crea un archivo `.env` en la raíz de cada proyecto.

Para la app **web** (Vite):
```
VITE_SUPABASE_URL=tu-url-de-supabase
VITE_SUPABASE_ANON_KEY=tu-anon-key-de-supabase
```

Para la app **móvil** (Expo):
```
EXPO_PUBLIC_SUPABASE_URL=tu-url-de-supabase
EXPO_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key-de-supabase
```

#### App Móvil
```bash
cd mobile
npm install
npx expo start
```

#### App Web
```bash
cd web
npm install
npm run dev
```

### Esquema de Base de Datos
La base de datos en Supabase incluye tablas como:
`usuarios`, `cocinas`, `platosbase`, `pedidos`, `ingredientes`, `ingredientes_pedido`, `provincias`, `cantones`, `distritos`, `idiomas`, `temas`, `textos`, `tiposcocinas`, etc.
Consulta el código fuente para definiciones detalladas de columnas y relaciones.

### Licencia
Este proyecto es con fines educativos (Proyecto de Diseño de Software de Verano, 2024).
