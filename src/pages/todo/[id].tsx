import TodoList from "@/components/Todo/TodoList";
import { getTodobyId, updateTodoTask } from "@/services/todo.service";
import type { TodoData } from "@/types/todo.type";
import { GetServerSideProps } from "next";
import { markTodoAsDone } from "@/services/todo.service";
import { Flex, Heading, Button, Box } from "@chakra-ui/react";

async function CheckboxToggle(id: string) {
  await markTodoAsDone(id);
}

async function TodoTaskUpdate(id: string, data: string) {
  await updateTodoTask(id, data);
}

export default function Todo(todo: TodoData) {
  let todos = [];
  todos.push(todo);
  return (
    // <TodoList
    //   TodoTaskUpdate={TodoTaskUpdate}
    //   CheckboxToggle={CheckboxToggle}
    //   todos={todos}
    // />
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="gray.200"
      justifyContent="center"
      alignItems="center"
    >
      <Heading size="lg" as="h3">
        Todo
      </Heading>
      <Box minW={{ base: "90%", md: "468px" }} mb="2">
        <TodoList
          TodoTaskUpdate={TodoTaskUpdate}
          CheckboxToggle={CheckboxToggle}
          todos={todos}
        />
      </Box>
      <Box>
        <Button colorScheme="purple">Add Todo</Button>
      </Box>
    </Flex>
  );
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
