import type { TodoData } from "@/types/todo.type";
import axios from "axios";

interface queryParamsType {
  dueDate?: string;
}

export const getTodos = async (
  baseUrl: String,
  queryParams: queryParamsType
) => {
  try {
    const res = await axios.get(baseUrl + "/api/todo", {
      params: queryParams,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getTodobyId = async (baseUrl: string, id: string) => {
  try {
    const response = await axios.get(baseUrl + `/api/todo/${id}`);
    const todo = response.data;
    return todo;
  } catch (error) {
    console.log("error from getTodobyId service", error);
  }
};

export const updateTodo = async (
  baseUrl: string,
  id: string,
  todo: TodoData
) => {
  try {
    await axios.put(baseUrl + `/api/todo/${id}`, todo, {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log("error from updateTodo service", error);
  }
};

export const updateTodoTask = async (
  baseUrl: string,
  id: string,
  task: string
) => {
  try {
    const findTodo = await getTodobyId(baseUrl, id);
    await updateTodo(baseUrl, id, {
      ...findTodo,
      task,
    });
  } catch (error) {
    console.log("error from updateTodoTask service", error);
  }
};

export const markTodoAsDone = async (baseUrl: string, id: string) => {
  try {
    const findTodo = await getTodobyId(baseUrl, id);
    const done = findTodo.done;
    await updateTodo(baseUrl, id, {
      ...findTodo,
      done: !done,
    });
  } catch (error) {
    console.log("error from markTodoAsDone service", error);
  }
};

export const createTodo = async (baseUrl: String, todo: TodoData) => {
  try {
    const res = await axios.post(baseUrl + "/api/todo", todo, {
      headers: { "Content-Type": "application/json" },
    });
    const newTodo = res.data;
    return newTodo;
  } catch (error) {
    console.log("error from createTodo service", error);
  }
};

export const deleteTodo = async (baseUrl: string, id: string) => {
  try {
    const res = await axios.delete(baseUrl + `/api/todo/${id}`);
    const deletedTodo = res.data;
    return deletedTodo;
  } catch (error) {
    console.log("error from deleteTodo service", error);
  }
};
