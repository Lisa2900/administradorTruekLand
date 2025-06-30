# TruekLand Admin Panel

Sistema de administración de publicaciones para TruekLand construido con Next.js 15, React 19, y Tailwind CSS.

## 🚀 Características

- **Next.js 15** con App Router
- **React 19** con Server Components
- **TypeScript** para type safety
- **Tailwind CSS** para estilos
- **Firebase** para backend
- **Radix UI** para componentes
- **Optimizado para producción**

## 📋 Prerrequisitos

- Node.js 18+ 
- pnpm (recomendado) o npm
- Cuenta de Firebase configurada

## ⚙️ Configuración

### 1. Variables de Entorno

Copia `.env.example` a `.env.local` y configura tus variables:

```bash
cp .env.example .env.local
```

Edita `.env.local` con tus credenciales de Firebase:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=tu_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=tu_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=tu_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=tu_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=tu_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=tu_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=tu_measurement_id
```

### 2. Instalación

```bash
# Instalar dependencias
pnpm install

# O con npm
npm install
```

## 🛠️ Desarrollo

```bash
# Iniciar servidor de desarrollo
pnpm dev

# Verificar tipos
pnpm type-check

# Linting
pnpm lint
pnpm lint:fix
```

## 🏗️ Build y Producción

### Build Local

```bash
# Build para producción
pnpm build

# Iniciar en modo producción
pnpm start

# Preview (build + start)
pnpm preview
```

### Análisis del Bundle

```bash
# Analizar el bundle
pnpm build:analyze
```

### Build Standalone

```bash
# Build independiente
pnpm build:standalone
```

## 🐳 Docker

### Desarrollo con Docker

```bash
# Construir imagen
docker build -t truekland-admin .

# Ejecutar contenedor
docker run -p 3000:3000 truekland-admin
```

### Producción con Docker Compose

```bash
# Configurar variables de entorno
cp .env.example .env

# Ejecutar en producción
docker-compose up -d
```

## 🚀 Despliegue

### Vercel (Recomendado)

1. Conecta tu repositorio a Vercel
2. Configura las variables de entorno en Vercel Dashboard
3. Despliega automáticamente

### Netlify

1. Configura build command: `pnpm build`
2. Configura publish directory: `out`
3. Configura variables de entorno

### Railway/Render

1. Conecta repositorio
2. Configura variables de entorno
3. Despliega con Docker

## 📁 Estructura del Proyecto

```
├── app/                    # App Router (Next.js 13+)
│   ├── globals.css        # Estilos globales
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Página principal
│   └── api/               # API Routes
├── components/            # Componentes React
│   ├── ui/               # Componentes UI base
│   └── ...               # Componentes específicos
├── lib/                  # Utilidades y configuración
├── hooks/                # Custom hooks
├── public/               # Archivos estáticos
└── styles/               # Estilos adicionales
```

## 🔧 Scripts Disponibles

- `pnpm dev` - Servidor de desarrollo
- `pnpm build` - Build para producción
- `pnpm start` - Servidor de producción
- `pnpm lint` - Linting
- `pnpm type-check` - Verificación de tipos
- `pnpm build:analyze` - Análisis del bundle
- `pnpm clean` - Limpiar archivos de build

## 🔒 Seguridad

- Headers de seguridad configurados
- Variables de entorno para datos sensibles
- Configuración de imágenes restrictiva
- CSP headers habilitados

## 🎯 Optimizaciones de Producción

- Minificación con SWC
- Optimización de imágenes
- Bundle splitting automático
- Compresión habilitada
- React Strict Mode
- Tree shaking

## 📈 Monitoreo

- Health check endpoint: `/api/health`
- Bundle analyzer disponible
- Logging estructurado

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es privado y confidencial de TruekLand.

## 🔗 Enlaces

- [Next.js Documentation](https://nextjs.org/docs)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Radix UI](https://www.radix-ui.com/)
