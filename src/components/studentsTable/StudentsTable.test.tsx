import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import StudentsTable from "./StudentsTable";

// Mock del StatusChip para evitar errores y simplificar el test
vi.mock("../statusChip/statusChip", () => ({
  default: ({ status }: any) => <div data-testid="status-chip">{status}</div>,
}));

describe("Componente StudentsTable", () => {
  it("Renderiza las filas iniciales correctamente", () => {
    render(<StudentsTable />);

    expect(screen.getByText("Andrea Triana")).toBeInTheDocument();
    expect(screen.getByText("12345")).toBeInTheDocument();
  });

  it("Filtra estudiantes según el texto de búsqueda", () => {
    render(<StudentsTable search="andrea" />);

    expect(screen.getByText("Andrea Triana")).toBeInTheDocument();
    expect(screen.queryByText("José de la Ossa")).not.toBeInTheDocument();
  });

  it("Muestra mensaje cuando no hay resultados", () => {
    render(<StudentsTable search="zzzzz" />);

    expect(screen.getByText("No se encontraron resultados")).toBeInTheDocument();
  });

  it("Cambia el número de resultados por página", () => {
    render(<StudentsTable />);

    const select = screen.getByRole("button", { name: /5/i });
    fireEvent.mouseDown(select);

    const option10 = screen.getByRole("option", { name: "10" });
    fireEvent.click(option10);

    // Ahora deberían mostrarse 7 resultados (la data tiene 7)
    expect(screen.getByText("7")).toBeInTheDocument();
  });

  it("Cambia la página correctamente", () => {
    render(<StudentsTable />);

    // Página 1 → contiene "Andrea Triana"
    expect(screen.getByText("Andrea Triana")).toBeInTheDocument();

    // Cambiamos a página 2
    const page2Btn = screen.getByRole("button", { name: "2" });
    fireEvent.click(page2Btn);

    // En la pagina 2 deben aparecer los últimos estudiantes
    expect(screen.getByText("Estudiante Extra 1")).toBeInTheDocument();
  });

  it("Abre el menú contextual de una fila", () => {
    render(<StudentsTable />);

    const buttons = screen.getAllByRole("button");

    // IconButton de la primera fila
    fireEvent.click(buttons[1]);

    expect(screen.getByText("Ver")).toBeInTheDocument();
    expect(screen.getByText("Editar")).toBeInTheDocument();
    expect(screen.getByText("Eliminar")).toBeInTheDocument();
  });
});
