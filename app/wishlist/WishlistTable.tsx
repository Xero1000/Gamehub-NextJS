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
import getCroppedImageUrl from "../services/image-url";
import CriticScore from "../components/CriticScore";
import Emoji from "../components/Emoji";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

interface Props {
  games: Game[];
}

const WishlistTable = ({ games }: Props) => {
  const queryClient = useQueryClient(); // Access the query client to handle refetching

  const deleteMutation = useMutation(
    (gameId: string) => {
      return axios.delete(`/api/wishlist/${gameId}`);
    },
    {
      onSuccess: () => {
        // Optionally refetch wishlist data after deletion
        queryClient.invalidateQueries(["wishlist"]);
      },
      onError: (error) => {
        // Handle error case
        console.error("Error deleting game from wishlist:", error);
      },
    }
  );

  const handleRemove = (gameId: string) => {
    deleteMutation.mutate(gameId);
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
