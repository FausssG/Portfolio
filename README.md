# 🎮 Portfolio Interactivo - Faustino Gnavi

Portfolio profesional con **sistema de nodos gamificado**, diseño futurista y animaciones avanzadas. Navegación tipo juego con desbloqueo progresivo, sistema de XP y Easter Egg secreto.

## ✨ Características Gamificadas

- **🎯 Sistema de Nodos**: 7 nodos conectados + 1 nodo secreto
- **⭐ Sistema de XP**: Gana experiencia al explorar cada sección
- **🔓 Desbloqueo Progresivo**: Los nodos se desbloquean al completar requisitos
- **🎮 Easter Egg**: Nodo secreto oculto (7 clicks en el código binario del HUD)
- **🖐️ Pan/Drag**: Arrastra la pantalla para explorar (mobile y desktop)
- **🌐 Multi-idioma**: Español, English, Deutsch
- **📱 100% Responsive**: Optimizado para todos los dispositivos

## 🚀 Tecnologías

- **React 18** - Framework principal
- **TypeScript** - Tipado estático
- **Tailwind CSS v4** - Estilos
- **Motion (Framer Motion)** - Animaciones
- **Vite** - Build tool
- **Lucide React** - Iconos

## 📦 Instalación Local

```bash
# Clonar el repositorio
git clone <tu-repositorio>
cd code

# Instalar dependencias
pnpm install

# Ejecutar en desarrollo
pnpm run dev
```

## 🖼️ Agregar Imágenes de Proyectos

1. Coloca tus imágenes en `src/assets/projects/`
2. Nombra los archivos según `src/assets/projects/README.md`
3. Actualiza las rutas en `src/app/utils/translations.ts`

Ejemplo:
```typescript
{
  name: "Proyecto Final",
  image: "/src/assets/projects/proyecto-final.png",
  // ... resto de propiedades
}
```

## 🌐 Exportar y Desplegar

### Opción 1: Vercel (Recomendado - Gratis)

**Deployment automático desde GitHub:**

1. Sube tu código a GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <tu-repo-github>
git push -u origin main
```

2. Ve a [vercel.com](https://vercel.com)
3. Conecta tu cuenta de GitHub
4. Importa tu repositorio
5. Vercel detectará automáticamente Vite
6. Click en "Deploy"
7. ¡Listo! Tu portfolio estará en `https://tu-proyecto.vercel.app`

**Deployment manual:**
```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Opción 2: Netlify (Gratis)

**Desde GitHub:**
1. Sube a GitHub
2. Ve a [netlify.com](https://netlify.com)
3. "Add new site" → "Import from Git"
4. Selecciona tu repositorio
5. Build command: `pnpm run build`
6. Publish directory: `dist`
7. Deploy

**Drag & Drop:**
```bash
# Construir el proyecto
pnpm run build

# El folder 'dist' se puede arrastrar a netlify.com/drop
```

### Opción 3: GitHub Pages (Gratis)

1. Actualiza `vite.config.ts`:
```typescript
export default defineConfig({
  base: '/nombre-repositorio/',
  // ... resto de config
})
```

2. Agrega script en `package.json`:
```json
{
  "scripts": {
    "deploy": "pnpm run build && gh-pages -d dist"
  }
}
```

3. Instala gh-pages:
```bash
pnpm add -D gh-pages
```

4. Deploy:
```bash
pnpm run deploy
```

5. Activa GitHub Pages en Settings → Pages → Source: gh-pages branch

### Opción 4: Hostinger / cPanel (Hosting tradicional)

1. Construir el proyecto:
```bash
pnpm run build
```

2. Contenido de la carpeta `dist/` es tu sitio web estático

3. Subir vía FTP o File Manager:
   - Conecta por FTP a tu hosting
   - Sube todo el contenido de `dist/` a `public_html/`
   - O usa el File Manager del cPanel

4. Configurar dominio:
   - Apunta tu dominio a la carpeta donde subiste los archivos
   - Asegúrate que el archivo `index.html` esté en la raíz

### Opción 5: Firebase Hosting (Gratis)

```bash
# Instalar Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Inicializar
firebase init hosting

# Configurar:
# - Public directory: dist
# - Single-page app: Yes
# - GitHub auto-deploy: Optional

# Build
pnpm run build

