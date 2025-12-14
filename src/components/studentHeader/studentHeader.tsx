'use client';

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useRouter } from 'next/navigation';

export default function StudentHeader() {
  const router = useRouter();

  return (
    <header className='flex items-center px-4 py-1 mb-5'>
      <button
        onClick={() => router.back()}
        className='flex items-center text-sm font-medium text-blue-600 hover:text-gray-900'
      >
        <ArrowBackIosNewIcon fontSize='small' className='mr-1' />
        Volver
      </button>
    </header>
  );
}
