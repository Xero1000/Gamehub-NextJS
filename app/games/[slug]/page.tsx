"use client";
import ErrorPage from "@/app/error";
import useGame from "@/app/hooks/useGame";
import { Heading, Spinner, Text } from "@chakra-ui/react";

interface Props {
  params: { slug: string };
}

const GameDetailPage = ({ params: { slug } }: Props) => {
  const { data: game, isLoading, error } = useGame(slug);

  if (isLoading) return <Spinner />;

  // Check if there was an error in fetching the game details
  if (error) {
    return <ErrorPage />;
  }

  return (
    <>
      <Heading>{game?.name}</Heading>
      <Text>{game?.description_raw}</Text>
    </>
  );
};

export default GameDetailPage;
