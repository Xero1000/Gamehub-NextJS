"use client";

import {
  Button,
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
}

const GenreList = ({ onSelectGenre }: Props) => {
  const { data, error, isLoading } = useGenres();
  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const sharedStyles = {
    boxSize: "32px",
    borderRadius: "8",
  };

  if (error) return null;

  return (
    <div>
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
                src={getCroppedImageUrl(genre.image_background)}
              />
              <Button
                fontSize="lg"
                variant="link"
                onClick={() => onSelectGenre(genre)}
              >
                {genre.name}
              </Button>
            </GenreListContainer>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default GenreList;
