import { NextRequest, NextResponse } from 'next/server';
import { getAllCourses, createCourse, getCoursesForSelect } from '@/server/courses/courses.service';

// GET /api/courses
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const forSelect = searchParams.get('forSelect') === 'true';
    const year = searchParams.get('year');

    if (forSelect) {
      const courses = await getCoursesForSelect();
      return NextResponse.json({ courses });
    }

    const courses = await getAllCourses(year ? parseInt(year) : undefined);
    return NextResponse.json({ courses });
  } catch (error) {
    console.error('Error fetching courses:', error);
    return NextResponse.json({ error: 'Error al obtener cursos' }, { status: 500 });
  }
}

// POST /api/courses
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.name || !body.section || !body.year) {
      return NextResponse.json({ error: 'name, section y year son requeridos' }, { status: 400 });
    }

    const course = await createCourse(body);

    return NextResponse.json(course, { status: 201 });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Error creating course:', error);

    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'Ya existe un curso con ese nombre, sección y año' },
        { status: 409 }
      );
    }

    return NextResponse.json({ error: 'Error al crear curso' }, { status: 500 });
  }
}
