import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetProductQuery } from '../features/products/productsApi';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { toggleFavorite } from '../features/favorites/favoritesSlice';
import Button from '../components/common/Button';
import Loader from '../components/common/Loader';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading, error } = useGetProductQuery(Number(id));
  const favorites = useAppSelector((state) => state.favorites.favoriteIds);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isFavorite = favorites.includes(Number(id));

  if (isLoading) return <Loader />;
  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Product not found</h2>
        <Button onClick={() => navigate('/')}>Back to Home</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="outline" onClick={() => navigate(-1)} className="mb-6">
        ← Back
      </Button>
      
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0 md:w-1/2 bg-gray-100 flex items-center justify-center p-8">
            <img
              src={product.image}
              alt={product.title}
              className="h-96 object-contain"
            />
          </div>
          <div className="p-8 md:w-1/2">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-sm text-gray-500 uppercase tracking-wider">
                  {product.category}
                </span>
                <h1 className="text-3xl font-bold text-gray-900 mt-1">
                  {product.title}
                </h1>
              </div>
              <button
                onClick={() => dispatch(toggleFavorite(product.id))}
                className="text-2xl"
                aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              >
                {isFavorite ? '❤️' : '🤍'}
              </button>
            </div>

            <div className="mt-6">
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.round(product.rating.rate)
                          ? 'text-yellow-400'
                          : 'text-gray-300'
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="ml-2 text-gray-600">
                    {product.rating.rate} ({product.rating.count} reviews)
                  </span>
                </div>
              </div>

              <p className="text-gray-700 mb-6">{product.description}</p>

              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-gray-900">
                  ${product.price.toFixed(2)}
                </span>
                <Button variant="primary" size="md">
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;