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

const SortSelector = () => {
  const [sortCategory, setSortCategory] = useState("Recently Added");

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
