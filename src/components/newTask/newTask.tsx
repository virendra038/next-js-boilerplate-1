import {
  Input,
  Button,
  Box,
  useToast,
  Card,
  CardHeader,
  CardBody,
  Stack,
  StackDivider,
  Heading,
  useBreakpointValue,
} from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";
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
  const [dueDate, setDueDate] = useState(
    new Date(Date.now() + 19800000).toISOString().slice(0, 10)
  ); // ESY-1636 due date was not set correctly so fixed it
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
    } else if (newTask.length > 0) {
      setIsError(true);
      toast({
        title: "Invalid.",
        description: "Please enter a valid task.",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top-right",
      });
    } else {
      setIsError(true);
      toast({
        title: "Invalid.",
        description: "Invalid Data",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top-right",
      });
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
      position: "top-right",
    });
    setDueDate(new Date().toLocaleDateString());
  };
  // const displayDirection = useBreakpointValue({ base: "column", md: "row" });

  return (
    <Card align="center" variant="elevated" size="sm">
      <CardHeader>
        <Heading size="md">Add Todo</Heading>
      </CardHeader>
      <CardBody>
        <Stack
          divider={<StackDivider />}
          spacing="4"
          direction="row"
          align="flex-end"
        >
          <Box>
            <Heading size="xs" textTransform="uppercase">
              Select date
            </Heading>
            <Input
              type="date"
              // defaultValue={new Date().toISOString().slice(0, 10)}
              defaultValue={dueDate}
              aria-label="Due Date"
              onChange={(e) => {
                // due date cannot be set to past date
                if (
                  new Date(e.target.value).setHours(0, 0, 0, 0) <
                  new Date().setHours(0, 0, 0, 0)
                ) {
                  backDateToast();
                  return;
                }
                setDueDate(e.target.value);
              }}
            />
          </Box>
          <Box>
            <Heading size="xs" textTransform="uppercase">
              Select Priority
            </Heading>
            <PriorityDropdown
              handlePrioritySelection={handlePrioritySelection}
            />
          </Box>
          <Box>
            <Heading size="xs" textTransform="uppercase">
              Enter Task
            </Heading>
            <Input
              type="text"
              placeholder="+Add a new task"
              onChange={handleInput}
            />
          </Box>
          <Box>
            <Button
              colorScheme="blue"
              minW="4.5rem"
              w="7rem"
              h="2.25rem"
              // size="sm"
              onClick={handleAddTask}
              leftIcon={<FaPlus />}
            >
              Add
            </Button>
          </Box>
        </Stack>
      </CardBody>
    </Card>
  );
}
