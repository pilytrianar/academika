import { NextRequest, NextResponse } from 'next/server';
import {
  getAllStudents,
  createStudent,
  type CreateStudentInput,
  type StudentFilters,
} from '@/server/students/students.service';
import { UserStatus } from '@/generated/prisma';

// GET /api/students
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    const filters: StudentFilters = {};

    const courseId = searchParams.get('courseId');
    if (courseId) filters.courseId = parseInt(courseId);

    const status = searchParams.get('status') as UserStatus | null;
    if (status) filters.status = status;

    const search = searchParams.get('search');
    if (search) filters.search = search;

    const result = await getAllStudents(page, limit, filters);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching students:', error);
    return NextResponse.json({ error: 'Error al obtener estudiantes' }, { status: 500 });
  }
}

// POST /api/students
export async function POST(request: NextRequest) {
  try {
    const body: CreateStudentInput = await request.json();

    // Validaciones básicas
    if (!body.email || !body.password || !body.firstName || !body.lastName) {
      return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 400 });
    }

    if (!body.studentId || !body.courseId) {
      return NextResponse.json({ error: 'studentId y courseId son requeridos' }, { status: 400 });
    }

    const student = await createStudent(body);

    return NextResponse.json(student, { status: 201 });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Error creating student:', error);

    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'El email o ID de estudiante ya existe' }, { status: 409 });
    }

    return NextResponse.json({ error: 'Error al crear estudiante' }, { status: 500 });
  }
}
