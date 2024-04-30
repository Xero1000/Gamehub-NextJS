"use client";

import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";
import usePlatform from "../hooks/usePlatform";
import usePlatforms from "../hooks/usePlatforms";
import useGameQueryStore from "../store";

// A dropdown menu for selecting a platform to filter games.
const PlatformSelector = () => {
  // Retrieve the selected platform ID from the store and a function to set it
  const selectedPlatformId = useGameQueryStore((s) => s.gameQuery.platformId);
  const setSelectedPlatformId = useGameQueryStore((s) => s.setPlatformId);

  const { data, error } = usePlatforms(); // Fetch platforms from RAWG API
  const selectedPlatform = usePlatform(selectedPlatformId); // Retrieve the selected platform.

  if (error) return null;
  return (
    <Menu>
       {/* Button to trigger the menu */}
      <MenuButton as={Button} rightIcon={<BsChevronDown />}>
        {selectedPlatform?.name || "Platforms"}
      </MenuButton>

      {/* List of available platforms */}
      <MenuList>
        {data?.results.map((platform) => (
          <MenuItem
            onClick={() => setSelectedPlatformId(platform.id)}
            key={platform.id}
          >
            {platform.name}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default PlatformSelector;
