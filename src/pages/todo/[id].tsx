import TodoList from "@/components/Todo/TodoList";
import { getTodobyId } from "@/services/todo.service";
import type { TodoData } from "@/types/todo.type";
import { GetServerSideProps } from "next";

export default function Todo(todo: TodoData) {
  let todos = [];
  todos.push(todo);
  //   console.log("todos with a single todo", todos);
  return <TodoList todos={todos} />;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  let todo: TodoData;
  const id = ctx.params!.id;

  if (!id || Array.isArray(id)) {
    return {
      notFound: true,
    };
  }
  try {
    todo = await getTodobyId(id);
    // console.log("todo by id ", todo);
    return {
      props: {
        ...todo,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
};
