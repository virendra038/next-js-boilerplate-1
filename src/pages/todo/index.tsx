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
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  let dueDate =
    ctx.query.dueDate ??
    new Date(Date.now() + 19800000).toISOString().split("T")[0]; // setting the date in yyyy-mm-dd format and adding a 5 hr 30 min offset for indian time
  let todos: TodoData[] = [];
  try {
    if (!dueDate) {
      todos = await getTodos();
      return {
        props: {
          todos,
        },
      };
    }
    todos = await getTodosByDueDate(dueDate as string);
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
