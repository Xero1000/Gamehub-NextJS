import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/api-client";
import Trailer from "../entities/Trailer";

// Hook for fetching trailers for a specific game based on id
const useTrailers = (gameId: number) => {
  const apiClient = new APIClient<Trailer>(`/games/${gameId}/movies`);

  return useQuery({
    queryKey: ["trailers", gameId],
    queryFn: apiClient.getAll,
  });
};

export default useTrailers;
