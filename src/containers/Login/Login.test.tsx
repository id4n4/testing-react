import { describe, it, expect, vi, Mock } from "vitest";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Login } from "./Login";
import { SessionProvider } from "../../context/AuthContext";
import { getAuth } from "../../services/getAuth";

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Mock getAuth => hace que la función getAuth devuelva un objeto vacío en lugar de hacer una solicitud a la API
vi.mock("../../services/getAuth", () => ({
  getAuth: vi.fn(),
}));

const mockGetAuth = getAuth as Mock;
const mockNavigate = vi.fn();

describe("Login", () => {
  const handleLogin = () => {
    return render(
      <SessionProvider>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </SessionProvider>
    );
  };

  // region login uncheck
  it("debería mostrar un mensaje de error cuando hay un login erróneo", async () => {
    // Arrange
    mockGetAuth.mockRejectedValue(new Error("Invalid credentials"));
    handleLogin();
    const userNameInput = screen.getByPlaceholderText("Username");
    const passwordInput = screen.getByPlaceholderText("Password");
    const buttonLogin = screen.getByRole("button", { name: "Login" });
    // Act
    await act(() => {
      fireEvent.change(userNameInput, { target: { value: "wrongUser" } });
      fireEvent.change(passwordInput, { target: { value: "wrongPassword" } });
      fireEvent.click(buttonLogin);
    });
    const errorMessage = screen.getByText("Invalid credentials");
    // Assert
    expect(errorMessage).toBeInTheDocument();
  });

  // region login check
  it("debería redirigir a /orders", async () => {
    // Arrange
    mockGetAuth.mockResolvedValue({ success: true });
    handleLogin();

    const userNameInput = screen.getByPlaceholderText("Username");
    const passwordInput = screen.getByPlaceholderText("Password");
    const buttonLogin = screen.getByRole("button", { name: "Login" });
    // Act
    await act(() => {
      fireEvent.change(userNameInput, { target: { value: "validUser" } });
      fireEvent.change(passwordInput, { target: { value: "validPassword" } });
      fireEvent.click(buttonLogin);
    });
    await waitFor(() => {
      // Assert
      expect(mockGetAuth).toHaveBeenCalledWith("validUser", "validPassword");
      expect(mockNavigate).toHaveBeenCalledWith("/orders");
    });
  });
});
