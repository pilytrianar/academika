"use client";

import { Card, Button } from "@mui/material";
import Image from "next/image";

export default function StudentSidebar() {
  return (
    <Card className="p-6 text-center shadow-sm">
      <div className="flex justify-center mb-4 mt-10">
        <Image
          src="/img/userIcon.png"
          width={110}
          height={110}
          className="rounded-full"
          alt="Avatar"
        />
      </div>

      <h2 className="text-xl font-semibold mb-2 text-black">Joan Romero</h2>
      <p className="text-gray-500 mt-1">Curso: 7° Grado</p>
      <p className="text-gray-500 mb-8">Edad: 16 años</p>

      <Button
        variant="contained"
        color="primary"
        fullWidth
        className="mt-5 rounded-md!"
      >
        Contactar
      </Button>
    </Card>
  );
}
