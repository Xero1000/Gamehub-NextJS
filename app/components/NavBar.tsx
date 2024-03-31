import { HStack } from "@chakra-ui/react";
import Image from "next/image";
import logo from "../../public/logo.webp";
import ColorModeSwitch from "./ColorModeSwitch";
import SearchInput from "./SearchInput";
import Link from "next/link";

const NavBar = () => {
  return (
    <HStack padding="10px">
      <Link href="/">
        <Image src={logo} alt="logo" width={90} height={90} objectFit="cover"/>
      </Link>
      <SearchInput />
      <ColorModeSwitch />
    </HStack>
  );
};

export default NavBar;
