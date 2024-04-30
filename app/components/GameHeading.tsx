"use client";

import { Heading } from "@chakra-ui/react";
import useGenre from "../hooks/useGenre";
import usePlatform from "../hooks/usePlatform";
import useGameQueryStore from "../store";

/**
 * A dynamic heading based on the selected genre and platform.
 * This component displays a heading indicating the selected genre 
 * and platform for games. It dynamically updates based on user selection.
 */
const GameHeading = () => {
  // Get the ID of the selected genre and retrieve the genre data
  const genreId = useGameQueryStore((s) => s.gameQuery.genreId);
  const genre = useGenre(genreId);

  // Get the ID of the selected platform and retrieve the platform data
  const platformId = useGameQueryStore((s) => s.gameQuery.platformId);
  const platform = usePlatform(platformId);

  const heading = `${platform?.name || ""} ${genre?.name || ""} Games`;

  return (
    <Heading as="h1" marginY={5} fontSize="5xl">
      {heading}
    </Heading>
  );
};

export default GameHeading;
