// app/providers.tsx
"use client";

import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import theme from "./theme";
import { QueryClient, QueryClientProvider as ReactQueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReactQueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        {children}
      </ChakraProvider>
    </ReactQueryClientProvider>
  );
}
