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
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { Game } from "@prisma/client";
import CriticScore from "../components/CriticScore";
import Emoji from "../components/Emoji";
import useDeleteGameFromWishlist from "../hooks/useDeleteGameFromWishlist";
import getCroppedImageUrl from "../services/image-url";
import useWindowSize from "../hooks/useWindowSize";

interface Props {
  games: Game[];
}

const WishlistTable = ({ games }: Props) => {
  const { width } = useWindowSize();
  const { mutate: removeGame, isLoading } = useDeleteGameFromWishlist();

  const handleRemove = (gameId: string) => {
    removeGame(gameId);
  };

  return (
    <Flex justifyContent="center">
      <TableContainer>
        <Table variant="simple">
          <Tbody>
            {games.map((game) => (
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
                  <Td
                    pl={{
                      base: "0px",
                      lg: "50px",
                      xl: "100px",
                      "2xl": "300px",
                    }}
                  >
                    <Flex justifyContent="flex-end">
                      <Button onClick={() => handleRemove(game.id)}>
                        Remove
                      </Button>
                    </Flex>
                  </Td>
                )}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Flex>
  );
};

export default WishlistTable;
