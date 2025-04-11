// sehha/src/app/animal-products/page.js
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

async function fetchCategories() {
  try {
    const response = await axios.get("http://localhost:3000/api/animal-products", {
      params: { getCategories: true },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return ["all", "medicine", "food", "accessories"]; // Fallback categories
  }
}

async function fetchProducts({ category = "all", search = "", page = 1 }) {
  try {
    const response = await axios.get("http://localhost:3000/api/animal-products", {
      params: { category, search, page },
      headers: {
        "Cache-Control": "no-store",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return {
      products: [],
      pagination: { currentPage: 1, totalPages: 1, totalProducts: 0, productsPerPage: 6 },
      error: error.response?.data?.details || error.message,
    };
  }
}

async function fetchCart(userId) {
  try {
    const response = await axios.get("http://localhost:3000/api/cart", {
      params: { userId },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching cart:", error);
    return { items: [], totalAmount: 0 };
  }
}

export default function AnimalProductsPage() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({ items: [], totalAmount: 0 });
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalProducts: 0,
    productsPerPage: 6,
  });
  const [error, setError] = useState(null);
  const router = useRouter();
  const userId = "guest";

  // Fetch categories on component mount
  useEffect(() => {
    fetchCategories().then((data) => {
      console.log("Fetched categories:", data);
      setCategories(data);
    });
  }, []);

  // Fetch products and cart when category, search, or page changes
  useEffect(() => {
    fetchProducts({ category, search, page: pagination.currentPage }).then((data) => {
      console.log("Fetched products:", data);
      if (data.error) {
        setError(data.error);
        setProducts([]);
        setPagination({ currentPage: 1, totalPages: 1, totalProducts: 0, productsPerPage: 6 });
      } else {
        setError(null);
        setProducts(data.products || []);
        setPagination((prev) => ({
          ...prev,
          ...data.pagination,
        }));
      }
    });

    fetchCart(userId).then((data) => {
      console.log("Fetched cart:", data);
      setCart(data);
    });
  }, [category, search, pagination.currentPage]);

  const addToCart = async (product) => {
    try {
      console.log("Adding product to cart:", product);
      const response = await axios.post("/api/cart", { userId, product });

      const responseData = response.data;
      console.log("Add to cart response:", responseData);

      if (!response.ok) {
        throw new Error(`Failed to add to cart: ${responseData.error || "Unknown error"}`);
      }

      setCart(responseData);
      router.push("/cart");
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert(`Failed to add to cart: ${error.message}`);
    }
  };

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      setPagination((prev) => ({ ...prev, currentPage: newPage }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header with Icon */}
        <div className="flex items-center justify-center mb-10">
          <div className="bg-amber-400 p-3 rounded-full shadow-lg mr-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-white"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2c-5.33 4-8 8-8 12 0 4.42 3.58 8 8 8s8-3.58 8-8c0-4-2.67-8-8-12zm1 17.5c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm1.5-5.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm-3-3c-.83 0-1.5-.67-1.5-1.5S10.67 8 11.5 8s1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm-1-3c-.83 0-1.5-.67-1.5-1.5S9.67 4 10.5 4s1.5.67 1.5 1.5S11.33 8 10.5 8z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-800">
            Animal Medical Products
          </h1>
        </div>

        {/* Filter and Cart Controls */}
        <div className="max-w-2xl mx-auto mb-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="w-full sm:w-auto">
            <label htmlFor="category" className="mr-2 text-gray-700 font-medium">
              Filter by Category:
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <Link href="/cart">
            <button className="bg-[#FC7729] text-white py-3 px-6 rounded-lg font-medium hover:bg-[#FCAA29] transition-colors duration-300 flex items-center">
              View Cart ({cart.items.reduce((total, item) => total + item.quantity, 0)})
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3z" />
                <path d="M16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
              </svg>
            </button>
          </Link>
        </div>

        {/* Search Box */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative rounded-full overflow-hidden border-2 border-orange-500 shadow-md">
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={handleSearchChange}
              className="w-full py-3 px-6 bg-white text-gray-800 focus:outline-none"
            />
            <button className="absolute right-0 top-0 h-full px-6 bg-orange-500 text-white hover:bg-amber-400 transition-colors duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Products Display or Error/Empty State */}
        {error ? (
          <div className="text-center py-16 bg-white rounded-xl shadow-lg max-w-2xl mx-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 text-amber-400 mx-auto mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <p className="text-orange-500 text-xl font-semibold">
              Failed to load products
            </p>
            <p className="text-gray-600 mt-2">{error}</p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl shadow-lg max-w-2xl mx-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 text-amber-400 mx-auto mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <p className="text-orange-500 text-xl font-semibold">
              No products found.
            </p>
            <p className="text-gray-600 mt-2">
              Please add some products to the database or adjust your search.
            </p>
          </div>
        ) : (
          <>
            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="bg-white rounded-xl overflow-hidden shadow-lg transform transition-transform hover:-translate-y-2 duration-300"
                >
                  <div className="relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute top-0 right-0 bg-amber-400 text-white px-3 py-1 rounded-bl-lg font-semibold">
                      ${product.price}
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center mb-3">
                      <span className="bg-amber-200 px-3 py-1 rounded-full text-sm text-gray-800 font-medium">
                        {product.category}
                      </span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-3">
                      {product.name}
                    </h2>
                    <div className="mt-6 flex gap-3">
                      <Link href={`/animal-products/${product._id}`} className="flex-1">
                        <button className="w-full bg-orange-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-amber-400 transition-colors duration-300 flex items-center justify-center">
                          View Details
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 ml-2"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      </Link>
                      {product.stock > 0 ? (
                        <button
                          onClick={() => addToCart(product)}
                          className="flex-1 bg-amber-400 text-white py-3 px-4 rounded-lg font-medium hover:bg-orange-500 transition-colors duration-300 flex items-center justify-center"
                        >
                          Add to Cart
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 ml-2"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3z" />
                            <path d="M16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                          </svg>
                        </button>
                      ) : (
                        <button
                          disabled
                          className="flex-1 bg-gray-300 text-gray-600 py-3 px-4 rounded-lg font-medium cursor-not-allowed flex items-center justify-center"
                        >
                          Sold Out
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="mt-12 flex flex-wrap justify-center items-center gap-2">
                <button
                  onClick={() => handlePageChange(pagination.currentPage - 1)}
                  disabled={pagination.currentPage === 1}
                  className={`py-2 px-4 rounded-lg font-medium ${
                    pagination.currentPage === 1
                      ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                      : "bg-orange-500 text-white hover:bg-amber-400 transition-colors duration-300"
                  }`}
                >
                  Previous
                </button>

                <div className="flex flex-wrap gap-2">
                  {Array.from({ length: pagination.totalPages }, (_, index) => index + 1).map(
                    (pageNum) => (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`py-2 px-4 rounded-lg font-medium ${
                          pagination.currentPage === pageNum
                            ? "bg-amber-400 text-white"
                            : "bg-gray-200 text-gray-800 hover:bg-gray-300 transition-colors duration-300"
                        }`}
                      >
                        {pageNum}
                      </button>
                    )
                  )}
                </div>

                <button
                  onClick={() => handlePageChange(pagination.currentPage + 1)}
                  disabled={pagination.currentPage === pagination.totalPages}
                  className={`py-2 px-4 rounded-lg font-medium ${
                    pagination.currentPage === pagination.totalPages
                      ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                      : "bg-orange-500 text-white hover:bg-amber-400 transition-colors duration-300"
                  }`}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}

        {/* Footer */}
        <div className="mt-16 py-6 text-center">
          <div className="inline-block px-6 py-2 bg-gray-800 text-white rounded-full mb-4">
            <span className="text-amber-400 font-bold">Pet</span>
            <span className="text-white font-bold">Care</span>
            <span className="text-orange-500 font-bold">Plus</span>
          </div>
          <p className="text-gray-700 text-sm">
            Providing the best medical products for your beloved pets
          </p>
        </div>
      </div>
    </div>
  );
}
