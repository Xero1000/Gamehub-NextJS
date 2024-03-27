'use client';
import { Box, Heading, Text } from "@chakra-ui/react";
import React from "react";
import ErrorContainer from "./components/ErrorContainer";

const ErrorPage = () => {
  return (
    <ErrorContainer>
      <Text>An unexpected error occured.</Text>
    </ErrorContainer>
  );
};

export default ErrorPage;