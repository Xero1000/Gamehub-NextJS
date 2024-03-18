import React from "react";
import { Image, ImageProps } from "@chakra-ui/react";

interface Props {
  rating: number;
}

const Emoji = ({ rating }: Props) => {
  if (rating < 3) return null;

  const emojiMap: { [key: number]: ImageProps } = {
    3: { src: "/meh.webp", alt: "meh", boxSize: "25px" },
    4: { src: "/thumbs-up.webp", alt: "recommended", boxSize: "25px" },
    5: { src: "/bulls-eye.webp", alt: "Exceptional", boxSize: "35px" }
  }

  return <Image {...emojiMap[rating]} marginTop={1}/>
};

export default Emoji;
