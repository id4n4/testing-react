import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { Button } from "./Button";

describe("<Button />", () => {
  it('Debería renderizar el botón con el texto "Click me"', () => {
    render(<Button label="Click me" />); // render => renderiza el componente
    const button = screen.getByText("Click me"); // screen.getByText => busca un elemento por su texto
    expect(button).toBeInTheDocument(); // expect => verifica que el elemento esté en el documento
  });

  it("debería llamar a la función onClick", async () => {
    // arrange
    const handleClick = vi.fn(); // vi.fn => crea una función espía
    render(<Button label="Click me" onClick={handleClick} />);
    const button = screen.getByText("Click me");

    // act
    await act(() => {
      fireEvent.click(button); // fireEvent.click => simula un evento de click
    });

    // assert
    expect(handleClick).toHaveBeenCalledOnce(); // expect(fn).toHaveBeenCalled => verifica que la función haya sido llamada
  });
});
