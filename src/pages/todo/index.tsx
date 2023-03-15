import TodoList from "@/components/Todo/TodoList";
import {
  createTodo,
  getTodos,
  getTodosByDueDate,
  updateTodoTask,
} from "@/services/todo.service";
import type { TodoData } from "@/types/todo.type";
import type { GetServerSideProps } from "next";
import { markTodoAsDone } from "@/services/todo.service";
import { Box, Flex, Heading } from "@chakra-ui/react";
import NewTask from "@/components/newTask/newTask";
import { useState } from "react";
import Sidebar from "@/components/sideNav/sideNav";

interface TodoProps {
  todos: TodoData[];
}

export async function CheckboxToggle(id: string) {
  await markTodoAsDone(id);
}

export async function TodoTaskUpdate(id: string, data: string) {
  await updateTodoTask(id, data);
}

export async function CreateTask(task: TodoData) {
  const newTask = await createTodo(task);
}

export default function Todo({ todos }: TodoProps) {
  const [selectedPriority, setSelectedPriority] = useState("");

  const handlePrioritySelection = (selectedPriority: string) => {
    setSelectedPriority(selectedPriority);
  };

  return (
    <>
      <Sidebar username="Puneet" />
      <Flex
        flexDirection="column"
        width="100wh"
        height="100vh"
        backgroundColor="gray.200"
        justifyContent="start"
        alignItems="center"
      >
        <Heading size="lg" as="h3">
          Todos
        </Heading>
        <Box>
          <NewTask CreateTask={CreateTask} />
        </Box>
        {/* <Box>
        <PriorityDropdown handlePrioritySelection={handlePrioritySelection} />
      </Box> */}
        <Box mb="2">
          <TodoList
            TodoTaskUpdate={TodoTaskUpdate}
            CheckboxToggle={CheckboxToggle}
            todos={todos}
          />
        </Box>
      </Flex>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  let dueDate: string = "";
  let todos: TodoData[] = [];
  try {
    if (ctx.query.filter === "all") {
      todos = await getTodos();
    } else if (ctx.query.filter === "next7") {
      //do something
      // add 7 days to current date and then add 5 hr 30 min offset for indian time then set the date in yyyy-mm-dd format
      dueDate = new Date(Date.now() + 19800000 + 604800000)
        .toISOString()
        .split("T")[0];
      // console.log("7 days? -> ", dueDate);
      todos = await getTodosByDueDate(dueDate);
    } else if (
      ctx.query.filter === "today" ||
      ctx.query.dueDate !== undefined ||
      Object.keys(ctx.query).length === 0
    ) {
      dueDate = new Date(Date.now() + 19800000).toISOString().split("T")[0]; // setting the date in yyyy-mm-dd format and adding a 5 hr 30 min offset for indian time
      todos = await getTodosByDueDate(dueDate as string);
      let newTodos;
      if (todos.length > 0 && todos !== undefined && todos !== null) {
        newTodos = todos.filter((todo) => {
          if (todo.dueDate.toString().split("T")[0] === dueDate) {
            return todo;
          }
        });
      }
      if (newTodos !== undefined && newTodos !== null) {
        todos = newTodos;
      }
    } else {
      todos = await getTodos();
    }
    return {
      props: {
        todos,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        todos: [],
      },
    };
  }
};
