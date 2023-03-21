import { Box, Button, Flex, Link, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { useRouter } from "next/router";

interface SidebarProps {
  username: string;
  activeFilter: string;
  handleRefresh: (filter: string) => void;
  setActiveFilter: (filter: string) => void;
}

export default function Sidebar({
  username,
  activeFilter,
  handleRefresh,
  setActiveFilter,
}: SidebarProps) {
  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
    handleRefresh(filter);
  };

  const router = useRouter();

  useEffect(() => {
    const filter = router.query.filter;
    if (filter) {
      setActiveFilter(filter as string);
      handleRefresh(filter as string);
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
        <Link
          // href="/todo?filter=all"
          variant={activeFilter === "all" ? "solid" : "ghost"}
          colorScheme={activeFilter === "all" ? "blue" : undefined}
          onClick={() => {
            handleFilterClick("all");
            router.push("/todo?filter=all", undefined, { shallow: true });
            router.replace(router.asPath);
          }}
          w="100%"
        >
          All Tasks
          {/* <Button
            variant={activeFilter === "all" ? "solid" : "ghost"}
            colorScheme={activeFilter === "all" ? "blue" : undefined}
            onClick={() => {
              handleFilterClick("all");
            }}
            w="100%"
          >
            All tasks
          </Button> */}
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
