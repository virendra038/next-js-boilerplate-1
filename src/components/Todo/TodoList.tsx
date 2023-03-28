import {
  Editable,
  EditableInput,
  EditablePreview,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tr,
  Checkbox,
  Thead,
  useToast,
} from "@chakra-ui/react";
import type { TodoData } from "@/types/todo.type";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

interface TodosProps {
  todos: TodoData[];
  CheckboxToggle: (id: string, checked: boolean) => void;
  TodoTaskUpdate: (id: string, newTask: string) => void;
  handleRefresh: () => void;
}

const handleTodoDoubleClick = (
  e: React.MouseEvent<HTMLDivElement, MouseEvent>
) => {
  console.log("double clicked");
  //send redirect req to the specific todo page
};

export default function TodoList({
  todos,
  CheckboxToggle,
  TodoTaskUpdate,
  handleRefresh,
}: TodosProps) {
  const toast = useToast();
  // const router = useRouter();

  // useEffect(() => {
  //   router.push(router.asPath);
  // }, [todos]);

  const handleCheckboxClick = async (id: string, checked: boolean) => {
    //send put req to toggle the done property of the todo
    try {
      CheckboxToggle(id, checked);
      const updatedTodos = todos.map((todo) => {
        if (todo._id!.toString() === id) {
          return { ...todo, done: !todo.done };
        }
        return todo;
      });
      // setTodos(updatedTodos);
      // handleRefresh();
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputUpdate = async (
    id: string,
    newTask: string,
    task: string
  ) => {
    //send put req to update the task property of the todo
    try {
      // BugFix checking if the input is empty, if so, show a toast
      if (newTask === "") {
        toast({
          title: "Task cannot be empty.",
          description: "Please enter a valid task.",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
        handleRefresh();
        return;
      } else if (newTask === task) {
        toast({
          title: "Task is the same.",
          description: "Please enter a valid task.",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
        handleRefresh();
        return;
      }
      //Update task call
      TodoTaskUpdate(id, newTask);
      const updatedTodos = todos.map((todo) => {
        if (todo._id!.toString() === id) {
          return { ...todo, task: newTask };
        }
        return todo;
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Td>Task</Td>
            <Td>Priority</Td>
            <Td>Due Date</Td>
            <Td>Status</Td>
          </Tr>
        </Thead>
        <Tbody width="100%" minW={{ base: "1000px" }}>
          {todos.length > 0 ? (
            todos.map((todo, index) => {
              return (
                <Tr key={index}>
                  <Td>
                    <Editable
                      defaultValue={todo.task}
                      onDoubleClick={(e) => {
                        handleTodoDoubleClick(e);
                      }}
                      onSubmit={(newTask) =>
                        handleInputUpdate(
                          todo._id!.toString(),
                          newTask,
                          todo.task
                        )
                      }
                    >
                      <EditablePreview
                        style={{
                          color: todo.done ? "green" : "red",
                          textDecoration: todo.done ? "line-through" : "none",
                        }}
                      />
                      <EditableInput />
                    </Editable>
                  </Td>
                  <Td>{todo.priority}</Td>
                  <Td>{todo.dueDate.toString().split("T")[0]}</Td>
                  <Td>
                    <Checkbox
                      // name={todo.task}
                      aria-label={todo.task}
                      outline={todo.done ? "none" : "2px solid red"}
                      isChecked={todo.done}
                      onChange={(e) => {
                        handleCheckboxClick(
                          todo._id!.toString(),
                          e.target.checked
                        );
                      }} /*onClick={mark the todo done and send req on backend}*/
                    />
                  </Td>
                </Tr>
              );
            })
          ) : (
            <Tr>
              <Td>No Tasks found</Td>
            </Tr>
          )}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
