import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useState } from "react";
import { FaUser } from "react-icons/fa";
// import { useHistory, useLocation } from "react-router-dom";

interface SidebarProps {
  username: string;
}

export default function Sidebar({ username }: SidebarProps) {
  const [activeFilter, setActiveFilter] = useState("all");
//   const location = useLocation();
//   const history = useHistory();

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
    // history.push(`/?filter=${filter}`);
  };

  return (
    <Box w="16rem" h="100%" bg="gray.100" p="1rem" position="fixed" top="0" left="0">
      <Flex align="center" mb="2rem">
        <Box mr="1rem">
          <FaUser size="1.5rem" />
        </Box>
        <Text>{username}</Text>
      </Flex>
      <Box mb="2rem">
        <Button
          variant={activeFilter === "all" ? "solid" : "ghost"}
          colorScheme={activeFilter === "all" ? "blue" : undefined}
          onClick={() => handleFilterClick("all")}
          w="100%"
        >
          All tasks
        </Button>
        <Button
          variant={activeFilter === "today" ? "solid" : "ghost"}
          colorScheme={activeFilter === "today" ? "blue" : undefined}
          onClick={() => handleFilterClick("today")}
          mt="0.5rem"
          w="100%"
        >
          Today
        </Button>
        <Button
          variant={activeFilter === "next7" ? "solid" : "ghost"}
          colorScheme={activeFilter === "next7" ? "blue" : undefined}
          onClick={() => handleFilterClick("next7")}
          mt="0.5rem"
          w="100%"
        >
          Next 7 days
        </Button>
      </Box>
    </Box>
  );
}
