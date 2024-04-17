"use client";

import { Box, Text } from "@chakra-ui/react";
import { Game } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import WishlistTable from "./WishlistTable";

const WishlistPage = () => {
  const { status, data: session } = useSession();

  // Use the useQuery hook consistently regardless of the authentication status.
  const {
    data: games,
    isLoading,
    error,
  } = useQuery<Game[]>({
    queryKey: ["games"],
    queryFn: () => axios.get<Game[]>("/api/wishlist").then((res) => res.data),
    // Enable fetching only if the user is authenticated.
    enabled: status === "authenticated",
  });

  if (status === "loading") return <Text>Loading session...</Text>;

  if (!session) {
    return (
      <Box>
        <Text>You are not signed in</Text>
        <Link href="api/auth/signin">Sign in</Link>
      </Box>
    );
  }

  if (isLoading) return <Text>Loading wishlist...</Text>;

  if (error) return <Text>Error loading games.</Text>;

  if (!games) return <Text>Wishlist Not Found</Text>;

  return (
    <>
      <WishlistTable games={games} />
    </>
  );
};

export default WishlistPage;
