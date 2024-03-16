'use client'

import { Box, Grid, GridItem, Show } from "@chakra-ui/react";
import NavBar from "./NavBar";
import GameGrid from "./GameGrid";
import GenreList from "./GenreList";
import { useState } from "react";
import { Genre } from "./hooks/useGenres";
import PlatformSelector from "./PlatformSelector";
import { Platform } from "./hooks/usePlatforms";

export default function Home() {
  const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null)
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(null)

  return (
    <main>
      <Grid
        templateAreas={{
          base: `"nav" "main"`,
          lg: `"nav nav" "aside main"`,
        }}
        templateColumns={{
          base: '1fr', // column takes up all available space
          lg: '200px 1fr' // Aside column gets fixed width of 200px, GameGrid gets the rest of available space
        }}
      >
        <GridItem area="nav">
          <NavBar />
        </GridItem>
        <Show above="lg">
          <GridItem area="aside" paddingX={5}>
            <GenreList onSelectGenre={(genre) => setSelectedGenre(genre)} selectedGenre={selectedGenre}/>
          </GridItem>
        </Show>
        <GridItem area="main" padding={4}>
          <Box paddingBottom={3}>
            <PlatformSelector selectedPlatform={selectedPlatform} onSelectPlatform = {(platform) => setSelectedPlatform(platform)}/>
          </Box>
          <GameGrid selectedPlatform={selectedPlatform} selectedGenre={selectedGenre}/>
        </GridItem>
      </Grid>
    </main>
  );
}
