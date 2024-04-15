// app/providers.tsx
"use client";

import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import theme from "../theme";
import AuthProvider from "../auth/Provider";

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <AuthProvider>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          {children}
          <ReactQueryDevtools />
        </AuthProvider>
      </ChakraProvider>
    </QueryClientProvider>
  );
}
