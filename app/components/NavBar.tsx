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
      <Link href="/">
        <Image src={logo} alt="logo" width={90} height={90} objectFit="cover" />
      </Link>
      <SearchInput />
      <ColorModeSwitch />
      {status === "authenticated" && (
        <Menu>
          <MenuButton
            as={Avatar}
            src={session.user?.image!}
            size="md"
            mr={2}
            cursor="pointer"
          />
          <MenuList minWidth="0" width="150px">
            <MenuItem>
              <Link href="/wishlist">Wishlist</Link>
            </MenuItem>
            <MenuItem>
              <Link href="/api/auth/signout">Logout</Link>
            </MenuItem>
          </MenuList>
        </Menu>
      )}
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
