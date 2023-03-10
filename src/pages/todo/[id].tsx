import TodoList from "@/components/Todo/TodoList";
import { getTodobyId } from "@/services/todo.service";
import type { TodoData } from "@/types/todo.type";
import { GetServerSideProps } from "next";
import { markTodoAsDone } from "@/services/todo.service";

async function CheckboxToggle(id: string) {
  console.log("todo marked as done init");
  await markTodoAsDone(id);
}

export default function Todo(todo: TodoData) {
  let todos = [];
  todos.push(todo);
  return <TodoList CheckboxToggle={CheckboxToggle} todos={todos} />;
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
