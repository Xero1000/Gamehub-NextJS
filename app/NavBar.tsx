import { HStack } from "@chakra-ui/react";
import Image from "next/image";
import logo from "../public/logo.webp";
import ColorModeSwitch from "./ColorModeSwitch";

const NavBar = () => {
  return (
    <HStack justify="space-between" padding="10px">
      <Image src={logo} alt="logo" width={60} height={60} />
      <ColorModeSwitch />
    </HStack>
  );
};

export default NavBar;
