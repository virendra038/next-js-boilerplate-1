import connectDB from "@/database/db";
import type { TodoData } from "@/types/todo.type";

export const getTodos = async () => {
  // await connectDB();
  const response = await fetch("http://localhost:3000/api/todo");
  const todos = await response.json();
  return todos;
};

export const getTodosByDueDate = async (dueDate: string) => {
  // await connectDB();
  const response = await fetch(
    `http://localhost:3000/api/todo?dueDate=${dueDate}`
  );
  const todos = await response.json();
  return todos;
};

export const getTodobyId = async (id: string) => {
  // await connectDB();
  const response = await fetch(`http://localhost:3000/api/todo/${id}`);
  const todo = await response.json();
  return todo;
};

export const updateTodo = async (id: string, todo: TodoData) => {
  // await connectDB();
  const response = await fetch(`http://localhost:3000/api/todo/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });
  const updatedTodo = await response.json();
  return updatedTodo;
};

export const markTodoAsDone = async (id: string) => {
  // await connectDB();
  const findTodo = await getTodobyId(id);
  const done = findTodo.done;
  const updatedTodo = await updateTodo(id, {
    ...findTodo,
    done: !done,
  });
  const response = await updateTodo(id, updatedTodo);
  return updatedTodo;
};
