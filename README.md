# 🎨 Frontend - Generador de Ideas Infinitas

[Repositorio del backend](https://github.com/sandovaldavid/ideas-generator-ai-api)

> Interfaz moderna y elegante para generar ideas de negocio usando IA

[![React](https://img.shields.io/badge/React-19.1.1-61dafb?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178c6?logo=typescript)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-7.1.7-646cff?logo=vite)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.14-38bdf8?logo=tailwindcss)](https://tailwindcss.com)

## ✨ Características

-   🎯 **Interfaz Intuitiva**: Diseño limpio y fácil de usar
-   🎨 **Tailwind CSS v4**: Estilos modernos con la última versión
-   ⚡ **Vite**: Build ultra-rápido y HMR instantáneo
-   🔒 **TypeScript**: Type-safety completo
-   📱 **Responsive**: Adaptado a todos los dispositivos
-   🎭 **Animaciones Suaves**: Micro-interacciones
-   🌈 **Estados Claros**: Loading, error y success states
-   🚀 **Production Ready**: Optimizado y listo para deploy

## 🚀 Inicio Rápido

### Prerrequisitos

-   Node.js 18+ o Bun
-   Backend corriendo en `http://localhost:3000`

### Instalación

```bash
# Clonar el repositorio (si no lo has hecho)
git clone https://github.com/dev-sandoval/ideas-generator-ai-web.git

# Ir al directorio frontend
cd ideas-generator-ai-web

# Instalar dependencias
npm install
# o con bun
bun install

# Copiar variables de entorno
cp .env.example .env

# Iniciar servidor de desarrollo
npm run dev
# o con bun
bun dev
```

La aplicación estará disponible en `http://localhost:5173`

## 📁 Estructura del Proyecto

```
generador-ideas-frontend/
├── src/
│   ├── components/          # Componentes React
│   │   ├── Layout.tsx       # Layout principal con header/footer
│   │   ├── GeneratorForm.tsx # Formulario de entrada
│   │   ├── IdeasDisplay.tsx  # Visualización de ideas
│   │   └── Loader.tsx        # Componente loader reutilizable
│   ├── config/              # Configuración
│   │   └── constants.ts     # Constantes de la app
│   ├── types/               # Tipos TypeScript
│   │   ├── index.ts         # Interfaces principales
│   │   └── mocks.ts         # Datos de ejemplo
│   ├── utils/               # Funciones helper
│   │   └── helpers.ts       # Utilidades generales
│   ├── App.tsx              # Componente principal
│   ├── main.tsx             # Entry point
│   └── index.css            # Estilos globales + Tailwind
├── public/                  # Assets estáticos
├── .env.example             # Variables de entorno ejemplo
├── package.json             # Dependencias
├── tsconfig.json            # Configuración TypeScript
├── vite.config.ts           # Configuración Vite
└── README.md                # Este archivo
```

## 🎨 Tecnologías

-   **[React 19](https://react.dev)** - Framework UI moderno
-   **[TypeScript](https://www.typescriptlang.org)** - Tipado estático
-   **[Vite](https://vitejs.dev)** - Build tool ultra-rápido
-   **[Tailwind CSS v4](https://tailwindcss.com)** - CSS utility-first
-   **React Hooks** - useState para manejo de estado

## 📜 Scripts Disponibles

```bash
# Desarrollo - Inicia servidor con HMR
npm run dev

# Build - Construye para producción
npm run build

# Preview - Vista previa del build
npm run preview

# Lint - Revisa el código
npm run lint
```

## 🎯 Uso

1. **Ingresa un tipo de negocio** en el campo de texto

    - Ejemplos: "restaurante", "tecnología", "educación"

2. **Haz clic en "Generar Ideas ✨"**

    - La app mostrará un loader mientras procesa

3. **Revisa las ideas generadas**

    - Aparecen en tarjetas animadas con título y descripción

4. **Genera más ideas**
    - Cambia el tipo de negocio y repite el proceso

### Cambiar API URL

Edita `.env`:

```env
VITE_API_BASE_URL=http://localhost:3000
```

O edita directamente `src/config/constants.ts`

## 🔌 Integración con Backend

La app espera una API REST en:

```
POST http://localhost:3000/api/generate-ideas
```

**Request:**

```json
{
	"businessType": "restaurante"
}
```

**Response:**

```json
{
	"ideas": [
		{
			"id": 1,
			"title": "Título de la idea",
			"description": "Descripción detallada",
			"category": "Categoría"
		}
	]
}
```

## 📱 Responsive Design

La aplicación se adapta automáticamente:

-   **Móvil** (< 768px): Layout de 1 columna
-   **Tablet/Desktop** (≥ 768px): Layout de 2 columnas

## 🚀 Deploy

### Build para Producción

```bash
npm run build
```

Esto genera una carpeta `dist/` lista para deploy.

### Deploy en Vercel

```bash
npm install -g vercel
vercel
```

### Deploy en Netlify

```bash
npm install -g netlify-cli
netlify deploy --prod
```

### Variables de Entorno en Producción

Asegúrate de configurar `VITE_API_BASE_URL` en tu plataforma de hosting:

```
VITE_API_BASE_URL=https://tu-api.com
```

## 🤝 Contribuir

1. Fork el proyecto
2. Crea tu feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push al branch (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto es parte de un ejercicio de desarrollo y está disponible para uso educativo.

## 📧 Contacto | Hablemos

¡Gracias por revisar mi proyecto!

Soy **DevSandoval** (Juan David Sandoval), Ingeniero Informático. Mi filosofía es simple: **la mejor tecnología es la que resuelve un problema real**.

Si buscas un desarrollador que entiende tanto el código como el valor de negocio, me encantaría conectar contigo.

[![Portafolio Web](https://img.shields.io/badge/Portafolio_Web-DevSandoval-8b5cf6?style=for-the-badge&logo=rocket)](https://devsandoval.me)
[![Agenda una reunión](https://img.shields.io/badge/Calendly-Agendar_Reunión-3c82f1?style=for-the-badge&logo=calendly)](https://calendly.com/devsandoval/30min)
[![Mi Perfil de LinkedIn](https://img.shields.io/badge/LinkedIn-DevSandoval-0A66C2?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/devsandoval)
[![Ver mi Código (GitHub)](https://img.shields.io/badge/GitHub-sandovaldavid-181717?style=for-the-badge&logo=github)](https://github.com/sandovaldavid)

---

**Desarrollado usando React + Tailwind CSS v4 + TypeScript**

🌟 ¡Si te gusta este proyecto, dale una estrella!
