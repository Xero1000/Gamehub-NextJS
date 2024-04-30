import useTrailers from "../hooks/useTrailers";

interface Props {
  gameId: number;
}

// Displays a video player to watch a game trailer
const GameTrailer = ({ gameId }: Props) => {
  // Fetch trailers for the given game ID
  const { data, error, isLoading } = useTrailers(gameId);

  if (isLoading) return null;

  if (error) throw error;

  const first = data?.results[0];

  // Display the first available trailer if it exists
  return first ? (
    <video src={first.data[480]} poster={first.preview} controls />
  ) : null;
};

export default GameTrailer;
