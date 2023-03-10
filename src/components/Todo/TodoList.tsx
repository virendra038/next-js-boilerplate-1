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
  Stack,
  Thead,
  TableCaption,
  Heading,
  Flex,
  Button,
} from "@chakra-ui/react";
import type { TodoData } from "@/types/todo.type";
import React, { useState } from "react";

interface TodosProps {
  todos: TodoData[];
  CheckboxToggle: (id: string) => void;
  TodoTaskUpdate: (id: string, data: string) => void;
}

const handleTodoDoubleClick = () => {
  console.log("double clicked");
  //send redirect req to the specific todo page
};

export default function TodoList({
  todos: initialTodos,
  CheckboxToggle,
  TodoTaskUpdate,
}: TodosProps) {
  const [todos, setTodos] = useState<TodoData[]>(initialTodos);

  const handleCheckboxClick = async (id: string) => {
    //send put req to toggle the done property of the todo
    try {
      CheckboxToggle(id);
      const updatedTodos = todos.map((todo) => {
        if (todo._id.toString() === id) {
          return { ...todo, done: !todo.done };
        }
        return todo;
      });
      setTodos(updatedTodos);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddTodoClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log("add todo clicked");
    console.log(e)
    //send redirect req to the specific todo page
  };

  const handleInputUpdate = async (id: string, data: string) => {
    // console.log(data);
    //send put req to update the task property of the todo
    try {
      TodoTaskUpdate(id, data);
      const updatedTodos = todos.map((todo) => {
        if (todo._id.toString() === id) {
          return { ...todo, task: data };
        }
        return todo;
      });
      setTodos(updatedTodos);
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
                      onDoubleClick={handleTodoDoubleClick}
                      onSubmit={(data) =>
                        handleInputUpdate(todo._id.toString(), data)
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
                      outline={todo.done ? "none" : "2px solid red"}
                      isChecked={todo.done}
                      onChange={(e) => {
                        handleCheckboxClick(todo._id.toString());
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
          {/* <TableCaption>
            <Button colorScheme="purple" onClick={(e) => handleAddTodoClick(e)}>Add Todo</Button>
          </TableCaption> */}
      </Table>
    </TableContainer>
  );
}
