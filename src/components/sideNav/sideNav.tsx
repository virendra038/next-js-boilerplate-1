import { Box, Button, Flex, Link, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { FaUser } from "react-icons/fa";
import type { NextRouter } from "next/router";

interface SidebarProps {
  username: string;
  activeFilter: string;
  // handleRefresh: (filter: string) => void;
  handleRefresh: () => void;
  setActiveFilter: (filter: string) => void;
  router: NextRouter;
}

export default function Sidebar({
  username,
  activeFilter,
  handleRefresh,
  setActiveFilter,
  router,
}: SidebarProps) {
  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);

    router.push(`?filter=${filter}`);
    // handleRefresh();
  };

  // const router = useRouter();

  useEffect(() => {
    const filter = router.query.filter;
    if (filter) {
      setActiveFilter(filter as string);
      handleRefresh();
      // router.push(`?filter=${filter}`);
      // router.replace(router.asPath);
    }
  }, [router.query.filter]);

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
        <Button
          variant={activeFilter === "all" ? "solid" : "ghost"}
          colorScheme={activeFilter === "all" ? "blue" : undefined}
          onClick={() => {
            handleFilterClick("all");
          }}
          mt="0.5rem"
          w="100%"
        >
          All Tasks
        </Button>
        <Button
          variant={activeFilter === "today" ? "solid" : "ghost"}
          colorScheme={activeFilter === "today" ? "blue" : undefined}
          onClick={() => {
            handleFilterClick("today");
          }}
          mt="0.5rem"
          w="100%"
        >
          Today
        </Button>
        <Button
          variant={activeFilter === "next7" ? "solid" : "ghost"}
          colorScheme={activeFilter === "next7" ? "blue" : undefined}
          onClick={() => {
            handleFilterClick("next7");
          }}
          mt="0.5rem"
          w="100%"
        >
          Next 7 days
        </Button>
      </Box>
    </Box>
  );
}
