import React from "react";
import { render,screen, fireEvent } from "@testing-library/react";
import TodoList from "./TodoList";
import { TodoData } from "@/types/todo.type";

describe("TodoList Component", () => {

  const currentDate = new Date(Date.now() + 19800000).toISOString().split("T")[0];

  const todos: TodoData[] = [
    {
      _id: 1,
      task: "Task 1",
      priority: "High",
      dueDate: currentDate,
      done: false,
    },
    {
      _id: 2,
      task: "Task 2",
      priority: "Medium",
      dueDate: currentDate,
      done: true,
    },
  ];

  const CheckboxToggle = jest.fn();
  const TodoTaskUpdate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the TodoList component", () => {
    const { getByText } = render(
      <TodoList todos={todos} CheckboxToggle={CheckboxToggle} TodoTaskUpdate={TodoTaskUpdate} />
    );

    expect(getByText("Task")).toBeInTheDocument();
    expect(getByText("Priority")).toBeInTheDocument();
    expect(getByText("Due Date")).toBeInTheDocument();
    expect(getByText("Status")).toBeInTheDocument();
  });

  it("renders the tasks with correct information", () => {
    const { getByText, getAllByText } = render(
      <TodoList todos={todos} CheckboxToggle={CheckboxToggle} TodoTaskUpdate={TodoTaskUpdate} />
    );

    expect(getByText("Task 1")).toBeInTheDocument();
    expect(getByText("Task 2")).toBeInTheDocument();
    expect(getByText("High")).toBeInTheDocument();
    expect(getByText("Medium")).toBeInTheDocument();
    expect(getAllByText(currentDate)[0]).toBeInTheDocument();
    expect(getAllByText(currentDate)[0]).toBeInTheDocument();
  });
});
