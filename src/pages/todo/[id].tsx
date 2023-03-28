import TodoList from "@/components/Todo/TodoList";
import type { TodoData } from "@/types/todo.type";
import { Flex, Heading, Button, Box, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import Sidebar from "@/components/sideNav/sideNav";
import { useTodos } from "@/hooks/todos";
import { useTodoById } from "@/hooks/todoById";

export default function Todo() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState("today");
  const toast = useToast();
  let todos: TodoData[] = [];

  const { todo } = useTodoById(router.query.id as string);
  if (todo == undefined) {
    return <div>Loading...</div>;
  } else {
    todos.push(todo);
  }

  const {
    updateTodoTask,
    markTodoAsDone,
    mutate: refresh,
  } = useTodos(activeFilter);

  const TodoTaskUpdate = async (id: string, data: string) => {
    const res = await updateTodoTask(id, data);
    if (res.data && res.error === null) {
      toast({
        title: "Task updated.",
        description: "We've updated the todo task for you.",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    } else if (res.error !== null) {
      toast({
        title: "Error.",
        description: res.error,
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  const CheckboxToggle = async (id: string, isDone: boolean) => {
    const res = await markTodoAsDone(id, isDone);
    if (res.data && res.error === null) {
      toast({
        title: "Todo updated.",
        description: "We've updated the todo for you.",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    } else if (res.error !== null) {
      toast({
        title: "Error.",
        description: res.error,
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  return (
    <>
      <Sidebar
        username="Puneet"
        activeFilter={activeFilter}
        handleRefresh={refresh}
        setActiveFilter={setActiveFilter}
        router={router}
      />
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
        {/* <Box>
          <NewTask CreateTask={CreateTask} />
        </Box> */}
        <Box minW={{ base: "90%", md: "468px" }} mb="2">
          <TodoList
            TodoTaskUpdate={TodoTaskUpdate}
            CheckboxToggle={CheckboxToggle}
            todos={todos}
            handleRefresh={refresh}
          />
        </Box>
      </Flex>
    </>
  );
}
