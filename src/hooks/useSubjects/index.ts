import { fetchData } from '@/utils/fetchData';
import { useCallback, useEffect, useState } from 'react';

interface Subject {
  id: number;
  name: string;
  description: string;
}

interface Teacher {
  teacher: {
    firstName: string;
    lastName: string;
  };
}

interface CourseSubject {
  id: number;
  subject: Subject;
  teachers: Teacher[];
}

interface Courses {
  id: number;
  name: string;
  section: string;
  year: number;
  createdAt: string;
  updatedAt: string;
  subjects: CourseSubject[];
}

interface CoursesResponse {
  courses: Courses[];
}

interface UseSubjectsParams {
  grouped?: boolean;
}

interface UseSubjectsReturn {
  data: CoursesResponse | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useSubjects = (params?: UseSubjectsParams): UseSubjectsReturn => {
  const [data, setData] = useState<CoursesResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSubjects = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const queryParams = new URLSearchParams();
      if (params?.grouped) {
        queryParams.append('grouped', params.grouped.toString());
      }

      const url = `/api/subjects${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
      const response = await fetchData<CoursesResponse>(url);
      setData(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al obtener los temas');
    } finally {
      setLoading(false);
    }
  }, [params?.grouped]);

  useEffect(() => {
    fetchSubjects();
  }, [fetchSubjects]);

  return { data, loading, error, refetch: fetchSubjects };
};
