import { describe, it, expect } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { TodoList } from "./TodoList";
import { act } from "react";

describe("<TodoList />", () => {
  it("Debería renderizar una lista de tareas", () => {
    // arrange
    render(<TodoList />);
    const list = screen.getByRole("list");
    // act
    // assert
    expect(list).toBeInTheDocument();
  });
  it("Debería poder crear una tarea nueva", async () => {
    // arrange
    render(<TodoList />);
    const addButton = screen.getByText("Add task");
    // act
    await act(() => {
      fireEvent.click(addButton);
    });
    const newTask = screen.getByDisplayValue("New task");
    // assert
    expect(newTask).toBeInTheDocument();
  });
  it("Debería poder editar una tarea", async () => {
    // arrange
    render(<TodoList />);
    const addButton = screen.getByText("Add task");
    // act
    await act(() => {
      fireEvent.click(addButton);
    });
    const editInput = screen.getByPlaceholderText("new task");
    await act(() => {
      fireEvent.change(editInput, { target: { value: "Edited task" } });
    });
    const edited = screen.getByDisplayValue("Edited task");
    // assert
    expect(edited).toBeInTheDocument();
  });
  it("Debería poder eliminar una tarea", async () => {
    // arrange
    render(<TodoList />);
    const addButton = screen.getByText("Add task");
    // act
    await act(() => {
      fireEvent.click(addButton);
    });
    const deleteButton = screen.getByText("Delete");
    await act(() => {
      fireEvent.click(deleteButton);
    });
    // assert
    expect(deleteButton).not.toBeInTheDocument();
  });
  it("Debería poder marcar una tarea como completada", async () => {
    // arrange
    render(<TodoList />);
    const addButton = screen.getByText("Add task");
    // act
    await act(() => {
      fireEvent.click(addButton);
    });
    const completeButton = screen.getByText("Complete");
    await act(() => {
      fireEvent.click(completeButton);
    });
    const completed = screen.getByText("Completed");
    // assert
    expect(completed).toBeInTheDocument();
  });
});
