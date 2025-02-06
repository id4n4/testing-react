import { describe, expect, it } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { Contador } from "./Contador";

describe("<Contador />", () => {
  it("Debería renderizar el contador en 0", () => {
    // arrange
    render(<Contador />);
    const contador = screen.getByText("Contador: 0");
    // act
    // assert
    expect(contador).toBeInTheDocument();
  });

  it("Debería incrementar el contador al hacer click en el botón de incrementar", async () => {
    // arrange
    render(<Contador />);
    const button = screen.getByText("Incrementar");
    // act
    await act(() => {
      fireEvent.click(button);
    });
    const contador = screen.getByText("Contador: 1");
    // assert
    expect(contador).toBeInTheDocument();
  });
});
