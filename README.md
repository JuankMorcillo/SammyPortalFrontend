# Frontend Sammy Portal

Portal frontend construido con **Next.js 16**, **React 19**, **Material UI**, **Redux Toolkit** y **NextAuth** para autenticación.

El proyecto fue desplegado en vercel y se puede acceder a través de la siguiente URL: [sammy-portal-frontend.vercel.app](sammy-portal-frontend.vercel.app)

---

## Instalación

```bash
# Clonar el repositorio
git clone <url-del-repositorio>
cd frontend_portal

# Instalar dependencias
pnpm install
```

---

## Ejecución local

```bash
# Iniciar el servidor de desarrollo
pnpm dev
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000).

---

## Ejecución de tests

El proyecto utiliza **Vitest** con **Testing Library** y **jsdom** como entorno.

```bash
# Ejecutar tests una sola vez
pnpm test

# Ejecutar tests en modo watch
pnpm test:watch

# Ejecutar tests con interfaz visual
pnpm test:ui
```

---

## Variables de entorno

Crear un archivo `.env.local` en la raíz del proyecto con las siguientes variables:

| Variable | Descripción | Valor por defecto |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | URL base de la API del backend | `http://localhost:4000/api` |
| `NEXT_PUBLIC_REQ_RES_URL` | URL de la API externa ReqRes | `https://reqres.in/api/` |
| `NEXT_PUBLIC_API_REQ_RES_KEY` | API key para el servicio ReqRes | — |
| `NEXTAUTH_SECRET` | Secret para firmar los tokens de NextAuth | — |
| `NEXTAUTH_URL` | URL canónica de la aplicación (requerida por NextAuth) | `http://localhost:3000` |

Ejemplo de `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api
NEXT_PUBLIC_REQ_RES_URL=https://reqres.in/api/
NEXT_PUBLIC_API_REQ_RES_KEY=tu_api_key
NEXTAUTH_SECRET=un_secret_seguro
NEXTAUTH_URL=http://localhost:3000
```

---

## Deploy

El despliegue se realiza en **Vercel** de forma automática:

1. Conectar el repositorio a un proyecto en [Vercel](https://vercel.com/).
2. Configurar las variables de entorno en el dashboard de Vercel (**Settings → Environment Variables**).
3. Cada push a la rama `main` dispara un despliegue automático a producción.

```bash
# Para generar un build de producción localmente
pnpm build

# Para iniciar el servidor de producción localmente
pnpm start
```

> **Nota:** No es necesario ejecutar estos comandos para el deploy; Vercel se encarga del build y despliegue automáticamente al detectar cambios en `main`.
