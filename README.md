# NovaFlow

## Descripción del problema
NovaFlow es una plataforma digital diseñada para apoyar a empresas y equipos que necesitan coordinar procesos, tomas de decisión y seguimiento de KPI en un solo lugar. La solución ayuda a reducir la fragmentación de información, automatizar tareas repetitivas y mejorar la visibilidad operativa para optimizar la productividad y la respuesta ante cambios del mercado.

## Tecnologías utilizadas
- React, Vite y React Router
- Axios
- Express, MongoDB y Mongoose
- Vitest y Testing Library

## Requisitos del proyecto
La aplicación fue desarrollada con Vite como base, siguiendo una arquitectura modular con carpetas para assets, componentes y páginas. La interfaz principal incluye componentes reutilizables, variables dinámicas con JSX, estilos con CSS y una imagen local importada desde la carpeta assets.

La SPA incluye dashboard, catálogo, favoritos, autenticación y rutas protegidas. El catálogo consulta y modifica registros persistidos en MongoDB.

## Cómo ejecutar
1. Instala dependencias con `npm install`.
2. Copia `.env.example` a `.env`.
3. Configura `MONGODB_URI` con la URI real de MongoDB y cambia `JWT_SECRET` por una cadena aleatoria de al menos 32 caracteres. No compartas ni subas `.env`.
4. Inicia el backend en una terminal: `npm run server`.
5. Inicia el frontend en otra terminal: `npm run dev`.
6. Abre la URL local de Vite y crea una cuenta. La API agrega cuatro soluciones iniciales cuando la colección está vacía.

`CLIENT_ORIGIN` permite indicar los orígenes permitidos, separados por comas. `VITE_API_URL` configura la URL base de la API.

## Funcionalidades
- Registro e inicio de sesión con contraseñas cifradas y sesión JWT.
- `RutaProtegida` bloquea el dashboard, catálogo y favoritos para usuarios desconectados.
- El catálogo consulta MongoDB con Axios (`GET`) y permite crear (`POST`) y eliminar (`DELETE`) soluciones.
- Favoritos se gestionan con Context; el menú permite cerrar sesión.

## Verificación
- `npm test`: ejecuta las pruebas de interfaz.
- `npm run lint`: analiza el proyecto.
- `npm run build`: genera la versión de producción.
