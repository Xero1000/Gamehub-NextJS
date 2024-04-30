import { Image, ImageProps } from "@chakra-ui/react";

interface Props {
  rating: number;
}

// Displays an emoji based on rating
const Emoji = ({ rating }: Props) => {
  if (rating < 3) return null;

  const emojiMap: { [key: number]: ImageProps } = {
    3: { src: "/meh.webp", alt: "meh", boxSize: "25px" },
    4: { src: "/thumbs-up.webp", alt: "recommended", boxSize: "25px" },
    5: { src: "/bulls-eye.webp", alt: "Exceptional", boxSize: "35px" },
  };

  return (
    <>
      <Image {...emojiMap[rating]} marginTop={1} alt={String(rating)}/>
    </>
  );
};

export default Emoji;
