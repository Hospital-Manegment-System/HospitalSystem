// src/app/cart/page.js
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const [cart, setCart] = useState({ items: [], totalAmount: 0 });
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const userId = "guest"; // Replace with real user ID if using authentication

  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/cart?userId=${userId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch cart");
      }
      const data = await response.json();
      setCart(data);
    } catch (error) {
      console.error("Error fetching cart:", error);
      setCart({ items: [], totalAmount: 0 });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const updateCartItem = async (productId, action) => {
    try {
      const response = await fetch("/api/cart", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, productId, action }),
      });

      if (!response.ok) {
        throw new Error("Failed to update cart");
      }

      const updatedCart = await response.json();
      setCart(updatedCart);
    } catch (error) {
      console.error("Error updating cart:", error);
      alert("Failed to update cart.");
    }
  };

  const clearCart = async () => {
    try {
      const response = await fetch(`/api/cart?userId=${userId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to clear cart");
      }

      setCart({ items: [], totalAmount: 0 });
      alert("Checkout successful! Your cart has been cleared.");
      router.push("/animal-products");
    } catch (error) {
      console.error("Error clearing cart:", error);
      alert("Failed to clear cart.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#FFFFFF] to-[#C8C8C8] flex items-center justify-center">
        <p className="text-[#303241] text-xl">Loading...</p>
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
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3z" />
              <path d="M16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-[#303241]">Your Cart</h1>
        </div>

        {cart.items.length === 0 ? (
          <div className="bg-white rounded-lg shadow-lg p-8 text-center max-w-2xl mx-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-20 w-20 text-[#FC7729] mx-auto mb-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3z" />
              <path d="M16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
            </svg>
            <h2 className="text-2xl font-bold text-[#303241] mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Looks like you haven't added any products yet.</p>
            <Link href="/animal-products">
              <button className="bg-[#FCAA29] text-white py-3 px-6 rounded-lg font-medium hover:bg-[#FC7729] transition-colors duration-300">
                Continue Shopping
              </button>
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="grid grid-cols-1 gap-6">
              {cart.items.map((item) => (
                <div
                  key={item.productId.toString()}
                  className="flex items-center border-b border-gray-200 py-4"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-lg mr-4"
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-[#303241]">{item.name}</h3>
                    <p className="text-gray-600">Price: ${item.price}</p>
                    <p className="text-gray-600">Subtotal: ${item.subtotal}</p>
                    <div className="flex items-center mt-2">
                      <button
                        onClick={() => updateCartItem(item.productId.toString(), "decrease")}
                        className="bg-[#FC7729] text-white px-3 py-1 rounded-l-lg hover:bg-[#FCAA29]"
                      >
                        -
                      </button>
                      <span className="px-4 py-1 bg-gray-100">{item.quantity}</span>
                      <button
                        onClick={() => updateCartItem(item.productId.toString(), "increase")}
                        className="bg-[#FC7729] text-white px-3 py-1 rounded-r-lg hover:bg-[#FCAA29]"
                      >
                        +
                      </button>
                      <button
                        onClick={() => updateCartItem(item.productId.toString(), "remove")}
                        className="ml-4 text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-between items-center">
              <h3 className="text-2xl font-bold text-[#303241]">
                Total: ${cart.totalAmount.toFixed(2)}
              </h3>
              <button
                onClick={clearCart}
                className="bg-[#FC7729] text-white py-3 px-6 rounded-lg font-medium hover:bg-[#FCAA29] transition-colors duration-300"
              >
                Proceed to Checkout
              </button>
            </div>
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