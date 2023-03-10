import TodoList from "@/components/Todo/TodoList";
import {
  getTodos,
  getTodosByDueDate,
  updateTodo,
  updateTodoTask,
} from "@/services/todo.service";
import type { TodoData } from "@/types/todo.type";
import type { GetServerSideProps } from "next";
import { markTodoAsDone } from "@/services/todo.service";
import { Box, Button, Flex, Heading } from "@chakra-ui/react";

interface TodoProps {
  todos: TodoData[];
}

async function CheckboxToggle(id: string) {
  await markTodoAsDone(id);
}

async function TodoTaskUpdate(id: string, data: string) {
  await updateTodoTask(id, data);
}

export default function Todo({ todos }: TodoProps) {
  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="gray.200"
      justifyContent="center"
      alignItems="center"
    >
      <Heading size="lg" as="h3">
        Todos
      </Heading>
      <Box minW={{ base: "90%", md: "468px" }} mb="2">
        <TodoList
          TodoTaskUpdate={TodoTaskUpdate}
          CheckboxToggle={CheckboxToggle}
          todos={todos}
        />
      </Box>
      <Box>
        <Button colorScheme="purple">
          Add Todo
        </Button>
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
