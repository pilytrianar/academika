"use client";

import { Card, Tabs, Tab, Divider } from "@mui/material";
import { useState } from "react";

import StudentInformationTab from "../studentInformationTab/StudentInformationTab";
import AcademicReportTab from "../academicReportTab/AcademicReportTab";
import DisciplineNotesTab from "../disciplineNotesTab/DisciplineNotesTab";

export default function StudentTabs() {
  const [tab, setTab] = useState(0);

  return (
    <Card className="p-6 shadow-sm ">
      <Tabs
        value={tab}
        onChange={(_, v) => setTab(v)}
        textColor="primary"
        indicatorColor="primary"
      >
        <Tab className="" label="Información" />
        <Tab label="Reporte Académico" />
        <Tab label="Notas Disciplinarias" />
      </Tabs>

      <Divider className="my-4" />

      {tab === 0 && <StudentInformationTab />}
      {tab === 1 && <AcademicReportTab />}
      {tab === 2 && <DisciplineNotesTab />}
    </Card>
  );
}
