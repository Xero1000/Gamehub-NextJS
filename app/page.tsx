import { Grid, GridItem, Show } from "@chakra-ui/react";

export default function Home() {
  return (
    <main>
      <Grid
        templateAreas={{
          base: `"nav" "main"`,
          lg: `"nav nav" "aside main"`,
        }}
      >
        <GridItem bg="coral" area="nav">Nav</GridItem>
        <Show above="lg">
          <GridItem bg="gold" area="aside">Aside</GridItem>
        </Show>
        <GridItem bg="dodgerblue" area="main">Main</GridItem>
      </Grid>
    </main>
  );
}
