import React from "react";
import { type Product } from "../../types";
import Button from "../common/Button";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { toggleFavorite } from "../../features/favorites/favoritesSlice";

interface ProductCardProps {
  product: Product;
  onViewDetails: (id: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onViewDetails }) => {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.favorites.favoriteIds);
  const isFavorite = favorites.includes(product.id);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full">
      <div className="relative h-48 bg-gray-100">
        <img src={product.image} alt={product.title} height={300} width={300} className="w-full h-full object-contain p-4" />
        <button
          onClick={(e) => {
            e.stopPropagation();
            dispatch(toggleFavorite(product.id));
          }}
          className="absolute top-2 right-2 p-2 rounded-full bg-white/80 hover:bg-white"
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          {isFavorite ? "❤️" : "🤍"}
        </button>
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.title}</h3>
        <div className="mt-auto">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xl font-bold">${product.price.toFixed(2)}</span>
            <div className="flex items-center">
              <span className="text-yellow-500">★</span>
              <span className="ml-1 text-sm text-gray-600">
                {product.rating.rate} ({product.rating.count})
              </span>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={() => onViewDetails(product.id)}
            >
              View Details
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
