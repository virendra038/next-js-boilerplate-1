import {
  Editable,
  EditableInput,
  EditablePreview,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Tr,
  Checkbox,
  Stack,
} from "@chakra-ui/react";

interface TodosProps {
  todos: string[] | [];
}

export default function TodoList({ todos }: TodosProps) {
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
                      <Editable defaultValue={todo}>
                        <EditablePreview />
                        <EditableInput />
                      </Editable>
                      <Checkbox
                      /*onClick={mark the todo done and send req on backend}*/
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
