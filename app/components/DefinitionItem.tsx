import { Box, Heading } from "@chakra-ui/react";
import { ReactNode } from "react";

interface Props {
  term: string;
  children: ReactNode | ReactNode[];
}

const DefinitionItem = ({ term, children }: Props) => {
  return (
    <Box marginY={5}>
      {/* Render the definition term */}
      <Heading as="dt" fontSize="md" color="gray.600">
        {term}
      </Heading>
      {/* Render the corresponding definition details */}
      <dd>
        {children}
      </dd>
    </Box>
  );
};

export default DefinitionItem;
