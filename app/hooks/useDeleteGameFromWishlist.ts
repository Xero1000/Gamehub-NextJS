import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import errorContext from "../state-management/contexts/errorContext";

const useDeleteGameFromWishlist = () => {
  const queryClient = useQueryClient();
  const { errorOccured, setErrorOccured, setMessage } = useContext(errorContext)

  const deleteMutation = useMutation(
    (gameId: string) => {
      return axios.delete(`/api/wishlist/${gameId}`);
    },
    {
      onSuccess: () => {
        // Refetch wishlist data after deletion
        queryClient.invalidateQueries(["wishlist"]);
        if (errorOccured) {
          setErrorOccured(false)
          setMessage("")
        }
      },
      onError: () => {
        setErrorOccured(true)
        setMessage("Unable to remove game from wishlist")
      },
    }
  );

  return deleteMutation;
};

export default useDeleteGameFromWishlist;
