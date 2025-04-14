# VMS Backend API

## Descripción
API RESTful para gestión de máquinas virtuales con autenticación JWT y sincronización en tiempo real.

## Características Principales
- Autenticación con JWT
- CRUD de Máquinas Virtuales
- Control de acceso por roles (Administrador/Cliente)
- WebSocket para actualizaciones en tiempo real

## Documentación de API
Swagger API Docs: [https://vms-api-xcpq.onrender.com/api/docs](https://vms-api-xcpq.onrender.com/api/docs)

## Tecnologías
- NestJS
- Prisma ORM
- WebSocket
- JWT Authentication

## Requisitos
- Node.js 18+
- Docker (opcional)

## Instalación Local

1. Clonar el repositorio
```bash
git https://github.com/kamirodev/vms-api.git
cd vms-api
```

2. Instalar dependencias
```bash
yarn install
```

3. Configurar variables de entorno
- Crear archivo `.env`
- Copiar contenido de `.env.example`
- Configurar credenciales

4. Iniciar base de datos
```bash
yarn prisma:migrate:dev
yarn prisma:generate
```

5. Iniciar servidor
```bash
yarn start:dev
```

## Construcción Docker
```bash
docker build -t vms-backend .
docker run -p 3000:3000 vms-backend
```

## WebSocket
Implementación de tiempo real mediante WebSocket utilizando Socket.IO. Permite:
- Notificaciones instantáneas de cambios en VMs
- Sincronización en tiempo real entre clientes
- Eventos para creación, actualización y eliminación de máquinas virtuales

## Despliegue
Alojado en [Render.com](https://render.com)
