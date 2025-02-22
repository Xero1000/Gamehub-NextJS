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
import useAddGameToWishlist from "../hooks/useAddGameToWishlist";
import useDeleteGameFromWishlist from "../hooks/useDeleteGameFromWishlist";
import getCroppedImageUrl from "../services/image-url";
import CriticScore from "./CriticScore";
import Emoji from "./Emoji";
import PlatformIconList from "./PlatformIconList";

interface Props {
  game: Game;
  isOnWishlist: boolean;
  status: "loading" | "authenticated" | "unauthenticated";
}

/**
 * A card that displays information based on the game prop
 * Includes a link to the game's detail page
 * Includes ability to add or remove game from wishlist if user is logged in
 */
const GameCard = ({ game, isOnWishlist, status }: Props) => {
  const addMutation = useAddGameToWishlist();

  const handleAddToWishlist = () => {
    addMutation.mutate(game);
  };

  const deleteMutation = useDeleteGameFromWishlist();

  const handleRemoveFromWishlist = (gameId: string) => {
    deleteMutation.mutate(gameId);
  };

  return (
    <Card>
      {/* Display game image */}
      <Image
        src={getCroppedImageUrl(game.background_image)}
        alt={`${game.name} Image`}
      />
      <CardBody>
        {/* Display platforms and metacritic score */}
        <HStack justifyContent="space-between" marginBottom={3}>
          {game.parent_platforms && (
            <PlatformIconList
              platforms={game.parent_platforms.map((p) => p.platform)}
            />
          )}
          <CriticScore score={game.metacritic} />
        </HStack>

        {/* Link to game details page */}
        <Link href={`/games/${game.slug}`}>
          <Heading fontSize="2xl" _hover={{ textDecoration: "underline" }}>
            {game.name}
            <Emoji rating={game.rating_top} />
          </Heading>
        </Link>

        {/* Add/Remove from wishlist button for logged in users */}
        <HStack justify="right">
          {status === "authenticated" && (
            <Button
              mt={3}
              onClick={
                isOnWishlist
                  ? () => handleRemoveFromWishlist(String(game.id))
                  : handleAddToWishlist
              }
              isLoading={addMutation.isLoading || deleteMutation.isLoading}
              isDisabled={addMutation.isLoading || deleteMutation.isLoading}
              colorScheme={isOnWishlist ? "green" : "gray"}
            >
              {isOnWishlist ? "Added to Wishlist" : "Add to Wishlist"}
            </Button>
          )}
        </HStack>
      </CardBody>
    </Card>
  );
};

export default GameCard;
