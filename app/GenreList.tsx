import {
  Button,
  Heading,
  Image,
  List,
  ListItem,
  Skeleton,
  SkeletonText,
} from "@chakra-ui/react";
import useGenres, { Genre } from "./hooks/useGenres";
import getCroppedImageUrl from "./services/image-url";
import GenreListContainer from "./GenreListContainer";

interface Props {
  onSelectGenre: (genre: Genre) => void;
  selectedGenre?: Genre | null;
}

const GenreList = ({ onSelectGenre, selectedGenre }: Props) => {
  const { data, error, isLoading } = useGenres();
  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const sharedStyles = {
    boxSize: "32px",
    borderRadius: "8",
  };

  if (error) return null;

  return (
    <>
      <Heading fontSize="2xl" marginBottom={3}>Genres</Heading>
      <List>
        {isLoading &&
          skeletons.map((skeleton) => (
            <ListItem key={skeleton}>
              <GenreListContainer>
                <Skeleton {...sharedStyles} />
                <SkeletonText skeletonHeight={4} noOfLines={1} width="70px" />
              </GenreListContainer>
            </ListItem>
          ))}
        {data.map((genre) => (
          <ListItem key={genre.id}>
            <GenreListContainer>
              <Image
                {...sharedStyles}
                objectFit="cover"
                src={getCroppedImageUrl(genre.image_background)}
              />
              <Button
                whiteSpace="normal"
                textAlign="left"
                fontSize="lg"
                variant="link"
                fontWeight={genre.id === selectedGenre?.id ? "bold" : "normal"}
                onClick={() => onSelectGenre(genre)}
              >
                {genre.name}
              </Button>
            </GenreListContainer>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default GenreList;
