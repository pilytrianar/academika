import { NextRequest, NextResponse } from 'next/server';
import {
  getGrades,
  getGradesByStudent,
  createGrade,
  createManyGrades,
  type GradeFilters,
} from '@/server/grades/grades.service';

// GET /api/grades
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const studentId = searchParams.get('studentId');
    const subjectCourseId = searchParams.get('subjectCourseId');
    const period = searchParams.get('period');

    // Si solo se pide por estudiante, usar función optimizada
    if (studentId && !subjectCourseId && !period) {
      const grades = await getGradesByStudent(parseInt(studentId));
      return NextResponse.json({ grades });
    }

    const filters: GradeFilters = {};
    if (studentId) filters.studentId = parseInt(studentId);
    if (subjectCourseId) filters.subjectCourseId = parseInt(subjectCourseId);
    if (period) filters.period = parseInt(period);

    const grades = await getGrades(filters);

    return NextResponse.json({ grades });
  } catch (error) {
    console.error('Error fetching grades:', error);
    return NextResponse.json({ error: 'Error al obtener calificaciones' }, { status: 500 });
  }
}

// POST /api/grades
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Si es un array, crear múltiples
    if (Array.isArray(body)) {
      if (body.length === 0) {
        return NextResponse.json({ error: 'El array no puede estar vacío' }, { status: 400 });
      }

      const result = await createManyGrades(body);
      return NextResponse.json({ created: result.count }, { status: 201 });
    }

    // Validaciones para una sola calificación
    if (!body.studentId || !body.subjectCourseId || body.value === undefined || !body.period) {
      return NextResponse.json(
        { error: 'studentId, subjectCourseId, value y period son requeridos' },
        { status: 400 }
      );
    }

    if (body.value < 0 || body.value > 10) {
      return NextResponse.json(
        { error: 'La calificación debe estar entre 0 y 10' },
        { status: 400 }
      );
    }

    const grade = await createGrade(body);

    return NextResponse.json(grade, { status: 201 });
  } catch (error) {
    console.error('Error creating grade:', error);
    return NextResponse.json({ error: 'Error al crear calificación' }, { status: 500 });
  }
}
