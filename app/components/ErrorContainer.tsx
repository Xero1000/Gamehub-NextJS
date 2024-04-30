import { Box, Heading } from "@chakra-ui/react";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

/**
 * Error message that will appear if an error occurs 
 * while fetching a page.
 * The heading will be the same for all the errors
 */
const ErrorContainer = ({ children }: Props) => {
  return (
    <Box>
      <Heading>Oops</Heading>
      {children}
    </Box>
  );
};

export default ErrorContainer;
