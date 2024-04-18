import {
  Button,
  Card,
  CardBody,
  HStack,
  Heading,
  Image,
} from "@chakra-ui/react";
import Link from "next/link";
import Game from "../entities/Game";
import getCroppedImageUrl from "../services/image-url";
import CriticScore from "./CriticScore";
import Emoji from "./Emoji";
import PlatformIconList from "./PlatformIconList";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";

interface Props {
  game: Game;
}

// Function to post game data to the wishlist
export const addToWishlist = async (game: Game) => {
  const {
    id,
    name,
    background_image,
    metacritic,
    rating_top,
  } = game;

  const response = await axios.post("/api/wishlist", {
    id,
    name,
    background_image,
    metacritic,
    rating_top,
  });
  return response.data;
};

const GameCard = ({ game }: Props) => {
  const { status } = useSession();

  const mutation = useMutation(addToWishlist, {
    onSuccess: () => {
      // Handle success (e.g., show a success message or update local state/UI)
      console.log("Game added to wishlist successfully!");
    },
    onError: (error) => {
      // Handle error (e.g., show an error message)
      console.error("Failed to add game to wishlist:", error);
    },
  });

  const handleAddToWishlist = () => {
    mutation.mutate(game);
  };

  return (
    <Card>
      <Image
        src={getCroppedImageUrl(game.background_image)}
        alt={`${game.name} Image`}
      />
      <CardBody>
        <HStack justifyContent="space-between" marginBottom={3}>
          <PlatformIconList
            platforms={game.parent_platforms.map((p) => p.platform)}
          />
          <CriticScore score={game.metacritic} />
        </HStack>
        <Link href={`/games/${game.slug}`}>
          <Heading fontSize="2xl">
            {game.name}
            <Emoji rating={game.rating_top} />
          </Heading>
        </Link>
        <HStack justify="right">
          {status === "authenticated" && (
            <Button
              mt={3}
              onClick={handleAddToWishlist}
              isLoading={mutation.isLoading}
            >
              Add to Wishlist
            </Button>
          )}
        </HStack>
      </CardBody>
    </Card>
  );
};

export default GameCard;
