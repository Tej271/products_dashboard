import React, { useMemo, useState, useCallback } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import { useGetProductsQuery, useGetCategoriesQuery } from "../../features/products/productsApi";
import ProductCard from "./ProductCard";
import { type SortOption } from "../../types";
import { useNavigate } from "react-router-dom";
import Loader from "../common/Loader";

const sortProducts = (products: any[], sortBy: SortOption) => {
  return [...products].sort((a, b) => {
    switch (sortBy) {
      case "price_asc":
        return a.price - b.price;
      case "price_desc":
        return b.price - a.price;
      case "title_asc":
        return a.title.localeCompare(b.title);
      case "title_desc":
        return b.title.localeCompare(a.title);
      default:
        return 0;
    }
  });
};

const ProductList: React.FC = () => {
  const { data: products = [], isLoading, error } = useGetProductsQuery();
  const { data: categories = [] } = useGetCategoriesQuery();
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<SortOption>("");
  const navigate = useNavigate();

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (debouncedSearchTerm) {
      const term = debouncedSearchTerm.toLowerCase();
      result = result.filter(
        (product) =>
          product.title.toLowerCase().includes(term) ||
          product.description.toLowerCase().includes(term)
      );
    }

    if (selectedCategory !== "all") {
      result = result.filter((product) => product.category === selectedCategory);
    }

    return sortProducts(result, sortBy);
  }, [products, searchTerm, selectedCategory, sortBy]);

  const handleViewDetails = useCallback(
    (id: number) => {
      navigate(`/product/${id}`);
    },
    [navigate]
  );

  if (isLoading) return <Loader />;
  if (error) return <div className="text-red-500 text-center py-8">Error loading products</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <div className="w-full md:w-1/3">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full p-2 border rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <select
            className="p-2 border rounded-md w-full md:w-auto"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
          <select
            className="p-2 border rounded-md w-full md:w-auto"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
          >
            <option value="">Sort By</option>
            <option value="title_asc">Name (A-Z)</option>
            <option value="title_desc">Name (Z-A)</option>
            <option value="price_asc">Price (Low to High)</option>
            <option value="price_desc">Price (High to Low)</option>
          </select>
        </div>
      </div>

      <div className="">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-500">
              Try adjusting your search or filter to find what you're looking for.
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} onViewDetails={handleViewDetails} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
