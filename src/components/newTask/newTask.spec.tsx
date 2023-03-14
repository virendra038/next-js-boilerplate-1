import { render, screen, fireEvent } from "@testing-library/react";
import NewTask from "@/components/newTask/newTask";

describe("NewTask component", () => {
  test("renders a form with input field, priority dropdown and add button", () => {
    render(<NewTask CreateTask={() => {}} />);
    const input = screen.getByPlaceholderText("+Add a new task");
    const addButton = screen.getByRole("button", { name: "Add" });
    const priorityDropdown = screen.getByLabelText("Select priority");
    expect(input).toBeInTheDocument();
    expect(addButton).toBeInTheDocument();
    expect(priorityDropdown).toBeInTheDocument();
  });

  test("calls CreateTask function when add button is clicked with valid input", async () => {
    const createTaskMock = jest.fn();
    render(<NewTask CreateTask={createTaskMock} />);
    const input = screen.getByPlaceholderText("+Add a new task");
    const addButton = screen.getByRole("button", { name: "Add" });
    const priorityDropdown = screen.getByLabelText("Select priority");
    const mockTask = { task: "test task", priority: "Low", dueDate: "", done: false };

    fireEvent.change(input, { target: { value: "test task" } });
    fireEvent.change(priorityDropdown, { target: { value: "Low" } });
    fireEvent.click(addButton);

    expect(createTaskMock).toHaveBeenCalledTimes(1);
    expect(createTaskMock).toHaveBeenCalledWith(mockTask);
  });

//   test("disables add button when input is empty", () => {
//     render(<NewTask CreateTask={() => {}} />);
//     const input = screen.getByPlaceholderText("+Add a new task");
//     const addButton = screen.getByRole("button", { name: "Add" });

//     expect(addButton).toBeDisabled();

//     fireEvent.change(input, { target: { value: "test task" } });

//     expect(addButton).not.toBeDisabled();
//   });

  test("displays an error message when input is empty and add button is clicked", () => {
    render(<NewTask CreateTask={() => {}} />);
    const addButton = screen.getByRole("button", { name: "Add" });

    fireEvent.click(addButton);

    const errorMessage = screen.getByText("Please enter a task and select a priority and select a date");

    expect(errorMessage).toBeInTheDocument();
  });

  // test("dueDate can not be set to a date in the past", () => {
  //   render(<NewTask CreateTask={() => {}} />);
  //   const input = screen.getByPlaceholderText("+Add a new task");
  //   const addButton = screen.getByRole("button", { name: "Add" });
  //   const priorityDropdown = screen.getByLabelText("Select priority");
  //   const dueDateInput = screen.getByLabelText("Due Date");

  //   fireEvent.change(input, { target: { value: "test task" } });
  //   fireEvent.change(priorityDropdown, { target: { value: "Low" } });
  //   fireEvent.change(dueDateInput, { target: { value: "2021-01-01" } });
  //   fireEvent.click(addButton);

  //   const errorMessage = screen.getByText("Due date can not be set to a date in the past");

  //   expect(errorMessage).toBeInTheDocument();
  // });
});
