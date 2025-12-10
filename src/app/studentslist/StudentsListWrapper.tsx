"use client";
import React, { useState } from "react";
import BarOptions from "@/components/barOptions/barOptions";
import StudentsTable from "@/components/studentsTable/studentsTable";
import TopBar from "@/components/topBar/TopBar";

export default function StudentsListWrapper() {
  const [q, setQ] = useState("");

  return (
    
    <div className="min-h-screen bg-gray-50">
      <TopBar/>
      <div className="max-w-6xl mx-auto mt-5">
        <BarOptions
          onSearch={(v) => setQ(v)}
          onAdd={() => {
            // abrir modal o navegación
            alert("Abrir formulario de añadir estudiante (placeholder)");
          }}
          onFilter={() => alert("Abrir filtros (placeholder)")}
          onExport={() => alert("Exportar (placeholder)")}
        />

        <div className="mt-6">
          <StudentsTable search={q} />
        </div>
      </div>
    </div>
  );
}