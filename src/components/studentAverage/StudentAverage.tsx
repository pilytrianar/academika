'use client';

import { Card } from '@mui/material';
import { useState } from 'react';

const generateRandomAverage = () => {
  return Number((Math.random() * (10 - 6) + 6).toFixed(2));
};

export default function StudentAverage() {
  const [average] = useState<number>(generateRandomAverage);

  const percentage = (average / 10) * 100;

  return (
    <Card className='p-6'>
      <p className='text-black mb-2'>Promedio General</p>
      <p className='text-3xl font-bold text-blue-600'>{average}/10</p>

      <div className='mt-4 w-full h-2 bg-gray-200 rounded-full'>
        <div className='h-2 rounded-full bg-blue-600' style={{ width: `${percentage}%` }} />
      </div>
    </Card>
  );
}
