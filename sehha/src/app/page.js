"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Shield,
  FileText,
  Calendar,
  CreditCard,
  BarChart2,
  UserPlus,
  Clipboard,
  MessageSquare,
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  Youtube,
  Search,
  ArrowLeft,
  ArrowDown,
  ArrowUp,
  ArrowLeftCircle,
  ArrowRightCircle,
  ArrowUpCircle,
  ArrowDownCircle,
  MapPin,
  Phone,
  LineChart,
  User,
  CalendarClock,
  Mail,
  FileCheck,
  ClipboardList,
  PieChart,
  Settings,
  Bell,
  ArrowRight,
  Smile,
  PawPrint,
  Heart,
  Award,
  Clock,
  X,
  Pill,
  Syringe,
  Bone,
  Cat,
  Dog,
  Bird,
  Rabbit,
  ShoppingCart,
  PhoneCall,
  Stethoscope,
  Trash2,
} from "lucide-react";
import Link from "next/link";

// ------------------------------------------------
// UPDATED HOME COMPONENT
// ------------------------------------------------
export default function Home() {
  // ------------------------------------------------
  // 1) Remove all the old static article arrays
  // ------------------------------------------------

  // Manages the open/close state of the article popup
  const [selectedArticle, setSelectedArticle] = useState(null);

  // Manages fetched articles
  const [fetchedArticles, setFetchedArticles] = useState([]);
  const [featuredArticle, setFeaturedArticle] = useState(null);

  // Loading & error states for articles
  const [articlesLoading, setArticlesLoading] = useState(false);
  const [articlesError, setArticlesError] = useState(null);

  // ------------------------------------------------
  // 2) Fetch articles from /api/articles
  // ------------------------------------------------
  useEffect(() => {
    async function fetchArticles() {
      try {
        setArticlesLoading(true);
        const response = await axios.get("/api/articles");
        // Assuming your API returns an array of articles:
        const allArticles = response.data || [];
        if (allArticles.length > 0) {
          // Use the first as featured, the rest as a normal list
          setFeaturedArticle(allArticles[0]);
          setFetchedArticles(allArticles.slice(1));
        } else {
          setFetchedArticles([]);
          setFeaturedArticle(null);
        }
        setArticlesError(null);
      } catch (error) {
        setArticlesError(
          error?.response?.data?.error || "Failed to fetch articles"
        );
      } finally {
        setArticlesLoading(false);
      }
    }
    fetchArticles();
  }, []);

  // ------------------------------------------------
  // 3) Rest of your existing states & logic
  // ------------------------------------------------
  const closePopup = () => {
    setSelectedArticle(null);
    document.body.style.overflow = "auto";
  };

  const openArticlePopup = (article) => {
    setSelectedArticle(article);
    // Prevent background scroll
    document.body.style.overflow = "hidden";
  };

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  // ------------------------------------------------
  // DYNAMIC SHOP FETCHING (unchanged from your code)
  // ------------------------------------------------
  const [products, setProducts] = useState([]);
  const [shopLoading, setShopLoading] = useState(false);
  const [shopError, setShopError] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/animal-products"
        );
        if (Array.isArray(response.data.products)) {
          setProducts(response.data.products);
        } else {
          setProducts([]);
        }
      } catch (err) {
        console.error(err);
        setProducts([]);
      }
    }
    fetchProducts();
  }, []);

  // ------------------------------------------------
  // Example “Features” array, etc. remain unchanged
  // ------------------------------------------------
  const features = [
    {
      icon: <Stethoscope size={28} />,
      title: "24/7 Emergency Care",
      description:
        "Round-the-clock veterinary services for urgent pet health situations with specialized equipment",
    },
    {
      icon: <FileText size={28} />,
      title: "Digital Health Records",
      description:
        "Comprehensive pet health tracking with instant access to medical history and treatment plans",
    },
    {
      icon: <Calendar size={28} />,
      title: "Easy Appointment Booking",
      description:
        "Convenient online scheduling with automatic reminders for check-ups and vaccinations",
    },
    {
      icon: <Pill size={28} />,
      title: "In-House Pharmacy",
      description:
        "Full-service pet pharmacy with prescription medications, supplements, and specialized diets",
    },
    {
      icon: <BarChart2 size={28} />,
      title: "Advanced Diagnostics",
      description:
        "State-of-the-art laboratory and imaging services for accurate, rapid diagnoses",
    },
    {
      icon: <UserPlus size={28} />,
      title: "Pet Parent Portal",
      description:
        "Self-service platform for appointments, prescriptions, and accessing medical records",
    },
    {
      icon: <Syringe size={28} />,
      title: "Preventive Care Plans",
      description:
        "Customized wellness programs to keep your pets healthy and prevent common diseases",
    },
    {
      icon: <MessageSquare size={28} />,
      title: "Telehealth Consultations",
      description:
        "Virtual veterinary consultations for minor concerns and follow-up appointments",
    },
  ];

  const userTypes = [
    {
      icon: <Dog size={32} />,
      emoji: "🐕",
      title: "For Dog Owners",
      color: "#FCAA29",
      description: "Specialized care for your canine companions",
      features: [
        { icon: <Bone size={18} />, text: "Breed-specific health monitoring" },
        { icon: <Heart size={18} />, text: "Preventive care & vaccinations" },
        {
          icon: <Pill size={18} />,
          text: "Prescription medications & supplements",
        },
      ],
    },
    {
      icon: <Cat size={32} />,
      emoji: "🐈",
      title: "For Cat Owners",
      color: "#FC7729",
      description: "Feline-focused healthcare solutions",
      features: [
        { icon: <PawPrint size={18} />, text: "Behavioral consultations" },
        { icon: <Pill size={18} />, text: "Specialized feline medications" },
        { icon: <Shield size={18} />, text: "Dental care & grooming services" },
      ],
    },
    {
      icon: <Bird size={32} />,
      emoji: "🦜",
      title: "For Exotic Pet Owners",
      color: "#FCAA29",
      description: "Expert care for birds, reptiles & small mammals",
      features: [
        {
          icon: <Stethoscope size={18} />,
          text: "Specialized exotic animal medicine",
        },
        {
          icon: <FileText size={18} />,
          text: "Species-specific nutritional guidance",
        },
        {
          icon: <Clipboard size={18} />,
          text: "Habitat & environmental consultations",
        },
      ],
    },
  ];

  // ------------------------------------------------
  // 4) Render everything
  // ------------------------------------------------
  return (
    <main className="bg-[#1D1D1D] text-[#FFFFFF]">
      {/* Hero Section with Video Background */}
      <div className="relative w-full h-screen overflow-hidden">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-[#000000]/60 z-10" />

        {/* Content */}
        <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4">
          <div className="animate-fadeIn">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-[#FFFFFF] drop-shadow-lg">
              <span className="text-[#FCAA29]">PawCare</span> Animal Hospital
            </h1>
            <p className="text-lg md:text-xl mb-8 text-[#FFFFFF] max-w-2xl">
              Expert veterinary care and premium pet medications for your
              beloved companions
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#book-now"
                className="bg-[#FC7729] hover:bg-[#FCAA29] text-[#FFFFFF] px-8 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105"
              >
                Book Appointment
              </a>
              <a
                href="#shop"
                className="bg-[#303241] hover:bg-[#FCAA29] text-[#FFFFFF] border border-[#FCAA29] px-8 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105"
              >
                Shop Medicines
              </a>
            </div>
          </div>
        </div>

        {/* Scroll Down Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
          <svg
            className="w-6 h-6 text-[#FFFFFF]"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </div>

      {/* Services Section */}
      <section className="py-20 bg-[#ffffff]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fadeIn">
            <div className="inline-block px-4 py-1 rounded-full bg-[#FCAA29]/20 text-[#FCAA29] font-medium text-sm mb-4">
              OUR SERVICES
            </div>
            <h2 className="text-4xl font-bold text-[#000000] mb-4">
              Comprehensive Pet Healthcare
            </h2>
            <p className="text-lg text-[#000000] max-w-2xl mx-auto">
              State-of-the-art veterinary services designed to keep your pets
              healthy, happy, and thriving throughout every stage of their lives
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-[#303241] rounded-xl p-6 shadow-lg border border-[#C8C8C8]/10 transition-all duration-300 hover:shadow-xl hover:border-[#FCAA29]/20 hover:translate-y-[-5px] group animate-fadeIn"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="bg-[#FCAA29]/10 text-[#FCAA29] rounded-xl p-3 inline-flex mb-4 group-hover:bg-[#FCAA29] group-hover:text-[#303241] transition-colors duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-[#FFFFFF] mb-2">
                  {feature.title}
                </h3>
                <p className="text-[#C8C8C8]">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shop Section (Dynamic) */}
      {/* Shop Section (Dynamic) */}
      <section className="py-20 bg-[#ffffff]" id="shop">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fadeIn">
            <div className="inline-block px-4 py-1 rounded-full bg-[#FC7729]/20 text-[#FC7729] font-medium text-sm mb-4">
              PET PHARMACY
            </div>
            <h2 className="text-4xl font-bold text-[#000000] mb-4">
              Quality Pet Medications &amp; Supplies
            </h2>
            <p className="text-lg text-[#000000] max-w-2xl mx-auto">
              Browse our wide selection of veterinary-approved medications,
              supplements, and specialty pet products
            </p>
          </div>

          {/* Loading or Error States */}
          {shopLoading ? (
            <div className="text-center text-[#C8C8C8]">
              Loading products...
            </div>
          ) : shopError ? (
            <div className="text-center text-red-400">{shopError}</div>
          ) : products.length === 0 ? (
            <div className="text-center text-[#C8C8C8]">No products found.</div>
          ) : (
            // Product Grid limited to 4 products
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.slice(0, 4).map((product, index) => {
                const ratingValue = Math.floor(product.rating || 0);
                return (
                  <div
                    key={product._id || index}
                    className="bg-[#303241] rounded-xl overflow-hidden shadow-lg border border-[#C8C8C8]/10 transition-all duration-300 hover:shadow-xl hover:border-[#FC7729]/20 group animate-fadeIn"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="relative">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      {product.badge && (
                        <div className="absolute top-2 right-2 bg-[#FC7729] text-white text-xs px-2 py-1 rounded-full">
                          {product.badge}
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <div className="text-[#C8C8C8] text-sm mb-1">
                        {product.category}
                      </div>
                      <h3 className="text-lg font-semibold text-[#FFFFFF] mb-2">
                        {product.name}
                      </h3>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-[#FCAA29] font-bold">
                          {product.price}
                        </span>
                        <div className="flex items-center">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <svg
                                key={i}
                                className={`w-4 h-4 ${
                                  i < ratingValue
                                    ? "text-[#FCAA29]"
                                    : "text-[#C8C8C8]"
                                }`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                              </svg>
                            ))}
                          </div>
                          <span className="text-[#C8C8C8] text-xs ml-1">
                            {product.rating?.toFixed(1) || "0.0"}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          setCartItems([...cartItems, product]);
                          setIsCartOpen(true);
                        }}
                        className="w-full bg-[#FC7729] hover:bg-[#FCAA29] text-white py-2 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2"
                      >
                        <ShoppingCart size={16} />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <div className="mt-12 text-center">
            <Link href="/shop">
              <button className="px-8 py-3 bg-[#303241] text-[#FFFFFF] rounded-lg font-medium border border-[#FC7729] hover:bg-[#FC7729] hover:border-transparent transition-all duration-300 flex items-center gap-2 mx-auto">
                View All Products
                <ArrowRight size={16} />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Specialized Care Section */}
      <section className="py-20 bg-[#ffffff]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fadeIn">
            <span className="inline-block px-4 py-1 rounded-full bg-[#FCAA29]/20 text-[#FCAA29] font-medium text-sm mb-4">
              PET CARE
            </span>
            <h2 className="text-4xl font-bold text-[#000000] mb-4">
              Specialized Care For Every Pet
            </h2>
            <p className="text-lg text-[#000000] max-w-2xl mx-auto">
              Tailored veterinary services and products for different types of
              pets and their unique needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {userTypes.map((type, index) => (
              <div
                key={index}
                className="relative group animate-fadeIn"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#FCAA29] to-[#FC7729] rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                <div className="relative bg-[#303241] rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:translate-y-[-5px] h-full flex flex-col">
                  <div className="flex items-center mb-6">
                    <div
                      className="flex items-center justify-center w-14 h-14 rounded-full text-white"
                      style={{ backgroundColor: type.color }}
                    >
                      <span className="text-3xl">{type.emoji}</span>
                    </div>
                    <h3 className="ml-4 text-2xl font-bold text-[#FFFFFF]">
                      {type.title}
                    </h3>
                  </div>

                  <p className="text-[#C8C8C8] mb-6">{type.description}</p>

                  <div className="mt-auto">
                    {type.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-start mb-4 last:mb-0 group"
                      >
                        <div className="p-1 rounded-full mr-3 flex-shrink-0 mt-0.5 text-[#FCAA29] bg-[#FCAA29]/10 group-hover:bg-[#FCAA29] group-hover:text-[#303241] transition-colors duration-300">
                          {feature.icon}
                        </div>
                        <span className="text-[#C8C8C8] group-hover:text-[#FFFFFF] transition-colors duration-300">
                          {feature.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pet Health Resources - using fetched articles now! */}
      <section className="py-20 bg-[#ffffff]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fadeIn">
            <span className="inline-block px-4 py-1 rounded-full bg-[#FC7729]/20 text-[#FC7729] font-medium text-sm mb-4">
              PET HEALTH RESOURCES
            </span>
            <h2 className="text-4xl font-bold text-[#000000] mb-4">
              Expert Advice &amp; Resources
            </h2>
            <p className="text-lg text-[#000000] max-w-2xl mx-auto">
              Stay informed with our collection of veterinarian-approved
              articles on pet health, care guidelines, and emergency
              preparedness
            </p>
          </div>

          {/* Loading/Error/Empty states for Articles */}
          {articlesLoading ? (
            <div className="text-center text-[#C8C8C8]">
              Loading articles...
            </div>
          ) : articlesError ? (
            <div className="text-center text-red-400">{articlesError}</div>
          ) : !featuredArticle && fetchedArticles.length === 0 ? (
            <div className="text-center text-[#C8C8C8]">No articles found.</div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Featured Article (if any) */}
              {featuredArticle && (
                <div className="lg:col-span-3 animate-fadeIn">
                  <div
                    className="relative overflow-hidden rounded-2xl cursor-pointer group"
                    onClick={() => openArticlePopup(featuredArticle)}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10"></div>
                    <img
                      src={featuredArticle.image}
                      alt={featuredArticle.title}
                      className="w-full h-96 object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                      {featuredArticle.tags && (
                        <div className="flex flex-wrap gap-2 mb-3">
                          {featuredArticle.tags.map((tag, idx) => (
                            <span
                              key={idx}
                              className="bg-[#FCAA29] text-[#000000] text-xs font-medium px-3 py-1 rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                      <h3 className="text-2xl font-bold text-[#FFFFFF] mb-2">
                        {featuredArticle.title}
                      </h3>
                      <p className="text-[#C8C8C8] mb-4">
                        {featuredArticle.summary}
                      </p>
                      {featuredArticle.readTime && (
                        <div className="flex items-center text-sm text-[#C8C8C8]">
                          <Clock size={16} className="mr-1" />
                          {featuredArticle.readTime}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* The rest of the articles */}
              {fetchedArticles.map((article, index) => (
                <div
                  key={index}
                  className="bg-[#303241] rounded-xl overflow-hidden shadow-lg border border-[#C8C8C8]/10 hover:border-[#FCAA29]/30 transition-all duration-300 cursor-pointer group animate-fadeIn"
                  style={{ animationDelay: `${index * 0.15}s` }}
                  onClick={() => openArticlePopup(article)}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-5">
                    {article.tags?.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {article.tags.slice(0, 2).map((tag, idx) => (
                          <span
                            key={idx}
                            className="bg-[#FCAA29]/20 text-[#FCAA29] text-xs px-3 py-1 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    <h3 className="text-xl font-bold text-[#FFFFFF] mb-2 group-hover:text-[#FCAA29] transition-colors">
                      {article.title}
                    </h3>
                    {article.summary && (
                      <p className="text-[#C8C8C8] mb-4 line-clamp-2">
                        {article.summary}
                      </p>
                    )}
                    {article.readTime && (
                      <div className="flex items-center text-sm text-[#C8C8C8]">
                        <Clock size={16} className="mr-1" />
                        {article.readTime}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-12 text-center">
            <Link href="/resources">
              <button className="px-8 py-3 bg-[#303241] text-[#FFFFFF] rounded-lg font-medium border border-[#FCAA29] hover:bg-[#FCAA29] hover:text-[#000000] hover:border-transparent transition-all duration-300 flex items-center gap-2 mx-auto">
                View All Resources
                <ArrowRight size={16} />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Article Popup */}
      {selectedArticle && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto bg-[#000000]/80 flex items-center justify-center p-4"
          onClick={closePopup}
        >
          <div
            className="bg-[#303241] rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-[#303241] p-4 border-b border-[#C8C8C8]/10 flex justify-between items-center z-10">
              <h3 className="text-xl font-bold text-[#FFFFFF]">
                {selectedArticle.title}
              </h3>
              <button
                onClick={closePopup}
                className="p-2 rounded-full hover:bg-[#303241] transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6">
              {selectedArticle.tags && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedArticle.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="bg-[#FCAA29]/20 text-[#FCAA29] text-xs px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                  {selectedArticle.readTime && (
                    <span className="bg-[#303241] text-[#C8C8C8] text-xs px-3 py-1 rounded-full flex items-center">
                      <Clock size={14} className="mr-1" />
                      {selectedArticle.readTime}
                    </span>
                  )}
                </div>
              )}

              {/* Article Image */}
              {selectedArticle.image && (
                <img
                  src={selectedArticle.image}
                  alt={selectedArticle.title}
                  className="w-full h-64 object-cover rounded-lg mb-6"
                />
              )}

              <div className="prose prose-invert max-w-none">
                {/* If your API articles have full content in "content" instead of "fullContent",
                    just switch to article.content here. */}
                {(selectedArticle.fullContent || selectedArticle.content || "")
                  .split("\n\n")
                  .map((paragraph, idx) => {
                    // If your paragraphs contain markdown headings like "**Some Title:**"
                    // you can parse them here. The below is a naive example:
                    if (
                      paragraph.startsWith("**") &&
                      paragraph.endsWith(":**")
                    ) {
                      return (
                        <h4
                          key={idx}
                          className="text-xl font-bold text-[#FFFFFF] mt-6 mb-3"
                        >
                          {paragraph.replace(/\*\*/g, "")}
                        </h4>
                      );
                    } else {
                      return (
                        <p key={idx} className="mb-4 text-[#C8C8C8]">
                          {paragraph}
                        </p>
                      );
                    }
                  })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Shopping Cart Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-full md:w-96 bg-[#1D1D1D] shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b border-[#C8C8C8]/10">
          <h3 className="text-xl font-bold text-[#FFFFFF]">Your Cart</h3>
          <button
            onClick={toggleCart}
            className="p-2 rounded-full hover:bg-[#303241] transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-4 h-[calc(100%-180px)] overflow-y-auto">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingCart size={60} className="text-[#C8C8C8]/30 mb-4" />
              <p className="text-[#C8C8C8] mb-2">Your cart is empty</p>
              <p className="text-[#C8C8C8]/60 text-sm">
                Browse our products and add items to your cart
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-4 border-b border-[#C8C8C8]/10 pb-4"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <h4 className="text-[#FFFFFF] font-medium">{item.name}</h4>
                    <p className="text-[#C8C8C8] text-sm">{item.category}</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-[#FCAA29] font-bold">
                        {item.price}
                      </span>
                      <div className="flex items-center">
                        <button className="w-6 h-6 bg-[#303241] rounded-full text-[#FFFFFF] flex items-center justify-center">
                          -
                        </button>
                        <span className="mx-2 text-[#FFFFFF]">1</span>
                        <button className="w-6 h-6 bg-[#303241] rounded-full text-[#FFFFFF] flex items-center justify-center">
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <button className="text-[#C8C8C8] hover:text-[#FC7729]">
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="absolute bottom-0 left-0 right-0 bg-[#1D1D1D] border-t border-[#C8C8C8]/10 p-4">
          <div className="flex justify-between mb-4">
            <span className="text-[#C8C8C8]">Total:</span>
            {/* Replace $0.00 with actual total calculation if desired */}
            <span className="text-[#FCAA29] font-bold">$0.00</span>
          </div>
          <button className="w-full bg-[#FC7729] hover:bg-[#FCAA29] text-[#FFFFFF] py-3 rounded-lg font-medium transition-colors duration-300 flex items-center justify-center gap-2">
            Checkout
          </button>
        </div>
      </div>
    </main>
  );
}
