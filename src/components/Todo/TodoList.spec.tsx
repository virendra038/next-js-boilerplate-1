import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TodoList from "./TodoList";
import { TodoData } from "@/types/todo.type";

describe("TodoList Component", () => {
  const currentDate = new Date(Date.now() + 19800000)
    .toISOString()
    .split("T")[0];

  const todos: TodoData[] = [
    {
      _id: "1",
      task: "Task 1",
      priority: "High",
      dueDate: currentDate,
      done: false,
    },
    {
      _id: "2",
      task: "Task 2",
      priority: "Medium",
      dueDate: currentDate,
      done: true,
    },
  ];

  const CheckboxToggle = jest.fn();
  const TodoTaskUpdate = jest.fn();

  beforeEach(() => {
    CheckboxToggle.mockClear();
    TodoTaskUpdate.mockClear();
  });

  it("renders the TodoList component", () => {
    const { getByText } = render(
      <TodoList
        handleRefresh={() => {}}
        todos={todos}
        CheckboxToggle={CheckboxToggle}
        TodoTaskUpdate={TodoTaskUpdate}
      />
    );

    expect(getByText("Task")).toBeInTheDocument();
    expect(getByText("Priority")).toBeInTheDocument();
    expect(getByText("Due Date")).toBeInTheDocument();
    expect(getByText("Status")).toBeInTheDocument();
  });

  it("renders the tasks with correct information", () => {
    const { getByText, getAllByText } = render(
      <TodoList
        handleRefresh={() => {}}
        todos={todos}
        CheckboxToggle={CheckboxToggle}
        TodoTaskUpdate={TodoTaskUpdate}
      />
    );

    expect(getByText("Task 1")).toBeInTheDocument();
    expect(getByText("Task 2")).toBeInTheDocument();
    expect(getByText("High")).toBeInTheDocument();
    expect(getByText("Medium")).toBeInTheDocument();
    expect(getAllByText(currentDate)[0]).toBeInTheDocument();
    expect(getAllByText(currentDate)[0]).toBeInTheDocument();
  });

  it("calls the CheckboxToggle function when checkbox is clicked", () => {
    const { getByText } = render(
      <TodoList
        handleRefresh={() => {}}
        todos={todos}
        CheckboxToggle={CheckboxToggle}
        TodoTaskUpdate={TodoTaskUpdate}
      />
    );

    // fireEvent.click(getByText("Task 1"));
    fireEvent.click(screen.getByLabelText("Task 1"));
    expect(CheckboxToggle).toHaveBeenCalledTimes(1);

    CheckboxToggle.mockClear();

    // fireEvent.click(getByText("Task 2"));
    fireEvent.click(screen.getByLabelText("Task 2"));
    expect(CheckboxToggle).toHaveBeenCalledTimes(1);
  });

  it("updates the task when edited", () => {
    const { getByText, getByDisplayValue } = render(
      <TodoList
        handleRefresh={() => {}}
        todos={todos}
        CheckboxToggle={CheckboxToggle}
        TodoTaskUpdate={TodoTaskUpdate}
      />
    );

    fireEvent.click(getByText("Task 1"));
    fireEvent.change(getByDisplayValue("Task 1"), {
      target: { value: "Task 1 Updated" },
    });
    fireEvent.keyDown(getByDisplayValue("Task 1 Updated"), {
      key: "Enter",
      code: "Enter",
    });
    expect(TodoTaskUpdate).toHaveBeenCalledTimes(1);
  });

  // it("toggles the checkbox when clicked", () => {
  //   const { getByLabelText } = render(
  //     <TodoList
  //       handleRefresh={() => {}}
  //       todos={todos}
  //       CheckboxToggle={CheckboxToggle}
  //       TodoTaskUpdate={TodoTaskUpdate}
  //     />
  //   );

  //   const checkbox = screen.getByLabelText("Task 1");
  //   fireEvent.click(checkbox);
  //   expect(CheckboxToggle).toHaveBeenCalledTimes(1);
  //   expect(checkbox).toBeChecked();
  // });
});
