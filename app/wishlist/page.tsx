"use client";

import { Box, Heading, Text } from "@chakra-ui/react";
import { Game } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import WishlistTable from "./WishlistTable";
import SortSelector from "./SortSelector";

// query string parameter for sorting wishlist table
interface Props {
  searchParams: { sortOrder: string };
}

// Page to display a table containing games in a logged in user's wishlist
const WishlistPage = ({ searchParams: { sortOrder } }: Props) => {
  const { status, data: session } = useSession();

  // hook to fetch the games in the user's wishlist
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

  // If the user is not logged in
  if (!session) {
    return (
      <Box>
        <Text>You are not signed in</Text>
        <Link href="api/auth/signin">Sign in</Link>
      </Box>
    );
  }

  // Display messages depending on loading and error status or if no games were found
  if (isLoading) return <Text>Loading wishlist...</Text>;

  if (error) return <Text>Error loading games.</Text>;

  if (!games) return <Text>Wishlist Not Found</Text>;

  return (
    <>
      <Box maxWidth={{ base: "100%", lg: "80%", xl: "60%" }} marginX="auto">
        {/* Heading with logged in user's name */}
        <Box marginX={5}>
          <Heading>{`${session.user?.name}'s Wishlist`}</Heading>
          <SortSelector />
        </Box>
        {/* If wishlist has games, a table showing them is displayed */}
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
