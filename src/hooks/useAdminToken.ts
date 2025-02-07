
// obtener token, actualizar token, eliminar token del local storage
export const useAdminToken = () => {
  const getToken = () => {
    return localStorage.getItem("token")
  }
  const updateToken = (token: string) => {
    localStorage.setItem("token", token)
  }
  const deleteToken = () => {
    localStorage.removeItem("token")
  }
  return {
    getToken,
    updateToken,
    deleteToken
  }
}