# Deploy
firebase deploy
```

## 🔧 Configuración Adicional

### Variables de Entorno

Si necesitas agregar variables de entorno (APIs, etc.):

1. Crea `.env.local`:
```env
VITE_API_URL=https://tu-api.com
VITE_EMAIL_SERVICE=tu-servicio
```

2. Usa en el código:
```typescript
const apiUrl = import.meta.env.VITE_API_URL;
```

3. En producción (Vercel/Netlify):
   - Agrega las variables en el dashboard
   - Settings → Environment Variables

### Dominio Personalizado

**Vercel:**
1. Settings → Domains
2. Agrega tu dominio
3. Configura DNS según instrucciones

**Netlify:**
1. Domain settings → Add custom domain
2. Actualiza DNS records

**GitHub Pages:**
1. Agrega archivo `CNAME` en carpeta `public/`:
```
tudominio.com
```
2. Configura DNS:
   - Tipo A → 185.199.108.153
   - Tipo A → 185.199.109.153
   - Tipo A → 185.199.110.153
   - Tipo A → 185.199.111.153

## 📱 Optimizaciones Pre-Deploy

### 1. Optimizar Imágenes
```bash
# Comprimir imágenes antes de subirlas
# Usa TinyPNG.com o similares
# Objetivo: < 200KB por imagen
```

### 2. Performance
```bash
# El build de Vite ya optimiza automáticamente:
# - Minificación de JS/CSS
# - Tree-shaking
# - Code splitting
# - Asset optimization
```

### 3. SEO (Opcional)

Agrega en `index.html`:
```html
<head>
  <title>Faustino Gnavi - Portfolio Interactivo</title>
  <meta name="description" content="Portfolio profesional de Faustino Gnavi - Ingeniero en Sistemas">
  <meta property="og:title" content="Faustino Gnavi - Portfolio">
  <meta property="og:description" content="Desarrollador Full Stack con experiencia en React, Python, C#">
  <meta property="og:image" content="/og-image.png">
</head>
```

## 🐛 Troubleshooting

### Error: "Cannot find module"
```bash
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### Error al hacer build
```bash
# Verifica que todas las importaciones sean correctas
# Revisa la consola para ver qué archivo falta
```

### Imágenes no cargan en producción
- Usa rutas relativas: `/src/assets/...`
- O importa las imágenes directamente en el código:
```typescript
import proyectoImg from '../assets/projects/proyecto.png';
```

### 404 en rutas (si usas React Router en futuro)
Agrega `_redirects` en carpeta `public/`:
```
/*    /index.html   200
```

## 📄 Estructura del Proyecto

```
code/
├── src/
│   ├── app/
│   │   ├── components/     # Componentes React
│   │   └── utils/          # Utilidades y traducciones
│   ├── assets/
│   │   └── projects/       # IMÁGENES DE PROYECTOS AQUÍ
│   ├── imports/            # CVs y archivos
│   └── styles/             # Estilos globales
├── public/                 # Archivos estáticos
├── dist/                   # Build (generado)
└── package.json
```

## 🔗 Links Útiles

- [Vite Docs](https://vitejs.dev/)
- [Vercel Docs](https://vercel.com/docs)
- [Netlify Docs](https://docs.netlify.com/)
- [GitHub Pages](https://pages.github.com/)

## 📝 Personalización

### Cambiar colores
Edita `src/styles/theme.css`

### Agregar/quitar nodos
Edita `src/app/components/NodeSystem.tsx`

### Modificar traducciones
Edita `src/app/utils/translations.ts`

### Actualizar proyectos
Edita `src/app/utils/translations.ts` → `projectsList`

## ✅ Checklist Pre-Deploy

- [ ] Agregar todas las imágenes de proyectos
- [ ] Actualizar información personal
- [ ] Verificar que los CVs estén en `/src/imports/`
- [ ] Probar en local: `pnpm run dev`
- [ ] Construir: `pnpm run build`
- [ ] Probar build: `pnpm preview`
- [ ] Revisar en mobile (responsive)
- [ ] Deploy a plataforma elegida
- [ ] Verificar en producción
- [ ] Configurar dominio personalizado (opcional)

## 🎉 ¡Listo!

Tu portfolio está listo para impresionar a reclutadores y empresas. 

**Recomendación final:** Usa Vercel para deployment automático - es gratis, rápido y se actualiza automáticamente con cada push a GitHub.

---

Desarrollado con ❤️ por Faustino Gnavi
