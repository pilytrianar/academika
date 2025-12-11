import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import StudentSidebar from "./StudentSidebar";

// Mock de Next/Image para evitar errores en pruebas
vi.mock("next/image", () => ({
  default: (props: any) => {
    // Simula un <img> básico
    return <img {...props} />;
  },
}));

describe("Componente StudentSidebar", () => {
  it("Se renderizan correctamente los datos del estudiante", () => {
    render(<StudentSidebar />);

    expect(screen.getByText("Joan Romero")).toBeInTheDocument();
    expect(screen.getByText("Curso: 7° Grado")).toBeInTheDocument();
    expect(screen.getByText("Edad: 16 años")).toBeInTheDocument();
  });

  it("Renderiza correctamente la imagen del avatar", () => {
    render(<StudentSidebar />);

    const image = screen.getByAltText("Avatar");

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "/img/userIcon.png");
  });

  it("Renderiza el botón Contactar", () => {
    render(<StudentSidebar />);

    const button = screen.getByRole("button", { name: "Contactar" });

    expect(button).toBeInTheDocument();
  });
});
