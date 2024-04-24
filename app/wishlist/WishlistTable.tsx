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
  Tr,
} from "@chakra-ui/react";
import { Game } from "@prisma/client";
import CriticScore from "../components/CriticScore";
import Emoji from "../components/Emoji";
import useDeleteGameFromWishlist from "../hooks/useDeleteGameFromWishlist";
import useWindowSize from "../hooks/useWindowSize";
import getCroppedImageUrl from "../services/image-url";
import { sort } from "fast-sort";

interface Props {
  games: Game[];
  sortOrder: string;
}

const WishlistTable = ({ games, sortOrder }: Props) => {
  const { width } = useWindowSize();
  const { mutate: removeGame, isLoading } = useDeleteGameFromWishlist();

  const handleRemove = (gameId: string) => {
    removeGame(gameId);
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
        return (game: Game) => game.createdAt;
    }
  };

  const sortedGames =
    sortOrder === "name"
      ? sort(games).asc(getSortKey(sortOrder))
      : sort(games).desc(getSortKey(sortOrder));

  console.log(sortOrder);
  return (
    <TableContainer>
      <Table variant="simple">
        <Tbody>
          {sortedGames.map((game) => (
            <Tr key={game.id}>
              <Td>
                <Flex>
                  <Image
                    src={getCroppedImageUrl(game.background_image)}
                    alt={`${game.name}'s image`}
                    maxWidth={width > 700 ? "200px" : "100px"}
                    objectFit="cover"
                  />
                  <Box className="flex" paddingLeft={5}>
                    <Box>
                      <Heading
                        fontSize={{ base: "20px", md: "30px" }}
                        pb={width > 700 ? 0 : 2}
                        whiteSpace="normal"
                      >
                        {game.name}
                      </Heading>
                      <Box
                        className={width > 700 ? "flex" : "normal"}
                        alignItems="center"
                        gap={3}
                      >
                        {width > 490 ? (
                          <>
                            <Flex gap={3} alignItems="center">
                              <Text>Metacritic: </Text>
                              <CriticScore score={game.metacritic} />
                            </Flex>
                            <Flex gap={3} alignItems="center">
                              <Text pl={width > 700 ? 3 : 0}>Rating: </Text>
                              <Box pb={2}>
                                <Emoji rating={game.rating_top} />
                              </Box>
                            </Flex>
                          </>
                        ) : (
                          <>
                            <Flex gap={3} alignItems="center">
                              <CriticScore score={game.metacritic} />
                              <Box pb={2}>
                                <Emoji rating={game.rating_top} />
                              </Box>
                              <Button
                                ml={2}
                                onClick={() => handleRemove(game.id)}
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
                  <Button onClick={() => handleRemove(game.id)}>Remove</Button>
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
