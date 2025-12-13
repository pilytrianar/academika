import { NextRequest, NextResponse } from 'next/server';
import {
  getStudentById,
  updateStudent,
  deleteStudent,
  getStudentAverage,
} from '@/server/students/students.service';

interface Params {
  params: Promise<{ id: string }>;
}

// GET /api/students/[id]
export async function GET(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const studentId = parseInt(id);

    if (isNaN(studentId)) {
      return NextResponse.json({ error: 'ID inválido' }, { status: 400 });
    }

    const student = await getStudentById(studentId);

    if (!student) {
      return NextResponse.json({ error: 'Estudiante no encontrado' }, { status: 404 });
    }

    // Calcular promedio si tiene perfil
    let average = null;
    if (student.profile) {
      average = await getStudentAverage(student.profile.id);
    }

    return NextResponse.json({
      ...student,
      average,
    });
  } catch (error) {
    console.error('Error fetching student:', error);
    return NextResponse.json({ error: 'Error al obtener estudiante' }, { status: 500 });
  }
}

// PATCH /api/students/[id]
export async function PATCH(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const studentId = parseInt(id);

    if (isNaN(studentId)) {
      return NextResponse.json({ error: 'ID inválido' }, { status: 400 });
    }

    const body = await request.json();
    const student = await updateStudent(studentId, body);

    return NextResponse.json(student);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Error updating student:', error);

    if (error.message === 'Perfil de estudiante no encontrado') {
      return NextResponse.json({ error: error.message }, { status: 404 });
    }

    return NextResponse.json({ error: 'Error al actualizar estudiante' }, { status: 500 });
  }
}

// DELETE /api/students/[id]
export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const studentId = parseInt(id);

    if (isNaN(studentId)) {
      return NextResponse.json({ error: 'ID inválido' }, { status: 400 });
    }

    await deleteStudent(studentId);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting student:', error);
    return NextResponse.json({ error: 'Error al eliminar estudiante' }, { status: 500 });
  }
}
