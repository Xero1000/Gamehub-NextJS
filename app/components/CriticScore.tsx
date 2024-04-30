import { Badge } from "@chakra-ui/react";

interface Props {
  score: number;
}

// A badge to display a game's metacritic score 
const CriticScore = ({ score }: Props) => {

  // Badge color depends on how high or low the score is
  const color = score > 75 ? "green" : score > 60 ? "yellow" : "red";

  return (
    <Badge fontSize="14px" paddingX={2} borderRadius="4px" colorScheme={color}>
      {score}
    </Badge>
  );
};

export default CriticScore;
