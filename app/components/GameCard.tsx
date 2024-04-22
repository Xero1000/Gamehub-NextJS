import {
  Button,
  Card,
  CardBody,
  HStack,
  Heading,
  Image,
  Spinner,
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
              onClick={
                isOnWishlist
                  ? () => handleRemoveFromWishlist(String(game.id))
                  : handleAddToWishlist
              }
              isDisabled={addMutation.isLoading || deleteMutation.isLoading}
              colorScheme={isOnWishlist ? "green" : "gray"}
            >
              {addMutation.isLoading || deleteMutation.isLoading ? (
                <Spinner />
              ) : isOnWishlist ? (
                "Added to Wishlist"
              ) : (
                "Add to Wishlist"
              )}
            </Button>
          )}
        </HStack>
      </CardBody>
    </Card>
  );
};

export default GameCard;
