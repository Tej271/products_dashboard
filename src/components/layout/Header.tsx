import React from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';

const Header: React.FC = () => {
  const favorites = useAppSelector((state) => state.favorites.favoriteIds);

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-indigo-600">
          ShopEase
        </Link>
        <nav className="flex items-center space-x-6">
          <Link to="/" className="text-gray-700 hover:text-indigo-600">
            Home
          </Link>
          <Link
            to="/favorites"
            className="flex items-center text-gray-700 hover:text-indigo-600"
          >
            Favorites
            {favorites.length > 0 && (
              <span className="ml-1 bg-indigo-600 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                {favorites.length}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;