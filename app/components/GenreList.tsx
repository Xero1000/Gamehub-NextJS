"use client";

import {
  Button,
  Heading,
  Image,
  List,
  ListItem,
  Skeleton,
  SkeletonText,
} from "@chakra-ui/react";
import useGenres from "../hooks/useGenres";
import getCroppedImageUrl from "../services/image-url";
import useGameQueryStore from "../store";
import GenreListContainer from "./GenreListContainer";

/**
 * A list of genres fetched from the RAWG API, 
 * allowing users to select one to filter games.
 */
const GenreList = () => {
  const { data, error, isLoading } = useGenres(); // Fetch genres from RAWG API

  // Get the ID of the selected genre from the store and a function to set it
  const selectedGenreId = useGameQueryStore((s) => s.gameQuery.genreId);
  const setSelectedGenreId = useGameQueryStore((s) => s.setGenreId);

  // Skeletons for loading state
  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  // Shared styles for genre images
  const sharedStyles = {
    boxSize: "32px",
    borderRadius: "8",
  };

  if (error) return null;

  return (
    <>
      <Heading fontSize="2xl" marginBottom={3}>
        Genres
      </Heading>
      {/* List of genres */}
      <List>
        {/* Display skeletons while loading */}
        {isLoading &&
          skeletons.map((skeleton) => (
            <ListItem key={skeleton}>
              <GenreListContainer>
                <Skeleton {...sharedStyles} />
                <SkeletonText skeletonHeight={4} noOfLines={1} width="70px" />
              </GenreListContainer>
            </ListItem>
          ))}
        {/* Display genres when data is available */}
        {data?.results.map((genre) => (
          <ListItem key={genre.id}>
            <GenreListContainer>
              {/* Genre image */}
              <Image
                {...sharedStyles}
                objectFit="cover"
                src={getCroppedImageUrl(genre.image_background)}
                alt="Genre Image"
              />
              {/* Button to select the genre */}
              <Button
                whiteSpace="normal"
                textAlign="left"
                fontSize="lg"
                variant="link"
                fontWeight={genre.id === selectedGenreId ? "bold" : "normal"}
                onClick={() => setSelectedGenreId(genre.id)}
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
