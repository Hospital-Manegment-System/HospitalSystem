// src/app/animal-products/[id]/page.js
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

async function fetchProduct(id) {
  try {
    const res = await fetch(`http://localhost:3000/api/animal-products/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch product");
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
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

export default function ProductDetailPage({ params }) {
  const { id } = params;
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState({ items: [], totalAmount: 0 });
  const router = useRouter();
  const userId = "guest"; // Replace with real user ID if using authentication

  useEffect(() => {
    // Fetch product
    fetchProduct(id)
      .then((data) => {
        console.log("Fetched product:", data);
        setProduct(data);
      })
      .catch((err) => setError(err));

    // Fetch cart
    fetchCart(userId).then((data) => {
      console.log("Fetched cart:", data);
      setCart(data);
    });
  }, [id]);

  const addToCart = async () => {
    if (!product) return;
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
        throw new Error(`Failed to add to cart: ${responseData.error || "Unknown error"}`);
      }

      setCart(responseData);
      setTimeout(() => {
        router.push("/cart");
      }, 100);
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert(`Failed to add to cart: ${error.message}`);
    }
  };

  if (!product) {
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
              Product Not Found
            </h1>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 text-center max-w-2xl mx-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-20 w-20 text-[#FC7729] mx-auto mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 18a6 6 0 100-12 6 6 0 000 12z"
              />
            </svg>
            <h2 className="text-2xl font-bold text-[#303241] mb-4">
              We couldn't find this product
            </h2>
            <p className="text-gray-600 mb-8">
              The product you are looking for does not exist or may have been removed.
            </p>
            <Link href="/animal-products">
              <button className="bg-[#FCAA29] text-white py-3 px-6 rounded-lg font-medium hover:bg-[#FC7729] transition-colors duration-300">
                Return to Products
              </button>
            </Link>
          </div>

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
            Product Details
          </h1>
        </div>

        <div className="mb-6">
          <Link href="/animal-products">
            <button className="flex items-center text-[#303241] hover:text-[#FC7729] transition-colors duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
              Back to Products
            </button>
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-6 lg:p-8">
              <div className="relative overflow-hidden rounded-lg shadow-md">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-auto"
                />
                <div className="absolute top-4 right-4 bg-[#FCAA29] text-white px-4 py-2 rounded-full font-bold shadow-md">
                  ${product.price}
                </div>
              </div>

              <div className="mt-6">
                <span className="inline-block bg-[#F2C94C] px-4 py-2 rounded-full text-[#303241] font-semibold">
                  {product.category}
                </span>
              </div>
            </div>

            <div className="p-6 lg:p-8 bg-gray-50">
              <h2 className="text-3xl font-bold text-[#303241] mb-4">
                {product.name}
              </h2>

              <div className="mb-6 p-4 bg-white rounded-lg border-l-4 border-[#FCAA29]">
                <h3 className="text-lg font-semibold text-[#303241] mb-2">
                  Description
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                  <div className="text-sm text-gray-500 mb-1">Price</div>
                  <div className="text-xl font-bold text-[#FC7729]">
                    ${product.price}
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                  <div className="text-sm text-gray-500 mb-1">Stock</div>
                  <div className="flex items-center">
                    <span
                      className={`inline-block w-3 h-3 rounded-full mr-2 ${
                        product.stock > 0 ? "bg-green-500" : "bg-red-500"
                      }`}
                    ></span>
                    <span className="text-xl font-bold text-[#303241]">
                      {product.stock}
                    </span>
                    <span className="ml-2 text-gray-600">units available</span>
                  </div>
                </div>
              </div>

              {product.stock > 0 ? (
                <button
                  onClick={addToCart}
                  className="w-full bg-[#FC7729] text-white py-4 px-6 rounded-lg font-bold hover:bg-[#FCAA29] transition-colors duration-300 flex items-center justify-center"
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
                  className="w-full bg-gray-300 text-gray-600 py-4 px-6 rounded-lg font-bold cursor-not-allowed flex items-center justify-center"
                >
                  Out of Stock
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="mt-12">
          <h3 className="text-2xl font-bold text-[#303241] mb-6">
            You might also like
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="h-40 bg-gray-200"></div>
                <div className="p-4">
                  <div className="h-4 bg-gray-200 rounded mb-2 w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

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