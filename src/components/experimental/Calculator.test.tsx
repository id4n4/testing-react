import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Calculator } from "./Calculator";

describe("<Calculator />", () => {
  const useCasesTest = [
    { a: 1, b: 2, operation: "add", expected: 3 },
    { a: 5, b: 3, operation: "subtract", expected: 2 },
    { a: 2, b: 3, operation: "multiply", expected: 6 },
    { a: 6, b: 2, operation: "divide", expected: 3 },
    { a: 6, b: 0, operation: "divide", expected: "Error" },
    { a: 6, b: 0, operation: "invalid", expected: "Invalid operation" },
  ];

  it.each(useCasesTest)(
    'Debería calcular "$a" $operation "$b" y obtener "$expected"',
    ({ a, b, operation, expected }) => {
      // arrange
      render(<Calculator a={a} b={b} operation={operation} />);
      const result = screen.getByText(`Result: ${expected}`);
      // act no es necesario porque el cálculo se hace en el renderizado
      // assert
      expect(result).toBeInTheDocument();
    }
  );
});
