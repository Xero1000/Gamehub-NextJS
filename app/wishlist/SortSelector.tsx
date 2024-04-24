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
          <MenuItem>
            <Link
              href="/wishlist?sortOrder=recentlyAdded"
              onClick={() => setSortCategory("Recently Added")}
            >
              Recently Added
            </Link>
          </MenuItem>
          <MenuItem>
            <Link
              href="/wishlist?sortOrder=name"
              onClick={() => setSortCategory("Name")}
            >
              Name
            </Link>
          </MenuItem>
          <MenuItem>
            <Link
              href="/wishlist?sortOrder=metacritic"
              onClick={() => setSortCategory("Metacritic")}
            >
              Metacritic
            </Link>
          </MenuItem>
          <MenuItem>
            <Link
              href="/wishlist?sortOrder=rating"
              onClick={() => setSortCategory("Rating")}
            >
              Rating
            </Link>
          </MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
};

export default SortSelector;
