import '@testing-library/jest-dom'
import { afterAll, afterEach, beforeAll } from "vitest";
import { server } from "./mocks/server";

beforeAll(() => server.listen()) // El servidor comience a escuchar las solicitudes de prueba antes de que se ejecuten las pruebas
afterEach(() => server.resetHandlers()) // Restablecer todos los controladores de solicitud después de cada prueba
afterAll(() => server.close()) // Cerrar el servidor después de que se hayan ejecutado todas las pruebas