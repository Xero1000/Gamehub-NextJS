import {
  Button,
  Image,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { Game } from "@prisma/client";
import CriticScore from "../components/CriticScore";
import Emoji from "../components/Emoji";
import useDeleteGameFromWishlist from "../hooks/useDeleteGameFromWishlist";
import getCroppedImageUrl from "../services/image-url";

interface Props {
  games: Game[];
}

const WishlistTable = ({ games }: Props) => {
  
  const { mutate: removeGame, isLoading } = useDeleteGameFromWishlist()

  const handleRemove = (gameId: string) => {
    removeGame(gameId);
  };

  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th></Th>
            <Th>Name</Th>
            <Th>Metacritic Score</Th>
            <Th>Rating</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {games.map((game) => (
            <Tr key={game.id}>
              <Td>
                <Image
                  src={getCroppedImageUrl(game.background_image)}
                  alt={`${game.name}'s image`}
                  boxSize="3xs"
                  objectFit="cover"
                />
              </Td>
              <Td>{game.name}</Td>
              <Td>
                <CriticScore score={game.metacritic} />
              </Td>
              <Td>
                <Emoji rating={game.rating_top} />
              </Td>
              <Td>
                <Button onClick={() => handleRemove(game.id)}>Remove</Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default WishlistTable;
