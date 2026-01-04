import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "./favoritesSlice";

const FavoriteButton = ({ productId }: { productId: number }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state: any) => state.favorites.favoriteIds);

  const isFavorite = favorites.includes(productId);

  return (
    <button onClick={() => dispatch(toggleFavorite(productId))} data-testid="favorite-button">
      {isFavorite ? "Remove Favorite" : "Add Favorite"}
    </button>
  );
};

export default FavoriteButton;
