import { NextRequest, NextResponse } from 'next/server';
import {
  getAllSubjects,
  createSubject,
  getSubjectsGroupedByCourse,
} from '@/server/subjects/subjects.service';

// GET /api/subjects
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const grouped = searchParams.get('grouped') === 'true';

    if (grouped) {
      // Retorna asignaturas agrupadas por curso (para la vista principal)
      const courses = await getSubjectsGroupedByCourse();
      return NextResponse.json({ courses });
    }

    // Retorna lista simple de asignaturas
    const subjects = await getAllSubjects();
    return NextResponse.json({ subjects });
  } catch (error) {
    console.error('Error fetching subjects:', error);
    return NextResponse.json({ error: 'Error al obtener asignaturas' }, { status: 500 });
  }
}

// POST /api/subjects
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.name) {
      return NextResponse.json({ error: 'El nombre es requerido' }, { status: 400 });
    }

    const subject = await createSubject(body);

    return NextResponse.json(subject, { status: 201 });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Error creating subject:', error);

    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'Ya existe una asignatura con ese nombre' },
        { status: 409 }
      );
    }

    return NextResponse.json({ error: 'Error al crear asignatura' }, { status: 500 });
  }
}
