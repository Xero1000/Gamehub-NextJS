"use client";

import { Box, Heading, Text } from "@chakra-ui/react";
import { Game } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import WishlistTable from "./WishlistTable";
import SortSelector from "./SortSelector";

interface Props {
  searchParams: { sortOrder: string };
}

const WishlistPage = ({ searchParams: { sortOrder } }: Props) => {
  const { status, data: session } = useSession();

  // Use the useQuery hook consistently regardless of the authentication status.
  const {
    data: games,
    isLoading,
    error,
  } = useQuery<Game[]>({
    queryKey: ["wishlist"],
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
      <Box maxWidth={{ base: "100%", lg: "80%", xl: "60%" }} marginX="auto">
        <Box marginX={5}>
          <Heading>{`${session.user?.name}'s Wishlist`}</Heading>
          <SortSelector />
        </Box>
        {games.length > 0 ? (
          <WishlistTable games={games} sortOrder={sortOrder} />
        ) : (
          <Text marginX={5} fontSize="xl">
            Wishlist is Empty
          </Text>
        )}
      </Box>
    </>
  );
};

export default WishlistPage;
