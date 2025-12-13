# 📚 Academika API Documentation

Documentación completa de las rutas API disponibles en el proyecto.

---

## 📋 Índice

- [Autenticación](#-autenticación)
- [Estudiantes](#-estudiantes)
- [Cursos](#-cursos)
- [Asignaturas](#-asignaturas)
- [Calificaciones](#-calificaciones)
- [Notificaciones](#-notificaciones)
- [Usuarios](#-usuarios)
- [Ejemplos de uso en React](#-ejemplos-de-uso-en-react)

---

## 🔐 Autenticación

### POST `/api/auth/login`

Autentica un usuario y devuelve un token JWT.

**Request Body:**

```json
{
  "email": "admin@academika.com",
  "password": "admin123"
}
```

**Response (200):**

```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "admin@academika.com",
    "role": "admin"
  }
}
```

**Errores:**

- `401` - Credenciales inválidas
- `500` - Error del servidor

---

### POST `/api/auth/verify`

Verifica si un token JWT es válido.

**Request Body:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response (200):**

```json
{
  "success": true,
  "user": {
    "id": 1,
    "email": "admin@academika.com"
  }
}
```

**Errores:**

- `401` - Token no proporcionado o inválido

---

## 👨‍🎓 Estudiantes

### GET `/api/students`

Obtiene la lista de estudiantes con paginación y filtros.

**Query Parameters:**

| Parámetro  | Tipo   | Default | Descripción                                           |
| ---------- | ------ | ------- | ----------------------------------------------------- |
| `page`     | number | 1       | Número de página                                      |
| `limit`    | number | 10      | Resultados por página                                 |
| `status`   | string | -       | Filtrar por estado: `ACTIVE`, `INACTIVE`, `SUSPENDED` |
| `courseId` | number | -       | Filtrar por ID del curso                              |
| `search`   | string | -       | Buscar por nombre, apellido, email o studentId        |

**Ejemplos de URL:**

```
GET /api/students
GET /api/students?page=2&limit=5
GET /api/students?status=ACTIVE
GET /api/students?courseId=1&status=ACTIVE
GET /api/students?search=Joan
```

**Response (200):**

```json
{
  "students": [
    {
      "id": 1,
      "email": "joan.romero@academika.com",
      "status": "ACTIVE",
      "profile": {
        "id": 1,
        "firstName": "Joan",
        "lastName": "Romero",
        "studentId": "09876",
        "phone": "3122334455",
        "avatarUrl": null,
        "course": {
          "id": 1,
          "name": "Séptimo",
          "section": "D"
        }
      }
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 5,
    "totalPages": 1
  }
}
```

---

### GET `/api/students/[id]`

Obtiene el detalle completo de un estudiante, incluyendo calificaciones, notas disciplinarias y promedio.

**Response (200):**

```json
{
  "id": 1,
  "email": "joan.romero@academika.com",
  "status": "INACTIVE",
  "createdAt": "2025-01-01T00:00:00.000Z",
  "profile": {
    "id": 1,
    "firstName": "Joan",
    "lastName": "Romero",
    "studentId": "09876",
    "birthDate": "2008-05-15T00:00:00.000Z",
    "phone": "3122334455",
    "address": "Av. Calle 127 # 12 - 19, Bogotá",
    "course": {
      "id": 1,
      "name": "Séptimo",
      "section": "D",
      "year": 2025
    },
    "guardian": {
      "id": 1,
      "fullName": "Elon Musk",
      "phone": "3145677680",
      "email": "elon.musk@academika.com",
      "relationship": "Tutor"
    },
    "grades": [
      {
        "id": 1,
        "value": "9.00",
        "period": 1,
        "description": "Examen parcial 1",
        "subjectCourse": {
          "subject": {
            "id": 1,
            "name": "Matemáticas"
          }
        }
      }
    ],
    "disciplinaryNotes": []
  },
  "average": "8.88"
}
```

**Errores:**

- `400` - ID inválido
- `404` - Estudiante no encontrado

---

### POST `/api/students`

Crea un nuevo estudiante.

**Request Body:**

```json
{
  "email": "nuevo.estudiante@academika.com",
  "password": "password123",
  "firstName": "Nuevo",
  "lastName": "Estudiante",
  "studentId": "99999",
  "courseId": 1,
  "birthDate": "2010-05-15",
  "phone": "3001234567",
  "address": "Calle 123 # 45-67",
  "guardian": {
    "fullName": "Padre del Estudiante",
    "phone": "3109876543",
    "email": "padre@email.com",
    "relationship": "Padre"
  }
}
```

| Campo       | Requerido | Descripción                             |
| ----------- | --------- | --------------------------------------- |
| `email`     | ✅        | Email único del estudiante              |
| `password`  | ✅        | Contraseña (se hashea automáticamente)  |
| `firstName` | ✅        | Nombre                                  |
| `lastName`  | ✅        | Apellido                                |
| `studentId` | ✅        | ID visible del estudiante (ej: "12345") |
| `courseId`  | ✅        | ID del curso al que pertenece           |
| `birthDate` | ❌        | Fecha de nacimiento                     |
| `phone`     | ❌        | Teléfono                                |
| `address`   | ❌        | Dirección                               |
| `guardian`  | ❌        | Datos del acudiente                     |

**Response (201):**

```json
{
  "id": 10,
  "email": "nuevo.estudiante@academika.com",
  "status": "ACTIVE",
  "profile": {
    "firstName": "Nuevo",
    "lastName": "Estudiante",
    "studentId": "99999",
    "course": { "id": 1, "name": "Séptimo", "section": "D" },
    "guardian": { "fullName": "Padre del Estudiante", "phone": "3109876543" }
  }
}
```

**Errores:**

- `400` - Faltan campos requeridos
- `409` - Email o studentId ya existe

---

### PATCH `/api/students/[id]`

Actualiza un estudiante existente.

**Request Body (todos los campos son opcionales):**

```json
{
  "firstName": "Joan Actualizado",
  "lastName": "Romero",
  "phone": "3001112233",
  "address": "Nueva dirección",
  "birthDate": "2008-05-15",
  "courseId": 2,
  "status": "ACTIVE"
}
```

**Response (200):** Estudiante actualizado

---

### DELETE `/api/students/[id]`

Elimina un estudiante.

**Response (200):**

```json
{
  "success": true
}
```

---

## 🏫 Cursos

### GET `/api/courses`

Obtiene la lista de cursos.

**Query Parameters:**

| Parámetro   | Tipo    | Descripción                                                |
| ----------- | ------- | ---------------------------------------------------------- |
| `year`      | number  | Filtrar por año académico                                  |
| `forSelect` | boolean | Si es `true`, devuelve formato simplificado para dropdowns |

**Ejemplos:**

```
GET /api/courses
GET /api/courses?year=2025
GET /api/courses?forSelect=true
```

**Response normal (200):**

```json
{
  "courses": [
    {
      "id": 1,
      "name": "Séptimo",
      "section": "D",
      "year": 2025,
      "_count": {
        "students": 3
      }
    }
  ]
}
```

**Response con `forSelect=true`:**

```json
{
  "courses": [
    { "id": 1, "label": "Séptimo D", "year": 2025 },
    { "id": 2, "label": "Séptimo C", "year": 2025 },
    { "id": 3, "label": "Noveno A", "year": 2025 }
  ]
}
```

---

### POST `/api/courses`

Crea un nuevo curso.

**Request Body:**

```json
{
  "name": "Octavo",
  "section": "A",
  "year": 2025
}
```

**Errores:**

- `409` - Ya existe un curso con ese nombre, sección y año

---

## 📚 Asignaturas

### GET `/api/subjects`

Obtiene las asignaturas.

**Query Parameters:**

| Parámetro | Tipo    | Descripción                                                           |
| --------- | ------- | --------------------------------------------------------------------- |
| `grouped` | boolean | Si es `true`, devuelve asignaturas agrupadas por curso con profesores |

**Ejemplos:**

```
GET /api/subjects
GET /api/subjects?grouped=true
```

**Response normal (200):**

```json
{
  "subjects": [
    { "id": 1, "name": "Matemáticas", "description": "Álgebra, geometría y cálculo" },
    { "id": 2, "name": "Historia", "description": "Historia universal y de Colombia" }
  ]
}
```

**Response con `grouped=true` (ideal para la vista de Asignaturas):**

```json
{
  "courses": [
    {
      "id": 1,
      "name": "Séptimo",
      "section": "D",
      "year": 2025,
      "subjects": [
        {
          "id": 1,
          "subject": {
            "id": 1,
            "name": "Matemáticas"
          },
          "teachers": [
            {
              "teacher": {
                "firstName": "Ana",
                "lastName": "Torres"
              }
            }
          ]
        }
      ]
    }
  ]
}
```

---

### POST `/api/subjects`

Crea una nueva asignatura.

**Request Body:**

```json
{
  "name": "Biología",
  "description": "Ciencias biológicas y naturales"
}
```

---

## 📊 Calificaciones

### GET `/api/grades`

Obtiene calificaciones con filtros.

**Query Parameters:**

| Parámetro         | Tipo   | Descripción                              |
| ----------------- | ------ | ---------------------------------------- |
| `studentId`       | number | Filtrar por ID del perfil del estudiante |
| `subjectCourseId` | number | Filtrar por asignatura-curso             |
| `period`          | number | Filtrar por período (1, 2, 3, 4)         |

**Ejemplos:**

```
GET /api/grades?studentId=1
GET /api/grades?studentId=1&period=1
GET /api/grades?subjectCourseId=1
```

**Response (200):**

```json
{
  "grades": [
    {
      "id": 1,
      "value": "9.00",
      "period": 1,
      "description": "Examen parcial 1",
      "student": {
        "id": 1,
        "firstName": "Joan",
        "lastName": "Romero",
        "studentId": "09876"
      },
      "subjectCourse": {
        "subject": { "id": 1, "name": "Matemáticas" },
        "course": { "id": 1, "name": "Séptimo", "section": "D" }
      }
    }
  ]
}
```

---

### POST `/api/grades`

Crea una o múltiples calificaciones.

**Request Body (una calificación):**

```json
{
  "studentId": 1,
  "subjectCourseId": 1,
  "value": 8.5,
  "period": 2,
  "description": "Quiz de repaso"
}
```

**Request Body (múltiples calificaciones):**

```json
[
  { "studentId": 1, "subjectCourseId": 1, "value": 8.5, "period": 2 },
  { "studentId": 2, "subjectCourseId": 1, "value": 9.0, "period": 2 },
  { "studentId": 3, "subjectCourseId": 1, "value": 7.5, "period": 2 }
]
```

| Campo             | Requerido | Descripción                        |
| ----------------- | --------- | ---------------------------------- |
| `studentId`       | ✅        | ID del perfil del estudiante       |
| `subjectCourseId` | ✅        | ID de la relación asignatura-curso |
| `value`           | ✅        | Calificación (0.00 - 10.00)        |
| `period`          | ✅        | Período académico (1-4)            |
| `description`     | ❌        | Descripción (ej: "Examen parcial") |

**Errores:**

- `400` - Calificación fuera de rango (0-10)

---

## 🔔 Notificaciones

### GET `/api/notifications`

Obtiene notificaciones.

**Query Parameters:**

| Parámetro   | Tipo    | Descripción                                        |
| ----------- | ------- | -------------------------------------------------- |
| `userId`    | number  | ID del usuario (incluye globales + personales)     |
| `limit`     | number  | Cantidad máxima (default: 10)                      |
| `countOnly` | boolean | Si es `true`, solo devuelve el conteo de no leídas |

**Ejemplos:**

```
GET /api/notifications
GET /api/notifications?userId=1&limit=5
GET /api/notifications?countOnly=true&userId=1
```

**Response normal (200):**

```json
{
  "notifications": [
    {
      "id": 1,
      "title": "Nuevo estudiante agregado en \"Estadística\".",
      "description": "Se ha agregado un nuevo estudiante al curso.",
      "type": "NEW_STUDENT",
      "isRead": false,
      "userId": null,
      "createdAt": "2025-01-01T10:00:00.000Z"
    }
  ]
}
```

**Response con `countOnly=true`:**

```json
{
  "count": 3
}
```

---

### POST `/api/notifications`

Crea una notificación.

**Request Body:**

```json
{
  "title": "Recordatorio: Entrega de proyecto",
  "description": "El proyecto final debe entregarse antes del viernes.",
  "type": "REMINDER",
  "userId": null
}
```

| Tipo           | Descripción               |
| -------------- | ------------------------- |
| `NEW_STUDENT`  | Nuevo estudiante agregado |
| `REMINDER`     | Recordatorio              |
| `GRADE`        | Nueva calificación        |
| `DISCIPLINARY` | Nota disciplinaria        |
| `ANNOUNCEMENT` | Anuncio general           |

> **Nota:** Si `userId` es `null`, la notificación es global (visible para todos).

---

### PATCH `/api/notifications`

Marca notificaciones como leídas.

**Marcar una notificación:**

```json
{
  "id": 1
}
```

**Marcar todas como leídas:**

```json
{
  "markAllRead": true,
  "userId": 1
}
```

---

## 👥 Usuarios

### GET `/api/users`

Obtiene todos los usuarios (básico).

**Response (200):**

```json
{
  "users": [
    { "id": 1, "email": "admin@academika.com" },
    { "id": 2, "email": "ana.torres@academika.com" }
  ]
}
```

---

## ⚛️ Ejemplos de uso en React

### Lista de estudiantes con filtros

```tsx
'use client';

import { useState, useEffect } from 'react';

interface Student {
  id: number;
  email: string;
  status: string;
  profile: {
    firstName: string;
    lastName: string;
    studentId: string;
    course: {
      name: string;
      section: string;
    };
  };
}

interface StudentsResponse {
  students: Student[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export default function StudentsList() {
  const [students, setStudents] = useState<Student[]>([]);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    courseId: '',
  });

  const fetchStudents = async (page = 1) => {
    setLoading(true);

    const params = new URLSearchParams({
      page: page.toString(),
      limit: '10',
    });

    if (filters.search) params.append('search', filters.search);
    if (filters.status) params.append('status', filters.status);
    if (filters.courseId) params.append('courseId', filters.courseId);

    try {
      const res = await fetch(`/api/students?${params}`);
      const data: StudentsResponse = await res.json();

      setStudents(data.students);
      setPagination({
        page: data.pagination.page,
        totalPages: data.pagination.totalPages,
      });
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [filters]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({ ...prev, search: e.target.value }));
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters(prev => ({ ...prev, status: e.target.value }));
  };

  if (loading) return <div>Cargando...</div>;

  return (
    <div>
      {/* Filtros */}
      <div className='flex gap-4 mb-4'>
        <input
          type='text'
          placeholder='Buscar por nombre...'
          value={filters.search}
          onChange={handleSearch}
          className='border p-2 rounded'
        />

        <select value={filters.status} onChange={handleStatusChange} className='border p-2 rounded'>
          <option value=''>Todos los estados</option>
          <option value='ACTIVE'>Activo</option>
          <option value='INACTIVE'>Inactivo</option>
          <option value='SUSPENDED'>Suspendido</option>
        </select>
      </div>

      {/* Lista */}
      <table className='w-full'>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>ID Estudiante</th>
            <th>Curso</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.id}>
              <td>
                {student.profile.firstName} {student.profile.lastName}
              </td>
              <td>{student.profile.studentId}</td>
              <td>
                {student.profile.course.name} {student.profile.course.section}
              </td>
              <td>{student.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Paginación */}
      <div className='flex gap-2 mt-4'>
        <button disabled={pagination.page === 1} onClick={() => fetchStudents(pagination.page - 1)}>
          Anterior
        </button>
        <span>
          Página {pagination.page} de {pagination.totalPages}
        </span>
        <button
          disabled={pagination.page === pagination.totalPages}
          onClick={() => fetchStudents(pagination.page + 1)}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
```

---

### Detalle de estudiante

```tsx
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

interface StudentDetail {
  id: number;
  email: string;
  status: string;
  profile: {
    firstName: string;
    lastName: string;
    birthDate: string;
    phone: string;
    address: string;
    course: { name: string; section: string };
    guardian: {
      fullName: string;
      phone: string;
      email: string;
      relationship: string;
    };
  };
  average: string;
}

export default function StudentProfile() {
  const { id } = useParams();
  const [student, setStudent] = useState<StudentDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await fetch(`/api/students/${id}`);

        if (!res.ok) throw new Error('Estudiante no encontrado');

        const data = await res.json();
        setStudent(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchStudent();
  }, [id]);

  if (loading) return <div>Cargando...</div>;
  if (!student) return <div>Estudiante no encontrado</div>;

  return (
    <div>
      <h1>
        {student.profile.firstName} {student.profile.lastName}
      </h1>
      <p>
        Curso: {student.profile.course.name} {student.profile.course.section}
      </p>
      <p>Email: {student.email}</p>
      <p>Teléfono: {student.profile.phone}</p>
      <p>Dirección: {student.profile.address}</p>

      <h2>Promedio General</h2>
      <p className='text-2xl font-bold'>{student.average}/10</p>

      <h2>Datos del Acudiente</h2>
      <p>Nombre: {student.profile.guardian.fullName}</p>
      <p>Teléfono: {student.profile.guardian.phone}</p>
      <p>Email: {student.profile.guardian.email}</p>
    </div>
  );
}
```

---

### Dropdown de cursos

```tsx
'use client';

import { useState, useEffect } from 'react';

interface CourseOption {
  id: number;
  label: string;
  year: number;
}

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function CourseSelect({ value, onChange }: Props) {
  const [courses, setCourses] = useState<CourseOption[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const res = await fetch('/api/courses?forSelect=true');
      const data = await res.json();
      setCourses(data.courses);
    };

    fetchCourses();
  }, []);

  return (
    <select value={value} onChange={e => onChange(e.target.value)}>
      <option value=''>Seleccionar curso</option>
      {courses.map(course => (
        <option key={course.id} value={course.id}>
          {course.label} ({course.year})
        </option>
      ))}
    </select>
  );
}
```

---

### Contador de notificaciones

```tsx
'use client';

import { useState, useEffect } from 'react';

interface Props {
  userId?: number;
}

export default function NotificationBadge({ userId }: Props) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchCount = async () => {
      const params = new URLSearchParams({ countOnly: 'true' });
      if (userId) params.append('userId', userId.toString());

      const res = await fetch(`/api/notifications?${params}`);
      const data = await res.json();
      setCount(data.count);
    };

    fetchCount();

    // Refrescar cada 30 segundos
    const interval = setInterval(fetchCount, 30000);
    return () => clearInterval(interval);
  }, [userId]);

  if (count === 0) return null;

  return <span className='bg-red-500 text-white text-xs rounded-full px-2 py-1'>{count}</span>;
}
```

---

### Crear estudiante

```tsx
'use client';

import { useState } from 'react';

export default function CreateStudentForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);

    const studentData = {
      email: formData.get('email'),
      password: formData.get('password'),
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      studentId: formData.get('studentId'),
      courseId: parseInt(formData.get('courseId') as string),
      phone: formData.get('phone') || undefined,
      guardian: {
        fullName: formData.get('guardianName'),
        phone: formData.get('guardianPhone'),
        email: formData.get('guardianEmail') || undefined,
        relationship: formData.get('guardianRelationship') || undefined,
      },
    };

    try {
      const res = await fetch('/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(studentData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Error al crear estudiante');
      }

      // Éxito - redirigir o mostrar mensaje
      alert('Estudiante creado exitosamente');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className='text-red-500 mb-4'>{error}</div>}

      <input name='email' type='email' placeholder='Email' required />
      <input name='password' type='password' placeholder='Contraseña' required />
      <input name='firstName' placeholder='Nombre' required />
      <input name='lastName' placeholder='Apellido' required />
      <input name='studentId' placeholder='ID Estudiante' required />
      <input name='courseId' type='number' placeholder='ID Curso' required />
      <input name='phone' placeholder='Teléfono' />

      <h3>Datos del Acudiente</h3>
      <input name='guardianName' placeholder='Nombre del acudiente' required />
      <input name='guardianPhone' placeholder='Teléfono del acudiente' required />
      <input name='guardianEmail' type='email' placeholder='Email del acudiente' />
      <input name='guardianRelationship' placeholder='Parentesco' />

      <button type='submit' disabled={loading}>
        {loading ? 'Creando...' : 'Crear Estudiante'}
      </button>
    </form>
  );
}
```

---

## 📝 Notas adicionales

### Manejo de errores común

Todas las rutas devuelven errores en el formato:

```json
{
  "error": "Descripción del error"
}
```

### Códigos de estado HTTP

| Código | Significado                    |
| ------ | ------------------------------ |
| `200`  | Éxito                          |
| `201`  | Creado exitosamente            |
| `400`  | Datos inválidos o faltantes    |
| `401`  | No autorizado                  |
| `404`  | No encontrado                  |
| `409`  | Conflicto (registro duplicado) |
| `500`  | Error del servidor             |

### IDs importantes

- `userId`: ID del usuario en la tabla `users`
- `profileId` / `studentId` (en services): ID del perfil en `user_profiles`
- `studentId` (campo visible): El ID que se muestra al usuario (ej: "12345")

---
