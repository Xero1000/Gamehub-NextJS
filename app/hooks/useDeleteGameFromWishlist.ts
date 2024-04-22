import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const useDeleteGameFromWishlist = () => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation(
    (gameId: string) => {
      return axios.delete(`/api/wishlist/${gameId}`);
    },
    {
      onSuccess: () => {
        // Optionally refetch wishlist data after deletion
        queryClient.invalidateQueries(["wishlist"]);
      },
      onError: (error) => {
        // Handle error case
        console.error("Error deleting game from wishlist:", error);
      },
    }
  );

  return deleteMutation;
};

export default useDeleteGameFromWishlist;
