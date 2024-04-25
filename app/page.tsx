import { Box, Grid, GridItem, HStack, Show, SimpleGrid } from "@chakra-ui/react";
import ClearFilters from "./components/ClearFilters";
import ErrorAlert from "./components/ErrorAlert";
import GameGrid from "./components/GameGrid";
import GameHeading from "./components/GameHeading";
import GenreList from "./components/GenreList";
import GenreSelector from "./components/GenreSelector";
import PlatformSelector from "./components/PlatformSelector";
import SortSelector from "./components/SortSelector";

export default function Home() {
  return (
    <main>
      <Grid
        templateAreas={{
          base: `"main"`,
          lg: `"aside main"`,
        }}
        templateColumns={{
          base: "1fr", // column takes up all available space
          lg: "200px 1fr", // Aside column gets fixed width of 200px, GameGrid gets the rest of available space
        }}
      >
        <Show above="lg">
          <GridItem area="aside" paddingX={5}>
            <GenreList />
          </GridItem>
        </Show>
        <GridItem area="main">
          <Box paddingLeft={2}>
            <GameHeading />
            <Show above="lg">
              <HStack marginBottom={5} spacing={5}>
                <PlatformSelector />
                <SortSelector />
                <ClearFilters />
              </HStack>
            </Show>
            <Show below="lg">
              <SimpleGrid columns={2} spacing={5} marginBottom={5}>
                <GenreSelector />
                <PlatformSelector />
                <SortSelector />
                <ClearFilters />
              </SimpleGrid>
            </Show>
          </Box>
          <GameGrid />
        </GridItem>
      </Grid>
    </main>
  );
}
