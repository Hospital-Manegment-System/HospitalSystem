"use client";
import React, { useState, useEffect } from "react";
import {
  Shield,
  FileText,
  Calendar,
  CreditCard,
  BarChart2,
  UserPlus,
  Clipboard,
  MessageSquare,
  LucideStethoscope,
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
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [articles, setArticles] = useState([
    {
      title: "Common Pet Vaccinations: What Every Owner Should Know",
      summary: "Learn about the essential vaccinations for your pets, including schedules, benefits, and potential side effects to watch for.",
      image: "/api/placeholder/600/400",
      tags: ["Vaccinations", "Preventive Care", "Pet Health"],
      readTime: "8 min read",
      fullContent: "Vaccines are crucial for protecting your pets against serious diseases. This comprehensive guide explains the core vaccinations for dogs, cats, and other common pets.\n\n**Core Vaccinations for Dogs:**\n\n- **Rabies**: Required by law in most places, protects against the fatal rabies virus.\n- **Distemper**: Protects against a highly contagious and serious disease that affects the respiratory, gastrointestinal, and nervous systems.\n- **Parvovirus**: Guards against a highly contagious virus that causes severe gastrointestinal illness.\n- **Adenovirus**: Prevents infectious hepatitis.\n\n**Core Vaccinations for Cats:**\n\n- **Rabies**: Required by law in most places.\n- **FVRCP**: Protects against Feline Viral Rhinotracheitis, Calicivirus, and Panleukopenia.\n- **Feline Leukemia**: Recommended for cats with outdoor access.\n\n**Vaccination Schedules:**\n\nPuppies and kittens typically start their vaccination series at 6-8 weeks of age, with boosters every 3-4 weeks until they're about 16 weeks old. Adult pets may need boosters annually or every three years, depending on the vaccine.\n\n**Possible Side Effects:**\n\nMost pets experience no or very mild side effects from vaccines. Some may have slight fever, lethargy, or soreness at the injection site for 1-2 days. Severe reactions are rare but can include facial swelling, vomiting, or breathing difficulties, which require immediate veterinary attention.\n\n**Special Considerations:**\n\nPets with certain health conditions may need adjusted vaccination schedules. Always discuss your pet's specific health needs with your veterinarian to develop a personalized vaccination plan."
    },
    {
      title: "Recognizing Signs of Dental Disease in Pets",
      summary: "Dental problems are common in pets but often go unnoticed. Learn to spot the warning signs early and prevent serious complications.",
      image: "/api/placeholder/600/400",
      tags: ["Dental Health", "Prevention", "Pet Care"],
      readTime: "6 min read",
      fullContent: "Dental disease affects over 80% of dogs and 70% of cats by age three, but many pet owners miss the early warning signs. This guide helps you identify dental problems before they become serious health issues.\n\n**Common Signs of Dental Disease:**\n\n- Bad breath (beyond normal 'dog breath')\n- Yellow or brown tartar buildup on teeth\n- Red, swollen, or bleeding gums\n- Difficulty eating or dropping food\n- Pawing at the mouth or face\n- Excessive drooling\n- Loss of appetite or weight loss\n- Loose or missing teeth\n\n**Prevention Tips:**\n\n- Regular brushing (ideally daily) with pet-specific toothpaste\n- Dental treats and toys designed to reduce plaque\n- Prescription dental diets that help clean teeth during chewing\n- Professional dental cleanings as recommended by your veterinarian\n\n**The Danger of Untreated Dental Disease:**\n\nLeft untreated, dental disease can lead to pain, tooth loss, and potentially serious infections that can affect the heart, liver, and kidneys. Regular dental care is essential for your pet's overall health and comfort.\n\n**When to Seek Veterinary Care:**\n\nIf you notice any signs of dental disease, schedule a veterinary appointment. Annual dental check-ups are recommended for all pets, with professional cleanings as advised by your veterinarian based on your pet's specific needs."
    },
    {
      title: "Managing Arthritis in Senior Pets",
      summary: "Arthritis affects many older pets. Discover effective strategies to keep your aging companion comfortable and mobile.",
      image: "/api/placeholder/600/400",
      tags: ["Senior Pets", "Pain Management", "Mobility"],
      readTime: "7 min read",
      fullContent: "As pets age, many develop arthritis—a painful inflammation of the joints that can significantly impact their quality of life. This article explores how to recognize arthritis symptoms and implement a comprehensive management plan.\n\n**Recognizing Arthritis Symptoms:**\n\n- Reluctance to walk, run, climb stairs, or jump\n- Stiffness, especially after resting or in cold weather\n- Limping or favoring certain limbs\n- Difficulty standing up or lying down\n- Decreased activity or playfulness\n- Irritability when joints are touched\n- Muscle atrophy in affected limbs\n\n**Comprehensive Management Approaches:**\n\n1. **Veterinary Care:**\n   - Regular check-ups to monitor progression\n   - Prescription medications (NSAIDs, pain relievers)\n   - Therapeutic injections for joint support\n\n2. **Weight Management:**\n   - Maintaining healthy weight reduces stress on joints\n   - Special diets formulated for joint health and weight control\n\n3. **Exercise Modifications:**\n   - Gentle, regular exercise (short walks, swimming)\n   - Avoiding high-impact activities\n\n4. **Home Environment Adjustments:**\n   - Orthopedic beds for joint support\n   - Ramps instead of stairs\n   - Non-slip flooring for secure footing\n\n5. **Supplements:**\n   - Glucosamine and chondroitin\n   - Omega-3 fatty acids\n   - Green-lipped mussel extract\n\n6. **Physical Therapy:**\n   - Massage techniques\n   - Gentle stretching exercises\n   - Hydrotherapy or underwater treadmill\n\nWith proper management, most arthritic pets can maintain good mobility and quality of life well into their senior years. Always consult with your veterinarian before starting any new treatment or supplement regimen."
    },
    {
      title: "Essential First Aid for Pet Emergencies",
      summary: "Being prepared for pet emergencies can save lives. Learn basic first aid techniques and when to seek immediate veterinary care.",
      image: "/api/placeholder/600/400",
      tags: ["Emergency Care", "First Aid", "Pet Safety"],
      readTime: "9 min read",
      fullContent: "Pet emergencies can happen anytime, and knowing basic first aid can make a critical difference in your pet's outcome. This guide covers essential techniques and when to seek professional help.\n\n**Building a Pet First Aid Kit:**\n\n- Digital thermometer (normal temperature ranges: dogs 99.5-102.5°F, cats 100.5-102.5°F)\n- Gauze pads and rolls\n- Adhesive medical tape\n- Hydrogen peroxide 3% (only use if directed by a veterinarian)\n- Saline eye wash\n- Antiseptic wipes\n- Styptic powder (for nail bleeding)\n- Tweezers and blunt-ended scissors\n- Clean towels and blankets\n- Muzzle or cloth strips (even friendly pets may bite when in pain)\n- Carrier or transport container\n\n**Common Emergencies and First Aid Responses:**\n\n1. **Bleeding:**\n   - Apply direct pressure with clean gauze\n   - If bleeding doesn't stop within 5 minutes, seek immediate veterinary care\n\n2. **Choking:**\n   - If conscious, try to remove object carefully if visible\n   - Don't blindly stick fingers down throat\n   - If pet is unconscious, perform modified Heimlich maneuver appropriate for size\n\n3. **Seizures:**\n   - Move objects away that could cause injury\n   - Don't restrain the pet\n   - Note duration and symptoms\n   - Keep pet cool and quiet afterward\n\n4. **Heatstroke:**\n   - Move pet to cool area\n   - Apply room temperature (not cold) water to body\n   - Transport to vet immediately\n\n5. **Poisoning:**\n   - Remove pet from source\n   - Do NOT induce vomiting unless directed by a veterinarian\n   - Bring substance packaging to vet if possible\n\n**When to Seek Immediate Veterinary Care:**\n\n- Difficulty breathing\n- Prolonged seizures or multiple seizures\n- Collapse or unconsciousness\n- Severe bleeding that doesn't stop with pressure\n- Suspected broken bones\n- Ingestion of toxic substances\n- Severe trauma or injury\n- Inability to urinate\n- Bloated, distended abdomen\n\nPrepare in advance by locating your nearest emergency veterinary clinic and saving their number in your phone. Remember that first aid is not a substitute for veterinary care but can stabilize your pet until professional help is available."
    }
  ]);
  const [loading, setLoading] = useState(false);

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
        {
          icon: <Bone size={18} />,
          text: "Breed-specific health monitoring",
        },
        {
          icon: <Heart size={18} />,
          text: "Preventive care & vaccinations",
        },
        { icon: <Pill size={18} />, text: "Prescription medications & supplements" },
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

  const featuredArticle = {
    title: "Essential Pet First Aid: What Every Owner Should Know",
    summary:
      "Learn critical emergency care techniques to help your pet during medical emergencies until professional veterinary care is available",
    image: "/api/placeholder/600/400",
    tags: ["Emergency Care", "Pet Health", "First Aid"],
    readTime: "12 min read",
    fullContent:
      "Knowing basic first aid for your pet can be life-saving in an emergency situation. This comprehensive guide covers essential techniques that every pet owner should know.\n\n**Creating a Pet First Aid Kit:**\n\n- Digital thermometer (normal temperature ranges: dogs 99.5-102.5°F, cats 100.5-102.5°F)\n- Gauze pads and rolls for wounds or bandaging\n- Adhesive medical tape\n- Hydrogen peroxide 3% (only use if directed by a veterinarian)\n- Saline eye wash\n- Antiseptic wipes\n- Styptic powder for nail bleeding\n- Tweezers and blunt-ended scissors\n- Clean towels and blankets\n- Muzzle or cloth strips (even friendly pets may bite when in pain)\n- Pet carrier or transport container\n\n**Common Emergencies and Response:**\n\n1. **Bleeding:**\n   - Apply direct pressure with clean gauze\n   - Elevate the wound if possible\n   - If bleeding doesn't stop within 5 minutes, seek immediate veterinary care\n\n2. **Choking:**\n   - Look for objects in the mouth that can be removed\n   - For a conscious pet, perform a modified Heimlich maneuver appropriate for their size\n   - For unconscious pets, open the airway and check for objects\n\n3. **Heatstroke:**\n   - Move your pet to a cool area immediately\n   - Apply room temperature (not cold) water to the body\n   - Place cool, wet towels on the neck, armpits, and groin\n   - Transport to veterinary care while keeping the pet cool\n\n4. **Seizures:**\n   - Remove objects that could cause injury\n   - Do not restrain the pet\n   - Note duration and symptoms\n   - Keep pet cool and quiet afterward\n\n5. **Poisoning:**\n   - Remove pet from the source\n   - Do NOT induce vomiting unless directed by a veterinarian\n   - Bring the packaging or sample of the substance to the vet\n\n**When to Seek Immediate Veterinary Care:**\n\n- Difficulty breathing or choking\n- Severe bleeding\n- Collapse or unconsciousness\n- Multiple or prolonged seizures\n- Suspected poisoning\n- Severe trauma or injury\n- Inability to urinate\n- Prolonged vomiting or diarrhea\n- Bloated, distended abdomen (especially in large breed dogs)\n- Eye injuries\n\nRemember that first aid is not a substitute for professional veterinary care. Always contact your veterinarian or emergency veterinary hospital as soon as possible during an emergency situation.",
  };

  const closePopup = () => {
    setSelectedArticle(null);
    document.body.style.overflow = "auto";
  };

  const openArticlePopup = (article) => {
    setSelectedArticle(article);
    document.body.style.overflow = "hidden";
  };

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <main className="bg-[#1D1D1D] text-[#FFFFFF]">
      <div className="relative w-full h-screen overflow-hidden">
        {/* Hero Section with Video Background */}
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/api/placeholder/1920/1080" type="video/mp4" />
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
              Expert veterinary care and premium pet medications for your beloved companions
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

      <section className="py-20 bg-gradient-to-b from-[#1D1D1D] to-[#303241]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fadeIn">
            <div className="inline-block px-4 py-1 rounded-full bg-[#FCAA29]/20 text-[#FCAA29] font-medium text-sm mb-4">
              OUR SERVICES
            </div>
            <h2 className="text-4xl font-bold text-[#FFFFFF] mb-4">
              Comprehensive Pet Healthcare
            </h2>
            <p className="text-lg text-[#C8C8C8] max-w-2xl mx-auto">
              State-of-the-art veterinary services designed to keep your pets healthy,
              happy, and thriving throughout every stage of their lives
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

      <section className="py-20 bg-[#303241]" id="shop">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fadeIn">
            <div className="inline-block px-4 py-1 rounded-full bg-[#FC7729]/20 text-[#FC7729] font-medium text-sm mb-4">
              PET PHARMACY
            </div>
            <h2 className="text-4xl font-bold text-[#FFFFFF] mb-4">
              Quality Pet Medications & Supplies
            </h2>
            <p className="text-lg text-[#C8C8C8] max-w-2xl mx-auto">
              Browse our wide selection of veterinary-approved medications, supplements, and specialty pet products
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: "Joint Support Formula",
                image: "/api/placeholder/300/300",
                price: "$29.99",
                category: "Supplements",
                rating: 4.8,
              },
              {
                name: "Flea & Tick Prevention",
                image: "/api/placeholder/300/300",
                price: "$45.99",
                category: "Medications",
                rating: 4.9,
                badge: "Best Seller",
              },
              {
                name: "Calming Treats for Dogs",
                image: "/api/placeholder/300/300",
                price: "$18.99",
                category: "Supplements",
                rating: 4.7,
              },
              {
                name: "Dental Care Kit",
                image: "/api/placeholder/300/300",
                price: "$24.99",
                category: "Dental Health",
                rating: 4.6,
              },
            ].map((product, index) => (
              <div
                key={index}
                className="bg-[#1D1D1D] rounded-xl overflow-hidden shadow-lg border border-[#C8C8C8]/10 transition-all duration-300 hover:shadow-xl hover:border-[#FC7729]/20 group animate-fadeIn"
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
                  <div className="text-[#C8C8C8] text-sm mb-1">{product.category}</div>
                  <h3 className="text-lg font-semibold text-[#FFFFFF] mb-2">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[#FCAA29] font-bold">{product.price}</span>
                    <div className="flex items-center">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(product.rating)
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
                        {product.rating}
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
            ))}
          </div>

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

      <section className="py-20 bg-[#1D1D1D]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fadeIn">
            <span className="inline-block px-4 py-1 rounded-full bg-[#FCAA29]/20 text-[#FCAA29] font-medium text-sm mb-4">
              PET CARE
            </span>
            <h2 className="text-4xl font-bold text-[#FFFFFF] mb-4">
              Specialized Care For Every Pet
            </h2>
            <p className="text-lg text-[#C8C8C8] max-w-2xl mx-auto">
              Tailored veterinary services and products for different types of pets and their unique needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {userTypes.map((type, index) => (
              <div key={index} className="relative group animate-fadeIn" style={{ animationDelay: `${index * 0.2}s` }}>
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
                        <div
                          className="p-1 rounded-full mr-3 flex-shrink-0 mt-0.5 text-[#FCAA29] bg-[#FCAA29]/10 group-hover:bg-[#FCAA29] group-hover:text-[#303241] transition-colors duration-300"
                        >
                          {feature.icon}
                        </div>
                        <span className="text-[#C8C8C8] group-hover:text-[#FFFFFF] transition-colors duration-300">{feature.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#303241]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fadeIn">
            <span className="inline-block px-4 py-1 rounded-full bg-[#FC7729]/20 text-[#FC7729] font-medium text-sm mb-4">
        
              PET HEALTH RESOURCES
            </span>
            <h2 className="text-4xl font-bold text-[#FFFFFF] mb-4">
              Expert Advice & Resources
            </h2>
            <p className="text-lg text-[#C8C8C8] max-w-2xl mx-auto">
              Stay informed with our collection of veterinarian-approved articles on pet health, 
              care guidelines, and emergency preparedness
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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
                  <div className="flex flex-wrap gap-2 mb-3">
                    {featuredArticle.tags.map((tag, idx) => (
                      <span key={idx} className="bg-[#FCAA29] text-[#000000] text-xs font-medium px-3 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-2xl font-bold text-[#FFFFFF] mb-2">
                    {featuredArticle.title}
                  </h3>
                  <p className="text-[#C8C8C8] mb-4">
                    {featuredArticle.summary}
                  </p>
                  <div className="flex items-center text-sm text-[#C8C8C8]">
                    <Clock size={16} className="mr-1" />
                    {featuredArticle.readTime}
                  </div>
                </div>
              </div>
            </div>

            {articles.map((article, index) => (
              <div 
                key={index} 
                className="bg-[#1D1D1D] rounded-xl overflow-hidden shadow-lg border border-[#C8C8C8]/10 hover:border-[#FCAA29]/30 transition-all duration-300 cursor-pointer group animate-fadeIn"
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
                  <div className="flex flex-wrap gap-2 mb-3">
                    {article.tags.slice(0, 2).map((tag, idx) => (
                      <span key={idx} className="bg-[#FCAA29]/20 text-[#FCAA29] text-xs px-3 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-xl font-bold text-[#FFFFFF] mb-2 group-hover:text-[#FCAA29] transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-[#C8C8C8] mb-4 line-clamp-2">
                    {article.summary}
                  </p>
                  <div className="flex items-center text-sm text-[#C8C8C8]">
                    <Clock size={16} className="mr-1" />
                    {article.readTime}
                  </div>
                </div>
              </div>
            ))}
          </div>

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

      {/* <section className="py-20 bg-[#1D1D1D]" id="book-now">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="animate-fadeIn">
              <span className="inline-block px-4 py-1 rounded-full bg-[#FC7729]/20 text-[#FC7729] font-medium text-sm mb-4">
                BOOK AN APPOINTMENT
              </span>
              <h2 className="text-4xl font-bold text-[#FFFFFF] mb-6">
                Schedule Your Pet's Visit Today
              </h2>
              <p className="text-lg text-[#C8C8C8] mb-8">
                Whether it's a routine check-up, vaccination, or specialized treatment, 
                our expert veterinary team is ready to provide the highest quality care for your beloved companions.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <div className="bg-[#FCAA29]/10 text-[#FCAA29] p-2 rounded-full mr-4">
                    <Calendar size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-[#FFFFFF] mb-1">Flexible Scheduling</h3>
                    <p className="text-[#C8C8C8]">Choose from available slots that fit your busy schedule</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-[#FCAA29]/10 text-[#FCAA29] p-2 rounded-full mr-4">
                    <FileCheck size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-[#FFFFFF] mb-1">Digital Check-In</h3>
                    <p className="text-[#C8C8C8]">Complete paperwork online before your visit to save time</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-[#FCAA29]/10 text-[#FCAA29] p-2 rounded-full mr-4">
                    <Bell size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-[#FFFFFF] mb-1">Appointment Reminders</h3>
                    <p className="text-[#C8C8C8]">Receive notifications so you never miss an important visit</p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#"
                  className="bg-[#FC7729] hover:bg-[#FCAA29] text-[#FFFFFF] px-8 py-3 rounded-full font-medium transition-all duration-300 text-center flex items-center justify-center gap-2"
                >
                  <Calendar size={18} />
                  Book Online
                </a>
                <a
                  href="tel:+1234567890"
                  className="bg-transparent border border-[#FC7729] text-[#FC7729] hover:bg-[#FC7729] hover:text-[#FFFFFF] px-8 py-3 rounded-full font-medium transition-all duration-300 text-center flex items-center justify-center gap-2"
                >
                  <PhoneCall size={18} />
                  Call Us
                </a>
              </div>
            </div>
            
            <div className="relative animate-fadeIn">
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-[#FCAA29] rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-[#FC7729] rounded-full opacity-20 animate-pulse delay-1000"></div>
              
              <div className="bg-[#303241] p-8 rounded-2xl shadow-xl relative z-10 border border-[#C8C8C8]/10">
                <h3 className="text-2xl font-bold text-[#FFFFFF] mb-6 text-center">Request an Appointment</h3>
                
                <form className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-[#C8C8C8] mb-2">Your Name</label>
                    <input
                      type="text"
                      id="name"
                      className="w-full bg-[#1D1D1D] border border-[#C8C8C8]/20 rounded-lg p-3 text-[#FFFFFF] focus:outline-none focus:border-[#FCAA29]"
                      placeholder="Enter your full name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-[#C8C8C8] mb-2">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      className="w-full bg-[#1D1D1D] border border-[#C8C8C8]/20 rounded-lg p-3 text-[#FFFFFF] focus:outline-none focus:border-[#FCAA29]"
                      placeholder="Enter your email"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-[#C8C8C8] mb-2">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      className="w-full bg-[#1D1D1D] border border-[#C8C8C8]/20 rounded-lg p-3 text-[#FFFFFF] focus:outline-none focus:border-[#FCAA29]"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="service" className="block text-[#C8C8C8] mb-2">Service Needed</label>
                    <select
                      id="service"
                      className="w-full bg-[#1D1D1D] border border-[#C8C8C8]/20 rounded-lg p-3 text-[#FFFFFF] focus:outline-none focus:border-[#FCAA29]"
                    >
                      <option value="">Select a service</option>
                      <option value="check-up">Routine Check-up</option>
                      <option value="vaccination">Vaccination</option>
                      <option value="dental">Dental Care</option>
                      <option value="surgery">Surgery Consultation</option>
                      <option value="emergency">Emergency Care</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="date" className="block text-[#C8C8C8] mb-2">Preferred Date</label>
                    <input
                      type="date"
                      id="date"
                      className="w-full bg-[#1D1D1D] border border-[#C8C8C8]/20 rounded-lg p-3 text-[#FFFFFF] focus:outline-none focus:border-[#FCAA29]"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-[#C8C8C8] mb-2">Additional Information</label>
                    <textarea
                      id="message"
                      rows={4}
                      className="w-full bg-[#1D1D1D] border border-[#C8C8C8]/20 rounded-lg p-3 text-[#FFFFFF] focus:outline-none focus:border-[#FCAA29]"
                      placeholder="Tell us about your pet and reason for visit"
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#FC7729] to-[#FCAA29] text-[#FFFFFF] py-3 rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:scale-[1.02] flex items-center justify-center gap-2"
                  >
                    <CalendarClock size={18} />
                    Request Appointment
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* <section className="py-16 bg-gradient-to-b from-[#303241] to-[#1D1D1D]">
        <div className="container mx-auto px-4">
          <div className="bg-[#FCAA29] rounded-2xl p-10 relative overflow-hidden animate-fadeIn">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#FC7729] rounded-full opacity-20 -mr-12 -mt-12"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#FFFFFF] rounded-full opacity-10 -mb-10 -ml-10"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center relative z-10">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-[#000000] mb-4">
                  Download Our PawCare Mobile App
                </h2>
                <p className="text-lg text-[#303241] mb-6">
                  Manage your pet's health on the go! Book appointments, refill prescriptions, 
                  access medical records, and receive timely care reminders.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="bg-[#000000] text-[#FFFFFF] px-6 py-3 rounded-lg flex items-center gap-3 hover:bg-[#303241] transition-colors duration-300">
                    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
                      <path d="M12 21.95h-.1c-1.33-.1-2.5-.5-3.4-1.1l-4.8-3.1c-.4-.3-.7-.7-.7-1.2v-10c0-.5.3-1 .8-1.3L8.5 2a4.9 4.9 0 0 1 3.4-1c1.3 0 2.5.4 3.5 1.1l4.8 3.1c.4.3.7.7.7 1.2v10.1c0 .5-.3 1-.8 1.3l-4.7 3.2c-1 .7-2.2 1.1-3.4 1.1z" 
                        fill="#FC7729"/>
                      <path d="M12 15.95c-.7 0-1.4-.3-1.8-.8l-4.6-5.3c-.7-.8-.6-2 .2-2.7s2-.6 2.7.2l3.5 4 3.5-4c.7-.8 1.9-.9 2.7-.2s.9 1.9.2 2.7l-4.6 5.3c-.4.5-1.1.8-1.8.8z" 
                        fill="#FFFFFF"/>
                    </svg>
                    <div className="text-left">
                      <div className="text-xs">Download on the</div>
                      <div className="text-xl font-semibold">App Store</div>
                    </div>
                  </button>
                  
                  <button className="bg-[#000000] text-[#FFFFFF] px-6 py-3 rounded-lg flex items-center gap-3 hover:bg-[#303241] transition-colors duration-300">
                    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
                      <path d="M12 3v18l-8.5-9L12 3z" fill="#FC7729"/>
                      <path d="M12 3l8.5 9-8.5 9V3z" fill="#FCAA29"/>
                      <path d="M3.5 12l3-3 5.5 5.5-8.5-2.5z" fill="#FC7729"/>
                      <path d="M3.5 12l3 3 5.5-5.5-8.5 2.5z" fill="#FCAA29"/>
                    </svg>
                    <div className="text-left">
                      <div className="text-xs">GET IT ON</div>
                      <div className="text-xl font-semibold">Google Play</div>
                    </div>
                  </button>
                </div>
              </div>
              
              <div className="relative">
                <div className="relative mx-auto max-w-[300px]">
                  <img 
                    src="/api/placeholder/300/600" 
                    alt="PawCare Mobile App" 
                    className="rounded-3xl border-8 border-[#303241] shadow-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/50 to-transparent rounded-2xl"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

    

      {/* Article Popup */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-[#000000]/80 flex items-center justify-center p-4" onClick={closePopup}>
          <div 
            className="bg-[#1D1D1D] rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-[#1D1D1D] p-4 border-b border-[#C8C8C8]/10 flex justify-between items-center z-10">
              <h3 className="text-xl font-bold text-[#FFFFFF]">{selectedArticle.title}</h3>
              <button 
                onClick={closePopup}
                className="p-2 rounded-full hover:bg-[#303241] transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6">
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedArticle.tags.map((tag, idx) => (
                  <span key={idx} className="bg-[#FCAA29]/20 text-[#FCAA29] text-xs px-3 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
                <span className="bg-[#303241] text-[#C8C8C8] text-xs px-3 py-1 rounded-full flex items-center">
                  <Clock size={14} className="mr-1" />
                  {selectedArticle.readTime}
                </span>
              </div>
              
              <img 
                src={selectedArticle.image} 
                alt={selectedArticle.title}
                className="w-full h-64 object-cover rounded-lg mb-6" 
              />
              
              <div className="prose prose-invert max-w-none">
                {selectedArticle.fullContent.split('\n\n').map((paragraph, idx) => {
                  if (paragraph.startsWith('**') && paragraph.endsWith(':**')) {
                    return <h4 key={idx} className="text-xl font-bold text-[#FFFFFF] mt-6 mb-3">{paragraph.replace(/\*\*/g, '')}</h4>;
                  } else {
                    return <p key={idx} className="mb-4 text-[#C8C8C8]">{paragraph}</p>;
                  }
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Shopping Cart Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-full md:w-96 bg-[#1D1D1D] shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
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
              <p className="text-[#C8C8C8]/60 text-sm">Browse our products and add items to your cart</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item, index) => (
                <div key={index} className="flex gap-4 border-b border-[#C8C8C8]/10 pb-4">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-md" 
                  />
                  <div className="flex-1">
                    <h4 className="text-[#FFFFFF] font-medium">{item.name}</h4>
                    <p className="text-[#C8C8C8] text-sm">{item.category}</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-[#FCAA29] font-bold">{item.price}</span>
                      <div className="flex items-center">
                        <button className="w-6 h-6 bg-[#303241] rounded-full text-[#FFFFFF] flex items-center justify-center">-</button>
                        <span className="mx-2 text-[#FFFFFF]">1</span>
                        <button className="w-6 h-6 bg-[#303241] rounded-full text-[#FFFFFF] flex items-center justify-center">+</button>
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
            <span className="text-[#FCAA29] font-bold">$0.00</span>     
          </div>
          <button className="w-full bg-[#FC7729] hover:bg-[#FCAA29] text-[#FFFFFF] py-3 rounded-lg font-medium transition-colors duration-300 flex items-center justify-center gap-2">
            Checkout
          </button>
        </div>
      </div>
    </main>
  );
};
