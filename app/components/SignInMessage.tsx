import { Button, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";

/**
 * Message with login link when user attempts to access 
 * a page that requires them to be logged in.
 */
const SignInMessage = () => {
  return (
    <Flex flexDirection="column" align="center">
      <Text py={5}>You are not signed in</Text>
      <Link href="/api/auth/signin">
        <Button colorScheme="green">Sign In</Button>
      </Link>
    </Flex>
  );
};

export default SignInMessage;
