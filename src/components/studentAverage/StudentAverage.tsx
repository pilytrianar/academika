"use client";

import { Card } from "@mui/material";

export default function StudentAverage() {
  return (
    <Card className="p-6">
      <p className="text-black mb-2">Promedio General</p>
      <p className="text-3xl font-bold text-blue-600">8.9/10</p>

      <div className="mt-4 w-full h-2 bg-gray-200 rounded-full">
        <div
          className="h-2 rounded-full bg-blue-600"
          style={{ width: "89%" }}
        ></div>
      </div>
    </Card>
  );
}
