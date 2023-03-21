import TodoList from "@/components/Todo/TodoList";
import { getTodobyId, updateTodoTask } from "@/services/todo.service";
import type { TodoData } from "@/types/todo.type";
import { GetServerSideProps } from "next";
import { markTodoAsDone } from "@/services/todo.service";
import { Flex, Heading, Button, Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import GetBaseUrl from "@/utils/baseUrl";
import Sidebar from "@/components/sideNav/sideNav";
// import NewTask from "@/components/newTask/newTask";
// import { CreateTask } from "./index";

async function CheckboxToggle(id: string) {
  await markTodoAsDone("", id);
}

async function TodoTaskUpdate(id: string, data: string) {
  await updateTodoTask("", id, data);
}

export default function Todo(todo: TodoData) {
  const [todos, setTodos] = useState([todo]);
  const [activeFilter, setActiveFilter] = useState("today");
  const router = useRouter();

  const handleRefresh = () => {
    // setIsRefreshing(true);
    // setActiveFilter(filter);
    router.replace(router.asPath);
  };

  return (
    <>
      <Sidebar
        username="Puneet"
        activeFilter={activeFilter}
        handleRefresh={handleRefresh}
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
          <NewTask CreateTask={CreateTask} handleRefresh={handleRefresh} />
        </Box> */}
        <Box minW={{ base: "90%", md: "468px" }} mb="2">
          <TodoList
            TodoTaskUpdate={TodoTaskUpdate}
            CheckboxToggle={CheckboxToggle}
            todos={todos}
            setTodos={setTodos}
            handleRefresh={handleRefresh}
          />
        </Box>
      </Flex>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  let todo: TodoData;
  const id = ctx.params!.id;
  const baseUrl = GetBaseUrl(ctx) as string;

  if (!id || Array.isArray(id)) {
    return {
      notFound: true,
    };
  }
  try {
    todo = await getTodobyId(baseUrl, id);
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
