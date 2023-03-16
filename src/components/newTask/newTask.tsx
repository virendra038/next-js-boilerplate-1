import {
  FormControl,
  InputGroup,
  Input,
  Button,
  FormErrorMessage,
  Box,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import PriorityDropdown from "@/components/priorityDropdown/priorityDropdown";
import { TodoData } from "@/types/todo.type";

interface NewTaskProps {
  CreateTask: (task: TodoData) => void;
}

export default function NewTask({ CreateTask }: NewTaskProps) {
  const [newTask, setNewTask] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [isError, setIsError] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState("High");
  const [dueDate, setDueDate] = useState("");
  const toast = useToast();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedPriority(selectedPriority);
    setNewTask(e.target.value);
    if (e.target.value.length > 0) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };

  const handlePrioritySelection = (selectedPriority: string) => {
    setSelectedPriority(selectedPriority);
  };

  const handleAddTask = async () => {
    if (newTask.length > 0 && selectedPriority.length > 0) {
      const task = {
        task: newTask,
        priority: selectedPriority,
        dueDate: dueDate,
        done: false, // setting false by default
      };
      setIsError(false);
      setIsDisabled(true);
      //send post req to add the new task
      CreateTask(task);
      toast({
        title: "Todo created.",
        description: "We've created the todo for you.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } else if (newTask.length! > 0) {
      toast({
        title: "Invalid.",
        description: "Please enter a valid task.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } else {
      setIsError(true);
      // setIsDisabled(true);
    }
  };

  const backDateToast = () => {
    toast({
      title: "Invalid date.",
      description: "Due date cannot be set to a past date.",
      status: "error",
      duration: 3000,
      isClosable: true,
    });
    setDueDate(new Date().toLocaleDateString());
  };

  return (
    <Box>
      <FormControl isInvalid={isError}>
        <InputGroup
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Input
            type="date"
            defaultValue={new Date().toISOString().slice(0, 10)}
            onChange={(e) => {
              // due date cannot be set to past date
              if (new Date(e.target.value).getDate() < new Date().getDate()) {
                backDateToast();
                return;
              }
              setDueDate(e.target.value);
            }}
          />
          <PriorityDropdown handlePrioritySelection={handlePrioritySelection} />
          <Input
            type="text"
            placeholder="+Add a new task"
            onChange={handleInput}
          />
          <Button
            minW="4.5rem"
            h="1.75rem"
            // size="sm"
            onClick={handleAddTask}
          >
            Add
          </Button>
        </InputGroup>
        <FormErrorMessage>
          {isError ? "Please enter a task " : ""}
        </FormErrorMessage>
      </FormControl>
    </Box>
  );
}
