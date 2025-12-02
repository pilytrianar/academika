# 📘 Academika

Academika es una plataforma flexible para la **gestión de estudiantes y docentes**, creada para facilitar el control académico, la administración de materias, el seguimiento de usuarios y la interacción entre diferentes roles dentro de una institución educativa.

Su objetivo es ofrecer una solución moderna, escalable y fácil de usar, basada en **Next.js**, **TypeScript** y un diseño modular que permite crecer sin complicaciones.

---

# 🚀 Cómo clonar el proyecto

```bash
git clone https://github.com/pilytrianar/academika.git
```

Luego entra al proyecto:

```bash
cd academika
```

---

# 🌿 Ramas

Cada miembro del equipo debe trabajar en **su propia rama**.

Crea una rama nueva así:

```bash
git checkout -b nombre-apellido
```

---

# ▶️ Cómo correr el proyecto

Primero instala dependencias:

```bash
pnpm install
```

Luego inicia el servidor:

```bash
pnpm dev
```

La aplicación estará disponible en:

```
http://localhost:3000
```

---

# 📚 Storybook

Para iniciar Storybook:

```bash
pnpm storybook
```

La aplicación estará disponible en:

```
http://localhost:6006
```

---

# 🧹 Antes de enviar cambios (OBLIGATORIO)

Siempre ejecuta:

```bash
pnpm lint && pnpm format
```

Esto asegura que el código quede limpio y consistente antes de subirlo.

---

# 🗄️ Configuración de la Base de Datos

### 1. Configurar variables de entorno

Copia el archivo `.env.example` a `.env` y agrega la cadena de conexión de MySQL:

```bash
DATABASE_URL="mysql://usuario:contraseña@localhost:3306/academika"
```

Reemplaza:

- `usuario`: Tu usuario de MySQL
- `contraseña`: Tu contraseña de MySQL
- `localhost`: Host del servidor (si está local)
- `3306`: Puerto de MySQL (por defecto 3306)
- `academika`: Nombre de la base de datos

### 2. Ejecutar migraciones de Prisma

Para crear las tablas en la base de datos:

```bash
pnpm db:migrate
```

### 3. Insertar datos de prueba (Login)

Debes insertar al menos un usuario con contraseña hasheada (bcrypt con 10 rounds) para probar la funcionalidad de login. Inserta manualmente en la tabla `users` con contraseña hasheada usando bcrypt mientras el modulo Registro está disponible.

---

# 🗂️ Estructura del proyecto

```txt
└── 📁src
    └── 📁app
        └── 📁api
            └── 📁auth
                ├── route.ts
        └── 📁dashboard
            ├── DashboardWrapper.tsx
        └── 📁login
            ├── LoginWrapper.tsx
            ├── page.tsx
        └── 📁students
        └── 📁subjects
        ├── globals.css
        ├── icon.svg
        ├── layout.tsx
        ├── manifest.ts
        ├── page.tsx
    └── 📁components
    └── 📁lib
        └── 📁fonts
            ├── fonts.ts
        └── 📁theme
            ├── theme.ts
            ├── ThemeProviderUI.tsx
    └── 📁server
        └── 📁auth
            └── 📁login
                ├── login.service.ts
            └── 📁signup
    └── 📁types
    └── global.d.ts
```

---

# 🧩 Explicación de la estructura

### 📁 /app

Contiene las páginas del proyecto (Next.js App Router).  
Cada sección debe tener:

- Un `page.tsx` para la vista principal.
- Un wrapper o componente extra si lo necesita.

### 📁 /app/api

Rutas tipo API (Route Handlers).  
Aquí van endpoints como autenticación y CRUDs.

### 📁 /server

Aquí deben vivir todos los **servicios del backend**:

- Lógica de negocio
- Llamadas a base de datos
- Validaciones
- Servicios como login/signup

Las rutas de API deben importar estos servicios, **no tener lógica dentro del `route.ts`**.

### 📁 /components

Componentes compartidos entre páginas.

### 📁 /lib

Funciones auxiliares, temas, fuentes, etc.

### 📁 /types

Interfaces y tipos TypeScript.
