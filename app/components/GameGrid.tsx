"use client";

import { SimpleGrid, Spinner, Text } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import useGames from "../hooks/useGames";
import useWishlistIds from "../hooks/useWishlistIds";
import GameCard from "./GameCard";
import GameCardContainer from "./GameCardContainer";
import GameCardSkeleton from "./GameCardSkeleton";

/**
 * A grid displaying games fetched from the API.
 * This component fetches and displays a grid of games. It utilizes infinite scroll
 * to load more games as the user scrolls down. It also shows loading spinners
 * while fetching data and skeleton placeholders for game cards while loading.
 */
const GameGrid = () => {
  // Fetch games data from the RAWG API
  const { data, error, isLoading, fetchNextPage, hasNextPage } = useGames();
  const skeletons = [1, 2, 3, 4, 5, 6]; // Skeletons for loading state

  const { status } = useSession();

  // Fetch wishlist game IDs for the authenticated user
  const { data: wishlistGamesIds } =
    useWishlistIds(status);

  if (error) return <Text>{error.message}</Text>;

  // total number of games we have fetched so far
  const fetchedGamesCount =
    data?.pages.reduce((total, page) => total + page.results.length, 0) || 0;

  return (
    <>
      <InfiniteScroll
        dataLength={fetchedGamesCount}
        hasMore={!!hasNextPage}
        next={() => fetchNextPage()}
        loader={<Spinner />}
      >
        {/* Display grid of games */}
        <SimpleGrid
          columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
          spacing={6}
          padding="10px"
        >
          {/* Display skeletons while loading */}
          {/* Display GameCards when data is available */}
          {isLoading
            ? skeletons.map((skeleton) => (
                <GameCardContainer key={skeleton}>
                  <GameCardSkeleton />
                </GameCardContainer>
              ))
            : data?.pages.map((page, index) => (
                <React.Fragment key={index}>
                  {page.results.map((game) => (
                    <GameCardContainer key={game.id}>
                      <GameCard
                        game={game}
                        isOnWishlist={
                          !!wishlistGamesIds?.includes(String(game.id))
                        }
                        status={status}
                      />
                    </GameCardContainer>
                  ))}
                </React.Fragment>
              ))}
        </SimpleGrid>
      </InfiniteScroll>
    </>
  );
};

export default GameGrid;
