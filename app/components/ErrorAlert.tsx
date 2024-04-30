"use client";

import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  CloseButton,
} from "@chakra-ui/react";
import { SlideFade } from "@chakra-ui/transition";
import { useContext, useState } from "react";
import errorContext from "../state-management/contexts/errorContext";

/**
 * Alert box that occurs if a user tries and fails to add 
 * or remove a game from the wishlist.
 */
const ErrorAlert = () => {
  const { errorOccured, setErrorOccured, message, setMessage } =
    useContext(errorContext);

  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  return (
    <Box
      position="fixed"
      top="120px"
      left="50%"
      transform="translate(-50%, -50%)"
      maxWidth="380px"
      zIndex={1}
    >
      <SlideFade in={errorOccured} offsetY="-20px">
         {/* Display error alert with custom styles */}
        <Alert status="error" variant="subtle" backgroundColor="red.700" shadow="customDark" borderRadius={6}>
          <AlertIcon />
          <Box>
            <AlertTitle>Error!</AlertTitle>
            <AlertDescription>{message}</AlertDescription>
          </Box>
          {/* Close button to hide alert and reset error state */}
          <CloseButton
            alignSelf="flex-start"
            position="relative"
            right={-1}
            top={-1}
            onClick={() => {
              setErrorOccured(false);
              const id = setTimeout(() => {
                setMessage("");
              }, 1000);
              setTimeoutId(id);
            }}
          />
        </Alert>
      </SlideFade>
    </Box>
  );
};

export default ErrorAlert;
