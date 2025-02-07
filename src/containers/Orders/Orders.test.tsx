import { describe, it, expect, vi, Mock } from "vitest";
import { Orders } from "./Orders";
import { MemoryRouter } from "react-router-dom";
import { SessionProvider } from "../../context/AuthContext";
import { render, screen, waitFor } from "@testing-library/react";
import { getOrders } from "../../services/getOrders";
import { useSession } from "../../context/AuthContext";
import { getSummaryOrders } from "../../utils/summary";

vi.mock("../../services/getOrders", () => ({
  getOrders: vi.fn(),
}));

vi.mock("../../context/AuthContext", async () => {
  const actual = await vi.importActual("../../context/AuthContext");
  return {
    ...actual,
    useSession: vi.fn(),
  };
});

const mockGetOrders = getOrders as Mock;

const mockOrders = [
  {
    id: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
    customer: {
      id: "60d07f61-99bf-4b90-955b-5d3a7c9bb3d4",
      name: "John Doe",
      email: "john.doe@example.com",
    },
    products: [
      {
        id: "7567ec4b-b10c-48c5-9345-fc73c48a80a2",
        name: "Laptop",
        price: 999.99,
        quantity: 1,
      },
      {
        id: "7567ec4b-b10c-48c5-9345-fc73c48a80a3",
        name: "Mouse",
        price: 29.99,
        quantity: 1,
      },
    ],
    total: 1029.98,
    status: "delivered",
    orderDate: "2023-10-01T10:00:00Z",
    shippingAddress: {
      street: "123 Main St",
      city: "Anytown",
      state: "CA",
      zipCode: "12345",
      country: "USA",
    },
    paymentMethod: "credit_card",
  },
];

describe("<Orders />", () => {
  const handleRenderOrders = (userRole: string) => {
    const mockUser = userRole ? { role: userRole } : null;
    (useSession as Mock).mockReturnValue({ user: mockUser });
    render(
      <MemoryRouter>
        <SessionProvider>
          <Orders />
        </SessionProvider>
      </MemoryRouter>
    );
  };

  it("Debería mostrar las ordenes", async () => {
    mockGetOrders.mockResolvedValue(mockOrders);
    handleRenderOrders("visualizer");

    await waitFor(() => {
      // waitFor sirve para esperar a que se resuelva la promesa
      const orders = screen.getAllByRole("heading", { level: 3 });
      expect(orders).toHaveLength(mockOrders.length);
    });
  });

  it("Debería mostrar sección para superAdmins", async () => {
    mockGetOrders.mockResolvedValue(mockOrders);
    handleRenderOrders("superadmin");

    await waitFor(() => {
      const { totalOrders } = getSummaryOrders(mockOrders);
      const totalOrdersElement = screen.getByTestId("totalOrders").textContent;
      expect(totalOrdersElement).toBe(totalOrders.toString());
    });
  });
});
