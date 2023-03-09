import connectDB from "@/database/db";

export const getTodos = async () => {
  await connectDB();
  const response = await fetch("http://localhost:3000/api/todo");
  const todos = await response.json();
  return todos;
};

export const getTodosByDueDate = async (dueDate: string) => {
  await connectDB();
  const response = await fetch(
    `http://localhost:3000/api/todo?dueDate=${dueDate}`
  );
  const todos = await response.json();
  return todos;
};

export const getTodobyId = async (id: string) => {
  await connectDB();
  const response = await fetch(`http://localhost:3000/api/todo/${id}`);
  const todo = await response.json();
  return todo;
};
