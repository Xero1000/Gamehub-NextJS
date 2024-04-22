"use client";

import { SimpleGrid, Spinner, Text } from "@chakra-ui/react";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import useGames from "../hooks/useGames";
import GameCard from "./GameCard";
import GameCardContainer from "./GameCardContainer";
import GameCardSkeleton from "./GameCardSkeleton";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import useWishlistIds from "../hooks/useWishlistIds";

const GameGrid = () => {
  const queryClient = useQueryClient(); // Access the query client to handle refetching
  
  const { data, error, isLoading, fetchNextPage, hasNextPage } = useGames();
  const skeletons = [1, 2, 3, 4, 5, 6];

  const { status } = useSession();

  const { data: wishlistGamesIds, isLoading: wishlistLoading } = useWishlistIds(status)

  const deleteMutation = useMutation(
    (gameId: string) => {
      return axios.delete(`/api/wishlist/${gameId}`);
    },
    {
      onSuccess: () => {
        // Optionally refetch wishlist data after deletion
        queryClient.invalidateQueries(["wishlist"]);
      },
      onError: (error) => {
        // Handle error case
        console.error("Error deleting game from wishlist:", error);
      },
    }
  );

  const handleRemove = (gameId: string) => {
    deleteMutation.mutate(gameId);
  };

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
        <SimpleGrid
          columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
          spacing={6}
          padding="10px"
        >
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
                        handleRemove={handleRemove}
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
