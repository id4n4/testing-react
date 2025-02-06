import { describe, it, expect } from "vitest";

describe("Mi primer test", () => {
  it("La suma de dos números", () => {
    const suma = (a: number, b: number) => {
      return a + b;
    };
    const resultado = suma(1, 2);
    expect(resultado).toBe(3);
  });

  it("Dos textos iguales", () => {
    const texto1 = "hola";
    const texto2 = "hola";
    expect(texto1).toBe(texto2);
  });
});
