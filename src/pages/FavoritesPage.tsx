import React from 'react';
import { useGetProductsQuery } from '../features/products/productsApi';
import { useAppSelector } from '../store/hooks';
import ProductCard from '../components/products/ProductCard';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/common/Loader';

const FavoritesPage: React.FC = () => {
  const { data: products = [], isLoading } = useGetProductsQuery();
  const favorites = useAppSelector((state) => state.favorites.favoriteIds);
  const navigate = useNavigate();

  const favoriteProducts = products.filter((product) =>
    favorites.includes(product.id)
  );

  const handleViewDetails = (id: number) => {
    navigate(`/product/${id}`);
  };

  if (isLoading) return <Loader />;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Favorites</h1>
      
      {favoriteProducts.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900">No favorite products yet</h3>
          <p className="mt-1 text-gray-500">Add some products to your favorites to see them here.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
          {favoriteProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
