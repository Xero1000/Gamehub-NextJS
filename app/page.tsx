import { Grid, GridItem, Show } from "@chakra-ui/react";
import NavBar from "./NavBar";

export default function Home() {
  return (
    <main>
      <Grid
        templateAreas={{
          base: `"nav" "main"`,
          lg: `"nav nav" "aside main"`,
        }}
      >
        <GridItem area="nav">
          <NavBar />
        </GridItem>
        <Show above="lg">
          <GridItem bg="gold" area="aside">
            Aside
          </GridItem>
        </Show>
        <GridItem bg="dodgerblue" area="main">
          Main
        </GridItem>
      </Grid>
    </main>
  );
}
