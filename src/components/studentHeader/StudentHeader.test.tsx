import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import StudentHeader from "./studentHeader";

// Mock de next/link para pruebas
vi.mock("next/link", () => ({
  default: ({ children, href }: any) => (
    <a href={href}>{children}</a>
  ),
}));

describe("Componente StudentHeader", () => {
  it("Se renderiza correctamente el texto 'Volver'", () => {
    render(<StudentHeader />);
    expect(screen.getByText("Volver")).toBeInTheDocument();
  });

  it("El enlace apunta a /studentslist", () => {
    render(<StudentHeader />);
    const link = screen.getByText("Volver").closest("a");

    expect(link).toHaveAttribute("href", "/studentslist");
  });

  it("Renderiza correctamente el icono ArrowBackIosNew", () => {
    render(<StudentHeader />);

    const icon = screen.getByTestId("ArrowBackIosNewIcon");

    expect(icon).toBeInTheDocument();
  });
});
