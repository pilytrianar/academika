"use client";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Link from "next/link";

export default function StudentHeader() {
  return (
    <header className="flex items-center px-4 py-3">
      <Link
        href="/studentslist"
        className="flex items-center text-sm font-medium text-blue-600 hover:text-gray-900"
      >
        <ArrowBackIosNewIcon fontSize="small" className="mr-1" />
        Volver
      </Link>
    </header>
  );
}