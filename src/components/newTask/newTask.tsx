// import {
//   FormControl,
//   InputGroup,
//   InputLeftElement,
//   Input,
//   InputRightElement,
//   Button,
//   FormErrorMessage,
//   Box,
// } from "@chakra-ui/react";
// import { useState } from "react";
// import { FaPlus } from "react-icons/fa";

// export default function NewTask(CreateTask: any) {
//   const [newTask, setNewTask] = useState("");
//   const [isDisabled, setIsDisabled] = useState(true);
//   const [isError, setIsError] = useState(false);

//   const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setNewTask(e.target.value);
//     if (e.target.value.length > 0) {
//       setIsDisabled(false);
//     } else {
//       setIsDisabled(true);
//     }
//   };

//   const handleAddTask = () => {
//     console.log("new task - ", newTask);
//     if (newTask.length > 0) {
//       setIsError(false);
//       //send post req to add the new task
//     } else {
//       setIsError(true);
//     }
//   };

//   return (
//     <Box>
//       <FormControl isInvalid={isError}>
//         <InputGroup>
//           <InputLeftElement
//             pointerEvents="none"
//             children={<FaPlus color="gray.300" />}
//           />
//           <Input
//             type="text"
//             placeholder="Add a new task"
//             onChange={handleInput}
//           />
//           <InputRightElement width="4.5rem">
//             <Button
//               h="1.75rem"
//               size="sm"
//               onClick={handleAddTask}
//               disabled={isDisabled}
//             >
//               Add
//             </Button>
//           </InputRightElement>
//         </InputGroup>
//         <FormErrorMessage>
//           {isError ? "Please enter a task" : ""}
//         </FormErrorMessage>
//       </FormControl>
//     </Box>
//   );
// }

import {
  FormControl,
  InputGroup,
  InputLeftElement,
  Input,
  Button,
  FormErrorMessage,
  Box,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import PriorityDropdown from "@/components/priorityDropdown/priorityDropdown";
import { TodoData } from "@/types/todo.type";

interface NewTaskProps {
  CreateTask: (task: TodoData) => void;
}

export default function NewTask({ CreateTask }: NewTaskProps) {
  const [newTask, setNewTask] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [isError, setIsError] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState("");
  const [dueDate, setDueDate] = useState("");

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
    } else {
      setIsError(true);
      // setIsDisabled(true);
    }
  };

  return (
    <Box>
      <FormControl isInvalid={isError}>
        <InputGroup style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
          <Input
            type="date"
            onChange={(e) => {
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
          {isError
            ? "Please enter a task and select a priority and select a date "
            : ""}
        </FormErrorMessage>
      </FormControl>
    </Box>
  );
}
