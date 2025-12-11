import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import StatusChip from "./statusChip";

describe("Componente StatusChip", () => {
  it("Se renderiza correctamente con estado Activo", () => {
    render(<StatusChip status="Activo" />);

    const chip = screen.getByText("Activo");
    expect(chip).toBeInTheDocument();

    // Verificamos estilos esenciales
    expect(chip).toHaveStyle({
      backgroundColor: "#308a4e",
      color: "#FFFFFF",
    });
  });

  it("Se renderiza correctamente con estado Inactivo", () => {
    render(<StatusChip status="Inactivo" />);

    const chip = screen.getByText("Inactivo");
    expect(chip).toBeInTheDocument();

    expect(chip).toHaveStyle({
      backgroundColor: "#B91C1C",
      color: "#FFFFFF",
    });
  });

  it("Se renderiza correctamente con estado Suspendido", () => {
    render(<StatusChip status="Suspendido" />);

    const chip = screen.getByText("Suspendido");
    expect(chip).toBeInTheDocument();

    expect(chip).toHaveStyle({
      backgroundColor: "#ba6625",
      color: "#FFFFFF",
    });
  });
});
