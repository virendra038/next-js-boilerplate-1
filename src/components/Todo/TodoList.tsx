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
} from "@chakra-ui/react";
import type { TodoData } from "@/types/todo.type";
import { useState } from "react";

interface TodosProps {
  todos: TodoData[];
  CheckboxToggle: (id: string) => void;
}

const handleInputUpdate = () => {
  console.log("input updated");
  //send put req to update the task property of the todo
};

const handleTodoDoubleClick = () => {
  console.log("double clicked");
  //send redirect req to the specific todo page
};

export default function TodoList({
  todos: initialTodos,
  CheckboxToggle,
}: TodosProps) {
  const [todos, setTodos] = useState<TodoData[]>(initialTodos);

  const handleCheckboxClick = async (id: string) => {
    //send put req to toggle the done property of the todo
    try {
      await CheckboxToggle(id);
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

  return (
    <TableContainer>
      <Table variant="simple">
        <TableCaption>Todos</TableCaption>
        <Thead>
          <Tr>
            <Td>Task</Td>
            <Td>Priority</Td>
            <Td>Due Date</Td>
            <Td>Status</Td>
          </Tr>
        </Thead>
        <Tbody>
          {todos.length > 0 ? (
            todos.map((todo, index) => {
              return (
                <Tr key={index}>
                  <Td>
                    <Editable
                      defaultValue={todo.task}
                      onDoubleClick={handleTodoDoubleClick}
                    >
                      <EditablePreview
                        style={{
                          color: todo.done ? "green" : "red",
                          textDecoration: todo.done ? "line-through" : "none",
                        }}
                      />
                      <EditableInput onInput={handleInputUpdate} />
                    </Editable>
                  </Td>
                  <Td>{todo.priority}</Td>
                  <Td>{todo.dueDate.toString().split("T")[0]}</Td>
                  <Td>
                    <Checkbox
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
      </Table>
    </TableContainer>
  );
}
