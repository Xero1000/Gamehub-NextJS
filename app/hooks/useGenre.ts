import useGenres from "./useGenres";

// Hook for fetching details for a single genre based on id 
const useGenre = (id?: number) => {
  const { data: genres } = useGenres();
  return genres?.results.find((g) => g.id === id);
};

export default useGenre;
