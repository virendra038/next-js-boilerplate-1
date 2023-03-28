import useSwr from "swr";
import type { TodoData } from "../types/todo.type";
import axios, { AxiosError } from "axios";

function calculateDueDate(filter: string) {
  switch (filter) {
    case "all":
      return "";
    case "next7":
      return new Date(Date.now() + 19800000 + 604800000)
        .toISOString()
        .split("T")[0];
    default:
      return new Date(Date.now() + 19800000).toISOString().split("T")[0];
  }
}
export const useTodos = (filter: string) => {
  const dueDate = calculateDueDate(filter);

  const { data, isLoading, error, mutate } = useSwr<TodoData[]>(
    "todos",
    async () => {
      const { data } = await axios.get<TodoData[]>("/api/todo", {
        params: { dueDate },
      });
      // setData(data);
      return data;
    }
  );

  async function getTodoById(id: string) {
    let response = { data: null, error: null };
    try {
      const res = await axios.get(`/api/todo/${id}`);
      response.data = res.data;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        //axios error
        response.error = error.response.data.message;
      } else {
        //other error
        console.log(error);
      }
    }
    return response;
  }

  async function markTodoAsDone(id: string, done: boolean) {
    // console.log("id 642295369ba084434d4f2930", id);
    let response = { data: null, error: null };
    try {
      const res = await axios.put(`/api/todo/${id}`, { done });
      response.data = res.data;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        //axios error
        response.error = error.response.data.message;
      } else {
        //other error
        console.log(error);
      }
    }
    mutate();//refresh the data
    return response;
  }

  async function updateTodoTask(id: string, task: string) {
    let response = { data: null, error: null };
    try {
      const res = await axios.put(`/api/todo/${id}`, { task });
      response.data = res.data;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        //axios error
        response.error = error.response.data.message;
      } else {
        //other error
        console.log(error);
      }
    }
    mutate();//refresh the data
    return response;
  }

  async function createTodo(task: TodoData) {
    let response = { data: null, error: null };
    let res;
    try {
      res = await axios.post("/api/todo", task);
      response.data = res.data;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        //axios error
        response.error = error.response.data.message;
      } else {
        //other error
        console.log(error);
      }
    }
    // refresshing the data
    mutate();
    return response;
  }

  return {
    todos: data || [],
    isLoading,
    isError: error,
    mutate,
    markTodoAsDone,
    updateTodoTask,
    createTodo,
    getTodoById
  };
};
