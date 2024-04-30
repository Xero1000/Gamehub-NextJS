'use client';
import { Text } from "@chakra-ui/react";
import React from "react";
import ErrorContainer from "./components/ErrorContainer";

// Error page for when an error occurs
const ErrorPage = () => {
  return (
    <ErrorContainer>
      <Text>An unexpected error occured.</Text>
    </ErrorContainer>
  );
};

export default ErrorPage;