"use client";

import {
  Avatar,
  Button,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import logo from "../../public/logo.webp";
import ColorModeSwitch from "./ColorModeSwitch";
import SearchInput from "./SearchInput";
import { useSession } from "next-auth/react";

const NavBar = () => {
  const { status, data: session } = useSession();

  return (
    <HStack padding="10px">
      {/* Logo linking back to home */}
      <Link href="/">
        <Image src={logo} alt="logo" width={90} height={90} objectFit="cover" />
      </Link>

      {/* Search input component */}
      <SearchInput />

      {/* Toggle button for color mode */}
      <ColorModeSwitch />

      {status === "authenticated" && (
        <Menu>
          {/* Avatar button for user menu */}
          <MenuButton
            as={Avatar}
            src={session.user?.image!}
            size="md"
            mr={2}
            cursor="pointer"
          />
          {/* User menu options */}
          <MenuList minWidth="0" width="150px">
            <Link href="/wishlist">
              <MenuItem>Wishlist</MenuItem>
            </Link>
            <Link href="/api/auth/signout">
              <MenuItem>Logout</MenuItem>
            </Link>
          </MenuList>
        </Menu>
      )}
      {/* Link to sign-in page */}
      {status === "unauthenticated" && (
        <Link href="/api/auth/signin" passHref>
          <Button as="a" colorScheme="green">
            Login
          </Button>
        </Link>
      )}
    </HStack>
  );
};

export default NavBar;
