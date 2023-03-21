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
    // let todos: TodoData[] = [];
    // console.log(baseUrl);
    // console.log(queryParams);
    const res = await axios.get(baseUrl + "/api/todo", {
      params: queryParams,
    });
    // todos = res.data;
    // if (todos != undefined) return todos;
    // return todos;
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getTodosByDueDate = async (dueDate: string) => {
  let todos: TodoData[] = [];
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}:${process.env.NEXT_PUBLIC_PORT}/api/todo?dueDate=${dueDate}`
    );
    todos = await response.json();
  } catch (error) {
    console.log("error from getTodosByDueDate service", error);
  }
  return todos;
};

export const getTodobyId = async (id: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}:${process.env.NEXT_PUBLIC_PORT}/api/todo/${id}`
    );
    const todo = await response.json();
    return todo;
  } catch (error) {
    console.log("error from getTodobyId service", error);
  }
};

export const updateTodo = async (id: string, todo: TodoData) => {
  try {
    await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}:${process.env.NEXT_PUBLIC_PORT}/api/todo/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
      }
    );
  } catch (error) {
    console.log("error from updateTodo service", error);
  }
};

export const updateTodoTask = async (id: string, task: string) => {
  try {
    const findTodo = await getTodobyId(id);
    await updateTodo(id, {
      ...findTodo,
      task,
    });
  } catch (error) {
    console.log("error from updateTodoTask service", error);
  }
};

export const markTodoAsDone = async (id: string) => {
  try {
    const findTodo = await getTodobyId(id);
    const done = findTodo.done;
    await updateTodo(id, {
      ...findTodo,
      done: !done,
    });
  } catch (error) {
    console.log("error from markTodoAsDone service", error);
  }
};

// export const getTodos = async (
//   baseUrl: String,
//   queryParams: queryParamsType
// ) => {
//   try {
//     let todos: TodoData[] = [];
//     const res = await axios.get(baseUrl + "/api/todo", {
//       params: queryParams,
//     });
//     todos = res.data;
//     if (todos != undefined) return todos;
//     return [];
//   } catch (error) {
//     console.log(error);
//   }
// };

export const createTodo = async (baseUrl: String, todo: TodoData) => {
  try {
    console.log(baseUrl);
    const res = await axios.post(baseUrl + "/api/todo", todo, {
      headers: { "Content-Type": "application/json" },
    });
    // const response = await fetch(baseUrl + "/api/todo", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(todo),
    // });
    // const newTodo = await response.json();
    const newTodo = await res.data;
    return newTodo;
  } catch (error) {
    console.log("error from createTodo service", error);
  }
};

export const deleteTodo = async (id: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}:${process.env.NEXT_PUBLIC_PORT}/api/todo/${id}`,
      {
        method: "DELETE",
      }
    );
    const deletedTodo = await response.json();
    return deletedTodo;
  } catch (error) {
    console.log("error from deleteTodo service", error);
  }
};
