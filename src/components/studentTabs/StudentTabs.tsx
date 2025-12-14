'use client';

import { Card, Tabs, Tab, Divider } from '@mui/material';
import { useState } from 'react';

import StudentInformationTab from '../StudentInformationTab';
import AcademicReportTab from '../academicReportTab/AcademicReportTab';
import DisciplineNotesTab from '../DisciplineNotesTab/DisciplineNotesTab';
import { StudentDetail } from '@/types/student';

interface StudentTabsProps {
  student: StudentDetail;
}

export default function StudentTabs({ student }: StudentTabsProps) {
  const [tab, setTab] = useState(0);

  return (
    <Card className='p-6 shadow-sm'>
      <Tabs value={tab} onChange={(_, v) => setTab(v)} textColor='primary' indicatorColor='primary'>
        <Tab label='Información' className='normal-case font-medium' />
        <Tab label='Reporte Académico' className='normal-case font-medium' />
        <Tab label='Notas Disciplinarias' className='normal-case font-medium' />
      </Tabs>

      <Divider className='my-4' />

      {tab === 0 && <StudentInformationTab student={student} />}
      {tab === 1 && <AcademicReportTab/>}
      {tab === 2 && <DisciplineNotesTab/>}
    </Card>
  );
}
