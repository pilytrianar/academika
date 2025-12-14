'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

import StudentHeader from '@/components/StudentHeader';
import StudentSidebar from '@/components/StudentSideBar/StudentSidebar';
import StudentAverage from '@/components/StudentAverage/StudentAverage';
import StudentTabs from '@/components/StudentTabs';

import { getStudentById } from '@/utils/fetchStudentsData';
import { StudentDetail } from '@/types/student';
import ComponentLoader from '@/components/common/Loaders/ComponentLoader';

export default function StudentInfoWrapper() {
  const searchParams = useSearchParams();
  const id = searchParams?.get('id');

  const [student, setStudent] = useState<StudentDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const loadStudent = async () => {
      try {
        const data = await getStudentById(Number(id));
        setStudent(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadStudent();
  }, [id]);

  if (loading) {
    return <ComponentLoader />;
  }

  if (!student) {
    return <p className='p-6 text-red-500'>Estudiante no encontrado</p>;
  }

  return (
    <div className='p-3  min-h-screen'>
      <StudentHeader />

      <div className='max-w-8xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8'>
        <div className='space-y-6'>
          <StudentSidebar student={student} />
          <StudentAverage />
        </div>

        <div className='lg:col-span-3'>
          <StudentTabs student={student} />
        </div>
      </div>
    </div>
  );
}
