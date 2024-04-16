'use client'

import { Box, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const WishlistPage = () => {
  const { status, data: session } = useSession();

  if (status === "loading") return <Text>Loading...</Text>;

  if (!session) {
    return (
      <Box>
        <Text>You are not signed in</Text>
        <Link href="api/auth/signin">Sign in</Link>
      </Box>
    );
  }

  return (
    <Text>Wishlist Page</Text>
  )
};

export default WishlistPage;
