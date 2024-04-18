import {
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

interface Props {
  games: Game[];
}

const WishlistTable = ({ games }: Props) => {
  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th></Th>
            <Th>Name</Th>
            <Th>Metacritic Score</Th>
            <Th>Rating</Th>
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
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default WishlistTable;
