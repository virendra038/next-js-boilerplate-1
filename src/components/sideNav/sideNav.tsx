import { Box, Button, Flex, Link, Text } from "@chakra-ui/react";
import { useState } from "react";
import { FaUser } from "react-icons/fa";

interface SidebarProps {
  username: string;
}

export default function Sidebar({ username }: SidebarProps) {
  const [activeFilter, setActiveFilter] = useState("all");

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
  };

  return (
    <Box
      w="16rem"
      h="100%"
      bg="gray.100"
      p="1rem"
      position="fixed"
      top="0"
      left="0"
    >
      <Flex align="center" mb="2rem">
        <Box mr="1rem">
          <FaUser size="1.5rem" />
        </Box>
        <Text>{username}</Text>
      </Flex>
      <Box mb="2rem">
        <Link href="/todo?filter=all">
          <Button
            variant={activeFilter === "all" ? "solid" : "ghost"}
            colorScheme={activeFilter === "all" ? "blue" : undefined}
            onClick={() => {
              // setActiveFilter("all");
              handleFilterClick("all");
            }}
            w="100%"
          >
            All tasks
          </Button>
        </Link>
        <Link href="/todo?filter=today">
          <Button
            variant={activeFilter === "today" ? "solid" : "ghost"}
            colorScheme={activeFilter === "today" ? "blue" : undefined}
            onClick={() => {
              // setActiveFilter("today");
              handleFilterClick("today");
            }}
            mt="0.5rem"
            w="100%"
          >
            Today
          </Button>
        </Link>
        <Link href="/todo?filter=next7">
          <Button
            variant={activeFilter === "next7" ? "solid" : "ghost"}
            colorScheme={activeFilter === "next7" ? "blue" : undefined}
            onClick={() => {
              // setActiveFilter("next7");
              handleFilterClick("next7");
            }}
            mt="0.5rem"
            w="100%"
          >
            Next 7 days
          </Button>
        </Link>
      </Box>
    </Box>
  );
}
