import {
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
  Box,
} from "@chakra-ui/react";
import Link from "next/link";
import { useState } from "react";
import { BsChevronDown } from "react-icons/bs";

// A dropdown menu to select the category in which games in wishlist are sorted 
const SortSelector = () => {
  const [sortCategory, setSortCategory] = useState("Recently Added");

  /**
   * User can sort by:
   *    Most recently added games
   *    Name
   *    Metacritic score
   *    Rating
   */ 
  return (
    <Box marginY={5}>
      <Menu>
        <MenuButton as={Button} rightIcon={<BsChevronDown />}>
          {`Sort by: ${sortCategory}`}
        </MenuButton>
        <MenuList>
          <Link
            href="/wishlist?sortOrder=recentlyAdded"
            onClick={() => setSortCategory("Recently Added")}
          >
            <MenuItem>Recently Added</MenuItem>
          </Link>
          <Link
            href="/wishlist?sortOrder=name"
            onClick={() => setSortCategory("Name")}
          >
            <MenuItem>Name</MenuItem>
          </Link>
          <Link
            href="/wishlist?sortOrder=metacritic"
            onClick={() => setSortCategory("Metacritic")}
          >
            <MenuItem>Metacritic</MenuItem>
          </Link>
          <Link
            href="/wishlist?sortOrder=rating"
            onClick={() => setSortCategory("Rating")}
          >
            <MenuItem>Rating</MenuItem>
          </Link>
        </MenuList>
      </Menu>
    </Box>
  );
};

export default SortSelector;
