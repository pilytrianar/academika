# 🎓 Academika - Setup de Base de Datos

## 🚀 Comandos para configurar desde cero

### 1. Generar el cliente de prisma

```bash
npx prisma generate
```

### 2. Crear la migración inicial

```bash
npx prisma migrate dev —name init
```

### 3. Ejecutar el seed en package.json

```bash
npx prisma db seed
```

### 4. O paso a paso:

```bash
# Generar migración inicial
npx prisma migrate dev --name init

# Generar el cliente de Prisma
npx prisma generate

# Ejecutar el seed manualmente
npx prisma db seed
```

## 📊 Estructura de la Base de Datos

```
┌─────────────────────────────────────────────────────────────────┐
│                         AUTENTICACIÓN                            │
├─────────────────────────────────────────────────────────────────┤
│  Role ─────────────────┬─────────────────── User                │
│  (admin,teacher,       │                    (email, password,   │
│   student)             │                     status, roleId)    │
│                        │                         │              │
│                        │                         ▼              │
│                        │               UserProfile              │
│                        │    (firstName, lastName, birthDate,    │
│                        │     phone, address, studentId,         │
│                        │     courseId)                          │
│                        │              │         │               │
│                        │              │         ▼               │
│                        │              │     Guardian            │
│                        │              │  (fullName, phone,      │
│                        │              │   email, relationship)  │
└────────────────────────┼──────────────┼─────────────────────────┘
                         │              │
┌────────────────────────┼──────────────┼─────────────────────────┐
│                        │   ACADÉMICO  │                          │
├────────────────────────┼──────────────┼─────────────────────────┤
│                        │              │                          │
│  Course ◄──────────────┴──────────────┘                          │
│  (name, section, year)                                           │
│       │                                                          │
│       ▼                                                          │
│  SubjectCourse ◄──────── Subject                                │
│  (subjectId, courseId)   (name, description)                    │
│       │                                                          │
│       ├───────────────────────┐                                  │
│       ▼                       ▼                                  │
│  SubjectTeacher          Grade                                  │
│  (teacherId,             (studentId, value,                     │
│   subjectCourseId)        period, description)                  │
│                                                                  │
│                          DisciplinaryNote                       │
│                          (studentId, title,                     │
│                           severity, date)                       │
└──────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│                          EXTRAS                                   │
├──────────────────────────────────────────────────────────────────┤
│  Notification                    CalendarEvent                   │
│  (title, description,            (title, startDate,              │
│   type, isRead, userId)           endDate, type, courseId)       │
└──────────────────────────────────────────────────────────────────┘
```

## 🔐 Credenciales de prueba

| Rol        | Email                        | Password   |
| ---------- | ---------------------------- | ---------- |
| Admin      | admin@academika.com          | admin123   |
| Profesor   | ana.torres@academika.com     | teacher123 |
| Profesor   | carlos.rojas@academika.com   | teacher123 |
| Profesor   | daniel.johnson@academika.com | teacher123 |
| Profesor   | maria.nunez@academika.com    | teacher123 |
| Estudiante | joan.romero@academika.com    | student123 |
| Estudiante | andrea.triana@academika.com  | student123 |

## 📝 Notas importantes

1. **UserProfile.studentId** es el ID visible (ej: "12345"), diferente del `id` interno de la DB.

2. **Status de usuarios**: `ACTIVE`, `INACTIVE`, `SUSPENDED`

3. **Relación Profesor-Asignatura**: Un profesor puede dar varias asignaturas en varios cursos a través de `SubjectTeacher`.

4. **Grades**: Las notas van de 0.00 a 10.00 con 2 decimales.

5. **Períodos académicos**: 1, 2, 3, 4 (típicamente 4 períodos por año).
