import { Text } from "@chakra-ui/react";
import ErrorContainer from "./components/ErrorContainer";

// Page for when the user attempts to access a nonexistent page
const NotFoundPage = () => {
  return (
    <ErrorContainer>
      <Text>This page does not exist.</Text>
    </ErrorContainer>
  )
};

export default NotFoundPage;
