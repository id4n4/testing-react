import { renderHook } from "@testing-library/react-hooks";
import { describe, expect, it } from "vitest";
import { useAdminToken } from "./useAdminToken";

describe('useAdminToken', () => {

  it('Debería actualizar el token', async () => {
    const { result } = renderHook(() => useAdminToken())
    result.current.updateToken('token')
    expect(result.current.getToken()).toBe('token')
  })

  it('Debería eliminar el token', async () => {
    const { result } = renderHook(() => useAdminToken())
    result.current.updateToken('token')
    result.current.deleteToken()
    expect(result.current.getToken()).toBe(null)
  })
})