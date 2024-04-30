import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/api-client";
import Game from "../entities/Game";

const apiClient = new APIClient<Game>("/games");

// Hook for fetching data for a single game based on slug
const useGame = (slug: string) =>
  useQuery({
    queryKey: ["games", slug],
    queryFn: () => apiClient.get(slug), // Adjust the API path as necessary
  });

export default useGame;
