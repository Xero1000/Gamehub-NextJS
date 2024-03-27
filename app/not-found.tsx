import { Box, Heading, Text } from "@chakra-ui/react";
import React from "react";
import ErrorContainer from "./components/ErrorContainer";

const NotFoundPage = () => {
  return (
    <ErrorContainer>
      <Text>This page does not exist.</Text>
    </ErrorContainer>
  )
};

export default NotFoundPage;
