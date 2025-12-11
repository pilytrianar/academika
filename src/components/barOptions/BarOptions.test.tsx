import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import BarOptions from "./barOptions";

describe("Componente BarOptions", () => {
  it("Se renderiza correctamente los textos principales", () => {
    render(<BarOptions />);

    expect(screen.getByText("Busqueda de Estudiantes")).toBeInTheDocument();
    expect(
      screen.getByText("Encuentra y gestiona la información de los estudiantes")
    ).toBeInTheDocument();
    expect(screen.getByText("Añadir Estudiante")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Buscar por Nombre, ID o Curso")).toBeInTheDocument();
    expect(screen.getByText("Filtros")).toBeInTheDocument();
    expect(screen.getByText("Exportar")).toBeInTheDocument();
  });

  it("Ejecuta onAdd cuando se hace clic en Añadir Estudiante", () => {
    const onAdd = vi.fn();
    render(<BarOptions onAdd={onAdd} />);

    fireEvent.click(screen.getByText("Añadir Estudiante"));

    expect(onAdd).toHaveBeenCalled();
  });

  it("Ejecuta onSearch cuando el usuario escribe en el buscador", () => {
    const onSearch = vi.fn();
    render(<BarOptions onSearch={onSearch} />);

    const input = screen.getByPlaceholderText("Buscar por Nombre, ID o Curso");

    fireEvent.change(input, { target: { value: "Juan" } });

    expect(onSearch).toHaveBeenCalledWith("Juan");
  });

  it("Ejecuta onFilter al hacer clic en Filtros", () => {
    const onFilter = vi.fn();
    render(<BarOptions onFilter={onFilter} />);

    fireEvent.click(screen.getByText("Filtros"));

    expect(onFilter).toHaveBeenCalled();
  });

  it("Ejecuta onExport al hacer clic en Exportar", () => {
    const onExport = vi.fn();
    render(<BarOptions onExport={onExport} />);

    fireEvent.click(screen.getByText("Exportar"));

    expect(onExport).toHaveBeenCalled();
  });
});
