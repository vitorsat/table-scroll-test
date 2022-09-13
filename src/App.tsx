import { ChakraProvider } from "@chakra-ui/react";

import { Routes } from "./routes";

export function App() {
  return (
    <ChakraProvider>
      <Routes />
    </ChakraProvider>
  );
}
