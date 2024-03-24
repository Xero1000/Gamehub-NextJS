"use client";

import { Grid, GridItem, HStack, Show } from "@chakra-ui/react";
import { useState } from "react";
import GameGrid from "./GameGrid";
import GameHeading from "./GameHeading";
import GenreList from "./GenreList";
import NavBar from "./NavBar";
import PlatformSelector from "./PlatformSelector";
import SortSelector from "./SortSelector";

export default function Home() {
  return (
    <main>
      <Grid
        templateAreas={{
          base: `"nav" "main"`,
          lg: `"nav nav" "aside main"`,
        }}
        templateColumns={{
          base: "1fr", // column takes up all available space
          lg: "200px 1fr", // Aside column gets fixed width of 200px, GameGrid gets the rest of available space
        }}
      >
        <GridItem area="nav">
          <NavBar />
        </GridItem>
        <Show above="lg">
          <GridItem area="aside" paddingX={5}>
            <GenreList />
          </GridItem>
        </Show>
        <GridItem area="main" padding={4}>
          <GameHeading />
          <HStack marginBottom={5} spacing={5}>
            <PlatformSelector />
            <SortSelector />
          </HStack>
          <GameGrid />
        </GridItem>
      </Grid>
    </main>
  );
}
