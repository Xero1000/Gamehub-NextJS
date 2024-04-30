import usePlatforms from "./usePlatforms";

// Hook for fetching details for a single platform based on id
const usePlatform = (id?: number) => {
  const { data: platforms } = usePlatforms();
  return platforms?.results.find((p) => p.id === id);
};

export default usePlatform;
