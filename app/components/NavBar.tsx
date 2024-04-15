"use client";

import { HStack } from "@chakra-ui/react";
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
        <Link href="/api/auth/signout">Logout</Link>
      )}
      {status === "unauthenticated" && (
        <Link href="/api/auth/signin">Login</Link>
      )}
    </HStack>
  );
};

export default NavBar;
