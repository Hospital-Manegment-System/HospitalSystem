"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { ShoppingCart } from "lucide-react";

// Updated navigation links as per the requirement
const navLinks = [
  { name: "Home", path: "/" },
  { name: "Pet Products", path: "/pet-products" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
  { name: "Appointment", path: "/appointment" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check for token on component mount (client-side only)
  useEffect(() => {
    // If your token is stored in cookies as "token"
    if (typeof document !== "undefined") {
      const tokenExists = document.cookie.includes("token=");
      setIsLoggedIn(tokenExists);
    }
  }, []);

  // Handler to perform logout action
  const handleLogout = () => {
    // Remove the token from the cookies by setting its expiry in the past
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setIsLoggedIn(false);
    // Optionally, you can redirect the user to the home page after logout
    router.push("/");
  };

  // Color palette from your requirements
  const colors = {
    gold: "#FCAA29",
    white: "#FFFFFF",
    lightGray: "#C8C8C8",
    black: "#000000",
    darkBlue: "#303241",
    yellow: "#F2C94C",
    darkGray: "#1D1D1D",
    orange: "#FC7729",
  };

  return (
    <nav className="bg-[#303241] shadow-lg border-b-4 border-[#FC7729]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-[#F2C94C] text-2xl mr-2">🐾</span>
              <span className="text-[#FFFFFF] font-bold text-xl">VetNova</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 
                    ${
                      pathname === link.path
                        ? "bg-[#FCAA29] text-[#1D1D1D]"
                        : "text-[#FFFFFF] hover:bg-[#1D1D1D] hover:text-[#F2C94C]"
                    }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Conditional Buttons for Desktop */}
          <div className="hidden md:flex items-center space-x-3">
            {isLoggedIn ? (
              // If logged in, show Cart icon and Logout button
              <>
                <Link
                  href="/cart"
                  className="flex items-center px-4 py-2 rounded-md text-sm transition-all duration-200 text-[#FFFFFF] hover:text-[#F2C94C]"
                >
                  <ShoppingCart size={20} />
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-[#FC7729] text-[#FFFFFF] hover:bg-[#FCAA29] px-4 py-2 rounded-md font-bold text-sm shadow-md transition-all duration-200 border border-[#FFFFFF]"
                >
                  Logout
                </button>
              </>
            ) : (
              // If not logged in, show Register and Login buttons
              <>
                <Link
                  href="/Register"
                  className="bg-[#F2C94C] text-[#1D1D1D] hover:bg-[#FCAA29] px-4 py-2 rounded-md font-bold text-sm shadow-md transition-all duration-200 border border-[#FFFFFF]"
                >
                  Register
                </Link>
                <Link
                  href="/Login"
                  className="bg-[#FC7729] text-[#FFFFFF] hover:bg-[#FCAA29] px-4 py-2 rounded-md font-bold text-sm shadow-md transition-all duration-200 border border-[#FFFFFF]"
                >
                  Login
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-[#FFFFFF] hover:text-[#F2C94C] focus:outline-none"
              aria-label="Toggle menu"
            >
              {!isMenuOpen ? (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-[#303241]">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`block px-3 py-2 rounded-md text-base font-medium
                  ${
                    pathname === link.path
                      ? "bg-[#FCAA29] text-[#1D1D1D]"
                      : "text-[#FFFFFF] hover:bg-[#1D1D1D] hover:text-[#F2C94C]"
                  }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="flex flex-col space-y-2 mt-4">
              {isLoggedIn ? (
                <>
                  <Link
                    href="/cart"
                    className="block w-full text-center px-4 py-2 text-[#FFFFFF] hover:text-[#F2C94C]"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="flex justify-center">
                      <ShoppingCart size={20} />
                    </div>
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-center bg-[#FC7729] text-[#FFFFFF] hover:bg-[#FCAA29] px-4 py-2 rounded-md font-bold border border-[#FFFFFF]"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/Register"
                    className="block w-full text-center bg-[#F2C94C] text-[#1D1D1D] hover:bg-[#FCAA29] px-4 py-2 rounded-md font-bold border border-[#FFFFFF]"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Register
                  </Link>
                  <Link
                    href="/Login"
                    className="block w-full text-center bg-[#FC7729] text-[#FFFFFF] hover:bg-[#FCAA29] px-4 py-2 rounded-md font-bold border border-[#FFFFFF]"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
