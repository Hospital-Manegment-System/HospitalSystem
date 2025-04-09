// src/app/animal-products/page.js
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

async function fetchProducts() {
  try {
    const res = await fetch("http://localhost:3000/api/animal-products", {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

async function fetchCart(userId) {
  try {
    const response = await fetch(`/api/cart?userId=${userId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch cart");
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching cart:", error);
    return { items: [], totalAmount: 0 };
  }
}

export default function AnimalProductsPage() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({ items: [], totalAmount: 0 });
  const router = useRouter();
  const userId = "guest"; // Replace with real user ID if using authentication

  useEffect(() => {
    // Fetch products
    fetchProducts().then((data) => {
      console.log("Fetched products:", data);
      setProducts(data);
    });

    // Fetch cart
    fetchCart(userId).then((data) => {
      console.log("Fetched cart:", data);
      setCart(data);
    });
  }, []);

  const addToCart = async (product) => {
    try {
      console.log("Adding product to cart:", product);
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, product }),
      });

      const responseData = await response.json();
      console.log("Add to cart response:", responseData);

      if (!response.ok) {
        throw new Error(
          `Failed to add to cart: ${responseData.error || "Unknown error"}`
        );
      }

      setCart(responseData);
      router.push("/cart");
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert(`Failed to add to cart: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFFFFF] to-[#C8C8C8]">
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center mb-8 pt-4">
          <div className="bg-[#FCAA29] p-3 rounded-full shadow-lg mr-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-white"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2c-5.33 4-8 8-8 12 0 4.42 3.58 8 8 8s8-3.58 8-8c0-4-2.67-8-8-12zm1 17.5c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm1.5-5.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm-3-3c-.83 0-1.5-.67-1.5-1.5S10.67 8 11.5 8s1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm-1-3c-.83 0-1.5-.67-1.5-1.5S9.67 4 10.5 4s1.5.67 1.5 1.5S11.33 8 10.5 8z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-[#303241]">
            Animal Medical Products
          </h1>
        </div>

        <div className="max-w-xl mx-auto mb-6">
          <Link href="/cart">
            <button className="bg-[#FC7729] text-white py-3 px-6 rounded-lg font-medium hover:bg-[#FCAA29] transition-colors duration-300 flex items-center">
              View Cart (
              {cart.items.reduce((total, item) => total + item.quantity, 0)})
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

        <div className="max-w-xl mx-auto mb-10">
          <div className="relative rounded-full overflow-hidden border-2 border-[#FC7729] shadow-md">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full py-3 px-6 bg-white text-[#1D1D1D] focus:outline-none"
            />
            <button className="absolute right-0 top-0 h-full px-6 bg-[#FC7729] text-white">
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

        {products.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg shadow-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 text-[#FCAA29] mx-auto mb-4"
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
            <p className="text-[#FC7729] text-xl font-semibold">
              No products found.
            </p>
            <p className="text-gray-600 mt-2">
              Please add some products to the database.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-lg overflow-hidden shadow-lg transform transition-transform hover:-translate-y-2"
              >
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute top-0 right-0 bg-[#FCAA29] text-white px-3 py-1 rounded-bl-lg font-semibold">
                    ${product.price}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center mb-3">
                    <span className="bg-[#F2C94C] px-3 py-1 rounded-full text-sm text-[#303241] font-medium">
                      {product.category}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-[#303241] mb-3">
                    {product.name}
                  </h2>
                  <div className="mt-6 flex gap-3">
                    <Link href={`/animal-products/${product._id}`}>
                      <button className="flex-1 bg-[#FC7729] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#FCAA29] transition-colors duration-300 flex items-center justify-center">
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
                        className="flex-1 bg-[#FCAA29] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#FC7729] transition-colors duration-300 flex items-center justify-center"
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
                        Out of Stock
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-16 p-6 text-center">
          <div className="inline-block px-6 py-2 bg-[#303241] text-white rounded-full mb-4">
            <span className="text-[#FCAA29] font-bold">Pet</span>
            <span className="text-white font-bold">Care</span>
            <span className="text-[#FC7729] font-bold">Plus</span>
          </div>
          <p className="text-[#1D1D1D] text-sm">
            Providing the best medical products for your beloved pets
          </p>
        </div>
      </div>
    </div>
  );
}
