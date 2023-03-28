import TodoList from "@/components/Todo/TodoList";
import { Box, Flex, Heading, Toast, useToast } from "@chakra-ui/react";
import NewTask from "@/components/newTask/newTask";
import { useState } from "react";
import Sidebar from "@/components/sideNav/sideNav";
import { useRouter } from "next/router";
import { useTodos } from "@/hooks/todos";
import { TodoData } from "@/types/todo.type";

export default function Todo() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState("today");
  const toast = useToast();

  const {
    todos,
    isLoading,
    markTodoAsDone,
    updateTodoTask,
    createTodo,
    mutate: refresh,
    isError,
  } = useTodos(activeFilter);

  if (todos === undefined || isLoading) {
    return <div>Loading...</div>;
  }

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

  const CreateTask = async (task: TodoData) => {
    const res = await createTodo(task);
    //toast
    if (res.data && res.error === null) {
      toast({
        title: "Todo created.",
        description: "We've created the todo for you.",
        status: "success",
        duration: 2000,
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
        justifyContent="start"
        alignItems="center"
      >
        <Heading size="lg" as="h3">
          Todos
        </Heading>
        <Box>
          <NewTask CreateTask={CreateTask} />
        </Box>
        <Box mb="2">
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
