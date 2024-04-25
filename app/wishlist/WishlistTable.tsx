import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tr
} from "@chakra-ui/react";
import { Game } from "@prisma/client";
import { sort } from "fast-sort";
import Link from "next/link";
import { useState } from "react";
import CriticScore from "../components/CriticScore";
import Emoji from "../components/Emoji";
import useDeleteGameFromWishlist from "../hooks/useDeleteGameFromWishlist";
import useWindowSize from "../hooks/useWindowSize";
import getCroppedImageUrl from "../services/image-url";

interface Props {
  games: Game[];
  sortOrder: string;
}

const WishlistTable = ({ games, sortOrder }: Props) => {
  const { width } = useWindowSize();
  const deleteMutation = useDeleteGameFromWishlist();
  const [removingGameId, setRemovingGameId] = useState<string | null>();

  const handleRemove = (gameId: string) => {
    setRemovingGameId(gameId);
    deleteMutation.mutate(gameId, {
      onSettled: () => setRemovingGameId(null),
    });
  };

  const getSortKey = (sortOrder: string) => {
    switch (sortOrder) {
      case "name":
        return (game: Game) => game.name;
      case "metacritic":
        return (game: Game) => game.metacritic;
      case "rating":
        return (game: Game) => game.rating_top;
      default:
        return (game: Game) => game.updatedAt;
    }
  };

  const sortedGames =
    sortOrder === "name"
      ? sort(games).asc(getSortKey(sortOrder))
      : sort(games).desc(getSortKey(sortOrder));

  return (
    <TableContainer>
      <Table variant="simple">
        <Tbody>
          {sortedGames.map((game) => (
            <Tr key={game.id}>
              <Td>
                <Flex>
                  <Image
                    src={
                      game.background_image
                        ? getCroppedImageUrl(game.background_image)
                        : getCroppedImageUrl()
                    }
                    alt={`${game.name}'s image`}
                    maxWidth={width > 700 ? "200px" : "100px"}
                    objectFit="cover"
                  />
                  <Box className="flex" paddingLeft={5}>
                    <Box>
                      <Link href={`/games/${game.slug}`}>
                        <Heading
                          fontSize={{ base: "20px", md: "30px" }}
                          pb={width > 700 ? 0 : 2}
                          whiteSpace="normal"
                          _hover={{
                            textDecoration: "underline",
                          }}
                        >
                          {game.name}
                        </Heading>
                      </Link>
                      <Box
                        className={width > 700 ? "flex" : "normal"}
                        alignItems="center"
                        gap={3}
                      >
                        {width > 490 ? (
                          <>
                            <Flex gap={3} alignItems="center">
                              <Text>Metacritic: </Text>
                              {game.metacritic && (
                                <CriticScore score={game.metacritic} />
                              )}
                            </Flex>
                            <Flex gap={3} alignItems="center">
                              <Text pl={width > 700 ? 3 : 0}>Rating: </Text>
                              <Box pb={2}>
                                {game.rating_top && (
                                  <Emoji rating={game.rating_top} />
                                )}
                              </Box>
                            </Flex>
                          </>
                        ) : (
                          <>
                            <Flex gap={3} alignItems="center">
                              {game.metacritic && (
                                <CriticScore score={game.metacritic} />
                              )}
                              <Box pb={2}>
                                {game.rating_top && (
                                  <Emoji rating={game.rating_top} />
                                )}
                              </Box>
                              <Button
                                ml={game.metacritic && game.rating_top ? 2 : -3}
                                onClick={() => handleRemove(game.id)}
                                isLoading={
                                  deleteMutation.isLoading &&
                                  removingGameId === game.id
                                }
                                isDisabled={deleteMutation.isLoading}
                              >
                                Remove
                              </Button>
                            </Flex>
                          </>
                        )}
                      </Box>
                    </Box>
                  </Box>
                </Flex>
              </Td>
              {width > 490 && (
                <Td>
                  <Button
                    onClick={() => handleRemove(game.id)}
                    isLoading={
                      deleteMutation.isLoading && removingGameId === game.id
                    }
                    isDisabled={deleteMutation.isLoading}
                  >
                    Remove
                  </Button>
                </Td>
              )}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default WishlistTable;
