"use client";
import ErrorPage from "@/app/error";
import ExpandableText from "@/app/games/ExpandableText";
import useGame from "@/app/hooks/useGame";
import { Box, Heading, SimpleGrid, Spinner } from "@chakra-ui/react";
import GameAttributes from "../GameAttributes";
import GameTrailer from "../GameTrailer";
import Screenshots from "../GameScreenshots";

interface Props {
  params: { slug: string };
}

// Page for displaying more detailed information for a single game
const GameDetailPage = ({ params: { slug } }: Props) => {
  // Fetch game data based on the slug from the URL
  const { data: game, isLoading, error } = useGame(slug);

  if (isLoading) return <Spinner />;

  // Display error page if data fetching failed
  if (error || !game) {
    return <ErrorPage />;
  }

  return (
    <>
      <SimpleGrid columns={{ base: 1, md: 2 }}>
        <Box>
          <Heading>{game.name}</Heading>
          <ExpandableText>{game.description_raw}</ExpandableText>
          <GameAttributes game={game} />
        </Box>
        <Box>
          <GameTrailer gameId={game.id} />
          <Screenshots gameId={game.id} />
        </Box>
      </SimpleGrid>
    </>
  );
};

export default GameDetailPage;
