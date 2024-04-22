import Game from "../entities/Game";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";

// Function to post game data to the wishlist
export const addToWishlist = async (game: Game) => {
  const { id, name, background_image, metacritic, rating_top } = game;

  const response = await axios.post("/api/wishlist", {
    id,
    name,
    background_image,
    metacritic,
    rating_top,
  });
  return response.data;
};

const useAddGameToWishlist = () => {
  const queryClient = useQueryClient(); // Access the query client to handle refetching

  const addMutation = useMutation(addToWishlist, {
    onSuccess: () => {
      // Invalidate the wishlist query to update UI across the application
      queryClient.invalidateQueries(["wishlist"]);
      // Handle success (e.g., show a success message or update local state/UI)
      console.log("Game added to wishlist successfully!");
    },
    onError: (error) => {
      // Handle error (e.g., show an error message)
      console.error("Failed to add game to wishlist:", error);
    },
  });

  return addMutation;
};

export default useAddGameToWishlist
