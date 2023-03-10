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
        <Tbody>
          {todos.length > 0 ? (
            todos.map((todo, index) => {
              return (
                <Tr key={index}>
                  <Td>
                    <Stack direction={"row"} justifyContent="space-between">
                      <Editable
                        defaultValue={todo.task}
                        onDoubleClick={handleTodoDoubleClick}
                      >
                        <EditablePreview />
                        <EditableInput onInput={handleInputUpdate} />
                      </Editable>
                      <Checkbox
                        isChecked={todo.done}
                        onChange={(e) => {
                          handleCheckboxClick(todo._id.toString());
                        }} /*onClick={mark the todo done and send req on backend}*/
                      />
                    </Stack>
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
