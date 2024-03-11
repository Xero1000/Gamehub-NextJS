import { HStack, Text } from "@chakra-ui/react";
import Image from "next/image";
import logo from "../public/logo.webp"

const NavBar = () => {
  return (
    <HStack>
        <Image src={logo} alt="logo" width={60} height={60}/>
        <Text>NavBar</Text>
    </HStack>
  )  
};

export default NavBar;
