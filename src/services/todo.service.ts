import type { TodoData } from "@/types/todo.type";

export const getTodos = async () => {
  const response = await fetch("http://localhost:3000/api/todo");
  const todos = await response.json();
  return todos;
};

export const getTodosByDueDate = async (dueDate: string) => {
  const response = await fetch(
    `http://localhost:3000/api/todo?dueDate=${dueDate}`
  );
  const todos = await response.json();
  return todos;
};

export const getTodobyId = async (id: string) => {
  const response = await fetch(`http://localhost:3000/api/todo/${id}`);
  const todo = await response.json();
  return todo;
};

export const updateTodo = async (id: string, todo: TodoData) => {
  try {
    await fetch(`http://localhost:3000/api/todo/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateTodoTask = async (id: string, task: string) => {
  const findTodo = await getTodobyId(id);
  await updateTodo(id, {
    ...findTodo,
    task,
  });
};

export const markTodoAsDone = async (id: string) => {
  const findTodo = await getTodobyId(id);
  const done = findTodo.done;
  await updateTodo(id, {
    ...findTodo,
    done: !done,
  });
};

export const createTodo = async (todo: TodoData) => {
  const response = await fetch("http://localhost:3000/api/todo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });
  const newTodo = await response.json();
  return newTodo;
};

export const deleteTodo = async (id: string) => {
  const response = await fetch(`http://localhost:3000/api/todo/${id}`, {
    method: "DELETE",
  });
  const deletedTodo = await response.json();
  return deletedTodo;
};
