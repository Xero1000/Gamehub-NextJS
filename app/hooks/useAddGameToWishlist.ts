import Game from "../entities/Game";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import errorContext from "../state-management/contexts/errorContext";

// Function to post game data to the wishlist
export const addToWishlist = async (game: Game) => {
  const { id, name, background_image, metacritic, rating_top, slug } = game;
  
  const response = await axios.post("/api/wishlist", {
    id,
    name,
    background_image,
    metacritic,
    rating_top,
    slug,
  });
  return response.data;
};

const useAddGameToWishlist = () => {
  const queryClient = useQueryClient(); // Access the query client to handle refetching
  const { errorOccured, setErrorOccured, setMessage } = useContext(errorContext)

  const addMutation = useMutation(addToWishlist, {
    onSuccess: () => {
      // Invalidate the wishlist query to update UI across the application
      queryClient.invalidateQueries(["wishlist"]);
      if (errorOccured) {
        setErrorOccured(false)
        setMessage("")
      }
    },
    onError: (error) => {
      setErrorOccured(true)
      setMessage("Unable to add game to wishlist")
    },
  });

  return addMutation;
};

export default useAddGameToWishlist
