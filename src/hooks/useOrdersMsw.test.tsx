import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, Mock, vi } from "vitest";
import { useOrders } from "./useOrders";
import { SessionProvider, useSession } from "../context/AuthContext";
import React from "react";
import { renderHook } from "@testing-library/react-hooks";
import { http, HttpResponse } from "msw";
import { server } from "../mocks/server";

vi.mock("../context/AuthContext", async () => {
  const actual = await vi.importActual("../context/AuthContext");
  return {
    ...actual,
    useSession: vi.fn(),
  };
});

describe("userOrders MSW", () => {
  const mockUser = { id: "1", name: "Juan David Sanchez Hoyos" };
  beforeEach(() => {
    (useSession as Mock).mockReturnValue({ user: mockUser });
  });
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <SessionProvider>
      <MemoryRouter>{children}</MemoryRouter>
    </SessionProvider>
  );

  it("Debe obtener good el caso de prueba", async () => {
    const { result, waitForNextUpdate } = renderHook(() => useOrders(), {
      wrapper,
    });
    const initialLoading = result.current.loading;
    expect(initialLoading).toBe(true);

    await waitForNextUpdate();

    const lengthOrders = result.current.orders.length;
    expect(lengthOrders).toBe(1);
  });

  it("Debe obtener un error ", async () => {
    server.use(
      http.get("http://localhost:3001/orders", () => {
        return new HttpResponse(null, {
          status: 500,
          statusText: "Internal Server Error",
        });
      })
    );
    const { result, waitForNextUpdate } = renderHook(() => useOrders(), {
      wrapper,
    });
    await waitForNextUpdate();
    const error = result.current.error;
    expect(error).toBe("Failed to fetch orders. Please try again later.");
  });
});
