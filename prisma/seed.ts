import { PrismaClient, UserStatus } from '@/generated/prisma';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed de la base de datos...\n');

  // ==================== ROLES ====================
  console.log('📋 Creando roles...');
  const roles = await Promise.all([
    prisma.role.upsert({
      where: { name: 'admin' },
      update: {},
      create: { name: 'admin' },
    }),
    prisma.role.upsert({
      where: { name: 'teacher' },
      update: {},
      create: { name: 'teacher' },
    }),
    prisma.role.upsert({
      where: { name: 'student' },
      update: {},
      create: { name: 'student' },
    }),
  ]);

  const [adminRole, teacherRole, studentRole] = roles;
  console.log('✅ Roles creados\n');

  // ==================== COURSES ====================
  console.log('🏫 Creando cursos...');
  const courses = await Promise.all([
    prisma.course.upsert({
      where: { name_section_year: { name: 'Séptimo', section: 'D', year: 2025 } },
      update: {},
      create: { name: 'Séptimo', section: 'D', year: 2025 },
    }),
    prisma.course.upsert({
      where: { name_section_year: { name: 'Séptimo', section: 'C', year: 2025 } },
      update: {},
      create: { name: 'Séptimo', section: 'C', year: 2025 },
    }),
    prisma.course.upsert({
      where: { name_section_year: { name: 'Octavo', section: 'C', year: 2025 } },
      update: {},
      create: { name: 'Octavo', section: 'C', year: 2025 },
    }),
    prisma.course.upsert({
      where: { name_section_year: { name: 'Noveno', section: 'A', year: 2025 } },
      update: {},
      create: { name: 'Noveno', section: 'A', year: 2025 },
    }),
    prisma.course.upsert({
      where: { name_section_year: { name: 'Décimo', section: 'B', year: 2025 } },
      update: {},
      create: { name: 'Décimo', section: 'B', year: 2025 },
    }),
    prisma.course.upsert({
      where: { name_section_year: { name: 'Once', section: 'A', year: 2025 } },
      update: {},
      create: { name: 'Once', section: 'A', year: 2025 },
    }),
    prisma.course.upsert({
      where: { name_section_year: { name: 'Once', section: 'B', year: 2025 } },
      update: {},
      create: { name: 'Once', section: 'B', year: 2025 },
    }),
  ]);

  const [septimoD, septimoC, octavoC, novenoA, decimoB, onceA, onceB] = courses;
  console.log('✅ Cursos creados\n');

  // ==================== SUBJECTS ====================
  console.log('📚 Creando asignaturas...');
  const subjects = await Promise.all([
    prisma.subject.upsert({
      where: { name: 'Matemáticas' },
      update: {},
      create: { name: 'Matemáticas', description: 'Álgebra, geometría y cálculo' },
    }),
    prisma.subject.upsert({
      where: { name: 'Historia' },
      update: {},
      create: { name: 'Historia', description: 'Historia universal y de Colombia' },
    }),
    prisma.subject.upsert({
      where: { name: 'Inglés' },
      update: {},
      create: { name: 'Inglés', description: 'Inglés como segunda lengua' },
    }),
    prisma.subject.upsert({
      where: { name: 'Química' },
      update: {},
      create: { name: 'Química', description: 'Química general y orgánica' },
    }),
    prisma.subject.upsert({
      where: { name: 'Física' },
      update: {},
      create: { name: 'Física', description: 'Mecánica, termodinámica y ondas' },
    }),
    prisma.subject.upsert({
      where: { name: 'Estadística' },
      update: {},
      create: { name: 'Estadística', description: 'Probabilidad y estadística descriptiva' },
    }),
  ]);

  const [matematicas, historia, ingles, quimica, fisica, estadistica] = subjects;
  console.log('✅ Asignaturas creadas\n');

  // ==================== ADMIN USER ====================
  console.log('👤 Creando usuario administrador...');
  const hashedPassword = await bcrypt.hash('admin123', 10);

  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@academika.com' },
    update: {},
    create: {
      email: 'admin@academika.com',
      password: hashedPassword,
      roleId: adminRole.id,
      profile: {
        create: {
          firstName: 'Admin',
          lastName: 'Sistema',
          phone: '3001234567',
        },
      },
    },
  });
  console.log('✅ Admin creado: admin@academika.com / admin123\n');

  // ==================== TEACHERS ====================
  console.log('👨‍🏫 Creando profesores...');
  const teacherPassword = await bcrypt.hash('teacher123', 10);

  const teachers = await Promise.all([
    prisma.user.upsert({
      where: { email: 'ana.torres@academika.com' },
      update: {},
      create: {
        email: 'ana.torres@academika.com',
        password: teacherPassword,
        roleId: teacherRole.id,
        profile: {
          create: {
            firstName: 'Ana',
            lastName: 'Torres',
            phone: '3101234567',
            address: 'Calle 45 # 23-10, Bogotá',
          },
        },
      },
      include: { profile: true },
    }),
    prisma.user.upsert({
      where: { email: 'carlos.rojas@academika.com' },
      update: {},
      create: {
        email: 'carlos.rojas@academika.com',
        password: teacherPassword,
        roleId: teacherRole.id,
        profile: {
          create: {
            firstName: 'Carlos',
            lastName: 'Rojas',
            phone: '3112345678',
            address: 'Carrera 15 # 80-25, Bogotá',
          },
        },
      },
      include: { profile: true },
    }),
    prisma.user.upsert({
      where: { email: 'daniel.johnson@academika.com' },
      update: {},
      create: {
        email: 'daniel.johnson@academika.com',
        password: teacherPassword,
        roleId: teacherRole.id,
        profile: {
          create: {
            firstName: 'Daniel',
            lastName: 'Johnson',
            phone: '3123456789',
            address: 'Avenida 68 # 12-30, Bogotá',
          },
        },
      },
      include: { profile: true },
    }),
    prisma.user.upsert({
      where: { email: 'maria.nunez@academika.com' },
      update: {},
      create: {
        email: 'maria.nunez@academika.com',
        password: teacherPassword,
        roleId: teacherRole.id,
        profile: {
          create: {
            firstName: 'María',
            lastName: 'Núñez',
            phone: '3134567890',
            address: 'Calle 100 # 45-60, Bogotá',
          },
        },
      },
      include: { profile: true },
    }),
  ]);

  const [anaTorres, carlosRojas, danielJohnson, mariaNunez] = teachers;
  console.log('✅ Profesores creados (password: teacher123)\n');

  // ==================== SUBJECT-COURSE RELATIONS ====================
  console.log('🔗 Asignando asignaturas a cursos...');

  // Crear relaciones subject-course para varios cursos
  const subjectCourses = await Promise.all([
    // Noveno A
    prisma.subjectCourse.create({ data: { subjectId: matematicas.id, courseId: novenoA.id } }),
    prisma.subjectCourse.create({ data: { subjectId: historia.id, courseId: novenoA.id } }),
    prisma.subjectCourse.create({ data: { subjectId: ingles.id, courseId: novenoA.id } }),
    prisma.subjectCourse.create({ data: { subjectId: quimica.id, courseId: novenoA.id } }),
    // Séptimo C
    prisma.subjectCourse.create({ data: { subjectId: matematicas.id, courseId: septimoC.id } }),
    prisma.subjectCourse.create({ data: { subjectId: historia.id, courseId: septimoC.id } }),
    prisma.subjectCourse.create({ data: { subjectId: ingles.id, courseId: septimoC.id } }),
    // Séptimo D
    prisma.subjectCourse.create({ data: { subjectId: matematicas.id, courseId: septimoD.id } }),
    prisma.subjectCourse.create({ data: { subjectId: estadistica.id, courseId: septimoD.id } }),
    // Once B
    prisma.subjectCourse.create({ data: { subjectId: matematicas.id, courseId: onceB.id } }),
    prisma.subjectCourse.create({ data: { subjectId: fisica.id, courseId: onceB.id } }),
    prisma.subjectCourse.create({ data: { subjectId: quimica.id, courseId: onceB.id } }),
  ]);

  console.log('✅ Asignaturas asignadas a cursos\n');

  // ==================== TEACHER-SUBJECT ASSIGNMENTS ====================
  console.log('👨‍🏫 Asignando profesores a asignaturas...');

  // Ana Torres -> Matemáticas
  // Carlos Rojas -> Historia
  // Daniel Johnson -> Inglés
  // María Núñez -> Química

  await Promise.all([
    // Ana Torres enseña Matemáticas en Noveno A
    prisma.subjectTeacher.create({
      data: { teacherId: anaTorres.profile!.id, subjectCourseId: subjectCourses[0].id },
    }),
    // Carlos Rojas enseña Historia en Noveno A
    prisma.subjectTeacher.create({
      data: { teacherId: carlosRojas.profile!.id, subjectCourseId: subjectCourses[1].id },
    }),
    // Daniel Johnson enseña Inglés en Noveno A
    prisma.subjectTeacher.create({
      data: { teacherId: danielJohnson.profile!.id, subjectCourseId: subjectCourses[2].id },
    }),
    // María Núñez enseña Química en Noveno A
    prisma.subjectTeacher.create({
      data: { teacherId: mariaNunez.profile!.id, subjectCourseId: subjectCourses[3].id },
    }),
  ]);

  console.log('✅ Profesores asignados\n');

  // ==================== STUDENTS ====================
  console.log('👨‍🎓 Creando estudiantes...');
  const studentPassword = await bcrypt.hash('student123', 10);

  // Estudiantes que aparecen en las screenshots
  const studentsData = [
    {
      email: 'joan.romero@academika.com',
      firstName: 'Joan',
      lastName: 'Romero',
      studentId: '09876',
      courseId: septimoD.id,
      status: UserStatus.INACTIVE,
      birthDate: new Date('2008-05-15'),
      phone: '3122334455',
      address: 'Av. Calle 127 # 12 - 19, Bogotá',
      guardian: {
        fullName: 'Elon Musk',
        phone: '3145677680',
        email: 'elon.musk@academika.com',
        relationship: 'Tutor',
      },
    },
    {
      email: 'andrea.triana@academika.com',
      firstName: 'Andrea',
      lastName: 'Triana',
      studentId: '12345',
      courseId: novenoA.id,
      status: UserStatus.ACTIVE,
      birthDate: new Date('2009-03-22'),
      phone: '3156789012',
      address: 'Calle 80 # 30-45, Bogotá',
      guardian: {
        fullName: 'María Triana',
        phone: '3167890123',
        email: 'maria.triana@email.com',
        relationship: 'Madre',
      },
    },
    {
      email: 'jose.delaossa@academika.com',
      firstName: 'José',
      lastName: 'de la Ossa',
      studentId: '54321',
      courseId: decimoB.id,
      status: UserStatus.ACTIVE,
      birthDate: new Date('2008-08-10'),
      phone: '3178901234',
      address: 'Carrera 7 # 45-67, Bogotá',
      guardian: {
        fullName: 'Pedro de la Ossa',
        phone: '3189012345',
        email: 'pedro.ossa@email.com',
        relationship: 'Padre',
      },
    },
    {
      email: 'kathe.diaz@academika.com',
      firstName: 'Kathe',
      lastName: 'Díaz',
      studentId: '67890',
      courseId: octavoC.id,
      status: UserStatus.SUSPENDED,
      birthDate: new Date('2010-01-05'),
      phone: '3190123456',
      address: 'Avenida Suba # 100-20, Bogotá',
      guardian: {
        fullName: 'Laura Díaz',
        phone: '3201234567',
        email: 'laura.diaz@email.com',
        relationship: 'Madre',
      },
    },
    {
      email: 'andres.bohorquez@academika.com',
      firstName: 'Andrés',
      lastName: 'Bohórquez',
      studentId: '44182',
      courseId: onceA.id,
      status: UserStatus.ACTIVE,
      birthDate: new Date('2007-11-30'),
      phone: '3212345678',
      address: 'Calle 170 # 60-30, Bogotá',
      guardian: {
        fullName: 'Roberto Bohórquez',
        phone: '3223456789',
        email: 'roberto.b@email.com',
        relationship: 'Padre',
      },
    },
  ];

  for (const student of studentsData) {
    await prisma.user.upsert({
      where: { email: student.email },
      update: {},
      create: {
        email: student.email,
        password: studentPassword,
        status: student.status,
        roleId: studentRole.id,
        profile: {
          create: {
            firstName: student.firstName,
            lastName: student.lastName,
            studentId: student.studentId,
            courseId: student.courseId,
            birthDate: student.birthDate,
            phone: student.phone,
            address: student.address,
            guardian: {
              create: student.guardian,
            },
          },
        },
      },
    });
  }

  console.log('✅ Estudiantes creados (password: student123)\n');

  // ==================== GRADES ====================
  console.log('📊 Creando calificaciones...');

  // Obtener el perfil de Joan Romero para las notas (promedio 8.9)
  const joanProfile = await prisma.userProfile.findFirst({
    where: { studentId: '09876' },
  });

  if (joanProfile) {
    // Crear algunas calificaciones para que el promedio sea ~8.9
    const grades = [
      { value: 9.0, period: 1, description: 'Examen parcial 1' },
      { value: 8.5, period: 1, description: 'Proyecto grupal' },
      { value: 9.2, period: 2, description: 'Examen parcial 2' },
      { value: 8.8, period: 2, description: 'Tarea final' },
    ];

    for (const grade of grades) {
      await prisma.grade.create({
        data: {
          studentId: joanProfile.id,
          subjectCourseId: subjectCourses[7].id, // Matemáticas Séptimo D
          value: grade.value,
          period: grade.period,
          description: grade.description,
        },
      });
    }
  }

  console.log('✅ Calificaciones creadas\n');

  // ==================== NOTIFICATIONS ====================
  console.log('🔔 Creando notificaciones...');

  const now = new Date();
  await Promise.all([
    prisma.notification.create({
      data: {
        title: 'Nuevo estudiante agregado en "Estadística".',
        description: 'Se ha agregado un nuevo estudiante al curso de Estadística.',
        type: 'NEW_STUDENT',
        createdAt: new Date(now.getTime() - 3 * 60 * 60 * 1000), // Hace 3 horas
      },
    }),
    prisma.notification.create({
      data: {
        title: 'Recordatorio: Calificar proyecto el 25 Dic.',
        description: 'Recuerda calificar los proyectos finales antes de la fecha límite.',
        type: 'REMINDER',
        createdAt: new Date(now.getTime() - 24 * 60 * 60 * 1000), // Ayer
      },
    }),
    prisma.notification.create({
      data: {
        title: 'Recordatorio: Agregar nuevos criterios de calificación.',
        description: 'Se deben actualizar los criterios de calificación para el próximo período.',
        type: 'REMINDER',
        createdAt: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000), // Hace 2 días
      },
    }),
  ]);

  console.log('✅ Notificaciones creadas\n');

  // ==================== CALENDAR EVENTS ====================
  console.log('📅 Creando eventos del calendario...');

  await Promise.all([
    prisma.calendarEvent.create({
      data: {
        title: 'Examen de Matemáticas - Noveno A',
        description: 'Examen parcial del segundo período',
        startDate: new Date('2025-01-15T08:00:00'),
        endDate: new Date('2025-01-15T10:00:00'),
        type: 'EXAM',
        courseId: novenoA.id,
      },
    }),
    prisma.calendarEvent.create({
      data: {
        title: 'Entrega de Proyecto Final',
        description: 'Fecha límite para entregar el proyecto final de Historia',
        startDate: new Date('2025-01-25T23:59:00'),
        allDay: true,
        type: 'DEADLINE',
      },
    }),
    prisma.calendarEvent.create({
      data: {
        title: 'Reunión de Padres',
        description: 'Reunión general de padres de familia',
        startDate: new Date('2025-01-30T14:00:00'),
        endDate: new Date('2025-01-30T17:00:00'),
        type: 'MEETING',
      },
    }),
  ]);

  console.log('✅ Eventos del calendario creados\n');

  // ==================== SUMMARY ====================
  console.log('═══════════════════════════════════════════════════');
  console.log('✨ Seed completado exitosamente!\n');
  console.log('📋 RESUMEN:');
  console.log('   • 3 roles (admin, teacher, student)');
  console.log('   • 7 cursos');
  console.log('   • 6 asignaturas');
  console.log('   • 1 administrador');
  console.log('   • 4 profesores');
  console.log('   • 5 estudiantes');
  console.log('   • 3 notificaciones');
  console.log('   • 3 eventos de calendario\n');
  console.log('🔐 CREDENCIALES:');
  console.log('   Admin:    admin@academika.com / admin123');
  console.log('   Profesor: ana.torres@academika.com / teacher123');
  console.log('   Alumno:   joan.romero@academika.com / student123');
  console.log('═══════════════════════════════════════════════════');
}

main()
  .catch(e => {
    console.error('❌ Error durante el seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
