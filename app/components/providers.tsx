"use client";

import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import theme from "../theme";
import AuthProvider from "../auth/Provider";
import ErrorContextProvider from "../state-management/providers/ErrorContextProvider";

const queryClient = new QueryClient(); // Initialize React Query client

/**
 * Providers component wraps its children with various context providers,
 * managing theming, query state, authentication, and error contexts.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <AuthProvider>
          <ErrorContextProvider>
            <ColorModeScript initialColorMode={theme.config.initialColorMode} />
            {children}
            <ReactQueryDevtools />
          </ErrorContextProvider>
        </AuthProvider>
      </ChakraProvider>
    </QueryClientProvider>
  );
}
