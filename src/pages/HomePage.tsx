import React from 'react';
import ProductList from '../components/products/ProductList';

const HomePage: React.FC = () => {
  return (
    <div>
      <div className="bg-indigo-700 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to ShopEase</h1>
          <p className="text-xl text-indigo-100">Discover amazing products at great prices</p>
        </div>
      </div>
      <ProductList />
    </div>
  );
};

export default HomePage;