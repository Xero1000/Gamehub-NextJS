import {
  Grid,
  GridItem,
  HStack,
  Show,
  SimpleGrid,
  VStack
} from "@chakra-ui/react";
import GameGrid from "./GameGrid";
import GameHeading from "./GameHeading";
import GenreList from "./GenreList";
import NavBar from "./NavBar";
import PlatformSelector from "./PlatformSelector";
import SortSelector from "./SortSelector";
import ClearFilters from "./ClearFilters";
import GenreSelector from "./GenreSelector";

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
          <GameGrid />
        </GridItem>
      </Grid>
    </main>
  );
}
