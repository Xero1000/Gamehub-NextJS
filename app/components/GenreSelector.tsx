"use client";
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";
import useGenre from "../hooks/useGenre";
import useGenres from "../hooks/useGenres";
import useGameQueryStore from "../store";

/**
 * A dropdown menu for selecting a genre to filter games.
 * This component only appears when the browser window width 
 *can no longer fit the GenreList 
 */
const GenreSelector = () => {
  // Retrieve the selected genre ID from the store and a function to set it
  const selectedGenreId = useGameQueryStore((s) => s.gameQuery.genreId);
  const setSelectedGenreId = useGameQueryStore((s) => s.setGenreId);

  const { data, error } = useGenres(); // Fetch genres from RAWG API
  const selectedGenre = useGenre(selectedGenreId); // Retrieve the selected Genre

  if (error) return null;
  return (
    <Menu>
      {/* Button to open the dropdown menu */}
      <MenuButton as={Button} rightIcon={<BsChevronDown />}>
        {selectedGenre?.name || "Genres"}
      </MenuButton>
      {/* List of menu items representing available genres */}
      <MenuList>
        {data?.results.map((genre) => (
          <MenuItem onClick={() => setSelectedGenreId(genre.id)} key={genre.id}>
            {genre.name}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default GenreSelector;
