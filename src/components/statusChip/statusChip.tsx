"use client";
import React from "react";
import Chip from "@mui/material/Chip";

type Status = "Activo" | "Inactivo" | "Suspendido";

interface Props {
  status: Status;
}

const colorMap: Record<Status, { bg: string; color: string }> = {
  Activo: { bg: "#308a4e", color: "#FFFFFF" },     // verde fuerte / blanco
  Inactivo: { bg: "#B91C1C", color: "#FFFFFF" },   // rojo fuerte / blanco
  Suspendido: { bg: "#ba6625", color: "#FFFFFF" }, // naranja fuerte / blanco
};

export default function StatusChip({ status }: Props) {
  const style = colorMap[status] || colorMap.Activo;
  return (
    <Chip
      label={status}
      sx={{
        backgroundColor: style.bg,
        color: style.color,
        fontWeight: 700,
        height: 28,
        borderRadius: "999px",
        fontSize: "0.75rem",
        paddingLeft: "10px",
        paddingRight: "10px",
      }}
      size="small"
    />
  );
}
