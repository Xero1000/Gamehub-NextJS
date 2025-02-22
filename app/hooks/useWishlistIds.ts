import { useQuery } from "@tanstack/react-query";
import { Game } from "@prisma/client";
import axios from "axios";

// Hook for fetching game ids from currently logged in user's wishlist
const useWishlistIds = (status: String) => {
    const { data, isLoading } = useQuery({
        queryKey: ["wishlist"],
        queryFn: () =>
            axios
        .get<Game[]>("/api/wishlist")
        .then((res) => res.data.map((game) => game.id)),
        enabled: status === "authenticated",
    });

    return { data, isLoading }
}

export default useWishlistIds
