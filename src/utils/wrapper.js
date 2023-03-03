import React from "react";
import { ChakraProvider } from "@chakra-ui/react";

export default ThemeWrapper = ({ children }) => (
  <ChakraProvider>{children}</ChakraProvider>
);