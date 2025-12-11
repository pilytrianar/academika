import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import StudentAverage from "./StudentAverage";

describe("Componente StudentAverage", () => {
  it("Se renderiza correctamente los textos del promedio", () => {
    render(<StudentAverage />);

    expect(screen.getByText("Promedio General")).toBeInTheDocument();
    expect(screen.getByText("8.9/10")).toBeInTheDocument();
  });

  it("Renderiza correctamente la barra de progreso", () => {
    const { container } = render(<StudentAverage />);

    const progressBar = container.querySelector(
      "div.bg-blue-600.h-2.rounded-full"
    );

    expect(progressBar).toBeInTheDocument();
    expect(progressBar).toHaveStyle({ width: "89%" });
  });
});
