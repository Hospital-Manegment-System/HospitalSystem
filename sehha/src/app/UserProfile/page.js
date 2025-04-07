"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function UserProfilePage() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    profilePicture: "",
    petType: "",
    petName: "",
  });
  const [editing, setEditing] = useState(false);
  const [updatedData, setUpdatedData] = useState(userData);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await axios.get("/api/user/profile");
        setUserData(response.data);
        setUpdatedData(response.data);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Failed to fetch user data.");
      }
    }

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    setUpdatedData({ ...updatedData, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put("/api/user/profile", updatedData);
      if (response.status === 200) {
        setUserData(updatedData);
        setEditing(false);
      }
    } catch (err) {
      console.error("Error updating user data:", err);
      setError("Failed to update user data.");
    }
  };

  const handleEditToggle = () => {
    setEditing(!editing);
  };

  return (
    <div className="min-h-screen bg-[#1D1D1D]">
      {/* Decorative top bar */}
      <div className="h-2 bg-gradient-to-r from-[#FC7729] to-[#FCAA29]"></div>

      <div className="container mx-auto px-4 py-12">
        {error && (
          <div className="mb-8 bg-red-500 bg-opacity-10 border-l-4 border-red-500 p-4 rounded-r">
            <p className="text-red-400">{error}</p>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Profile Overview */}
          <div className="lg:w-1/3">
            <div className="bg-[#303241] rounded-2xl overflow-hidden shadow-lg mb-6">
              <div className="h-24 bg-gradient-to-r from-[#FC7729] to-[#FCAA29]"></div>
              <div className="px-6 pb-6 -mt-12">
                <div className="flex justify-center">
                  {userData.profilePicture ? (
                    <img
                      src={userData.profilePicture}
                      alt="Profile"
                      className="w-24 h-24 rounded-full border-4 border-[#303241] object-cover bg-[#1D1D1D]"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full border-4 border-[#303241] flex items-center justify-center bg-[#1D1D1D]">
                      <span className="text-2xl text-[#F2C94C]">
                        {userData.name
                          ? userData.name.charAt(0).toUpperCase()
                          : "?"}
                      </span>
                    </div>
                  )}
                </div>

                <div className="text-center mt-4">
                  <h2 className="text-xl font-bold text-[#FFFFFF]">
                    {userData.name}
                  </h2>
                  <p className="text-[#C8C8C8] text-sm mt-1">
                    {userData.email}
                  </p>
                </div>

                {!editing && (
                  <div className="mt-6 pt-6 border-t border-[#1D1D1D]">
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 rounded-full bg-[#1D1D1D] flex items-center justify-center mr-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-[#FCAA29]"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-[#C8C8C8] text-xs">Phone</p>
                        <p className="text-[#FFFFFF]">
                          {userData.phoneNumber || "Not provided"}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {!editing && (
                  <button
                    onClick={handleEditToggle}
                    className="w-full mt-6 bg-[#FC7729] hover:bg-[#FCAA29] text-white py-2 px-4 rounded transition-colors duration-300"
                  >
                    Edit Profile
                  </button>
                )}
              </div>
            </div>

            {!editing && userData.petName && (
              <div className="bg-[#303241] rounded-2xl p-6 shadow-lg">
                <h3 className="text-[#F2C94C] font-medium mb-4 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6.672 1.911a1 1 0 10-1.932.518l.259.966a1 1 0 001.932-.518l-.26-.966zM2.429 4.74a1 1 0 10-.517 1.932l.966.259a1 1 0 00.517-1.932l-.966-.26zm8.814-.569a1 1 0 00-1.415-1.414l-.707.707a1 1 0 101.415 1.415l.707-.708zm-7.071 7.072l.707-.707A1 1 0 003.465 9.12l-.708.707a1 1 0 001.415 1.415zm3.2-5.171a1 1 0 00-1.3 1.3l4 10a1 1 0 001.823.075l1.38-2.759 3.018 3.02a1 1 0 001.414-1.415l-3.019-3.02 2.76-1.379a1 1 0 00-.076-1.822l-10-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  My Pet
                </h3>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-[#FCAA29] flex items-center justify-center mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-[#1D1D1D]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-[#FFFFFF] font-medium">
                      {userData.petName}
                    </h4>
                    <p className="text-[#C8C8C8] text-sm">
                      {userData.petType || "Type not specified"}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Main Content */}
          <div className="lg:w-2/3">
            <div className="bg-[#303241] rounded-2xl p-6 shadow-lg">
              <h1 className="text-2xl font-bold text-[#FC7729] pb-4 border-b border-[#1D1D1D] mb-6">
                {editing ? "Edit Profile Information" : "Profile Information"}
              </h1>

              {editing ? (
                <form onSubmit={handleSave} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        className="block text-[#F2C94C] text-sm font-medium mb-2"
                        htmlFor="name"
                      >
                        Full Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        name="name"
                        value={updatedData.name}
                        onChange={handleChange}
                        required
                        className="w-full bg-[#1D1D1D] border border-[#1D1D1D] focus:border-[#FCAA29] rounded-lg p-3 text-[#FFFFFF] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label
                        className="block text-[#F2C94C] text-sm font-medium mb-2"
                        htmlFor="phoneNumber"
                      >
                        Phone Number
                      </label>
                      <input
                        id="phoneNumber"
                        type="tel"
                        name="phoneNumber"
                        value={updatedData.phoneNumber}
                        onChange={handleChange}
                        className="w-full bg-[#1D1D1D] border border-[#1D1D1D] focus:border-[#FCAA29] rounded-lg p-3 text-[#FFFFFF] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      className="block text-[#F2C94C] text-sm font-medium mb-2"
                      htmlFor="profilePicture"
                    >
                      Profile Picture URL
                    </label>
                    <input
                      id="profilePicture"
                      type="text"
                      name="profilePicture"
                      value={updatedData.profilePicture}
                      onChange={handleChange}
                      className="w-full bg-[#1D1D1D] border border-[#1D1D1D] focus:border-[#FCAA29] rounded-lg p-3 text-[#FFFFFF] focus:outline-none"
                    />
                  </div>

                  <div className="pt-6 border-t border-[#1D1D1D]">
                    <h3 className="text-xl font-medium text-[#F2C94C] mb-4">
                      Pet Details
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label
                          className="block text-[#F2C94C] text-sm font-medium mb-2"
                          htmlFor="petName"
                        >
                          Pet Name
                        </label>
                        <input
                          id="petName"
                          type="text"
                          name="petName"
                          value={updatedData.petName}
                          onChange={handleChange}
                          className="w-full bg-[#1D1D1D] border border-[#1D1D1D] focus:border-[#FCAA29] rounded-lg p-3 text-[#FFFFFF] focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-4 pt-6">
                    <button
                      type="button"
                      onClick={handleEditToggle}
                      className="px-6 py-2 bg-transparent border border-[#C8C8C8] text-[#C8C8C8] rounded-lg hover:bg-[#1D1D1D] transition-colors duration-300"
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      className="px-6 py-2 bg-[#FC7729] hover:bg-[#FCAA29] text-white rounded-lg transition-colors duration-300"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-[#F2C94C] font-medium mb-4">
                      Account Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
                      <div>
                        <p className="text-[#C8C8C8] text-sm">Name</p>
                        <p className="text-[#FFFFFF]">{userData.name}</p>
                      </div>
                      <div>
                        <p className="text-[#C8C8C8] text-sm">Email</p>
                        <p className="text-[#FFFFFF]">{userData.email}</p>
                      </div>
                      <div>
                        <p className="text-[#C8C8C8] text-sm">Phone</p>
                        <p className="text-[#FFFFFF]">
                          {userData.phoneNumber || "Not provided"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {userData.petName && (
                    <div className="pt-6 border-t border-[#1D1D1D]">
                      <h3 className="text-[#F2C94C] font-medium mb-4">
                        Pet Information
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
                        <div>
                          <p className="text-[#C8C8C8] text-sm">Pet Name</p>
                          <p className="text-[#FFFFFF]">{userData.petName}</p>
                        </div>
                        <div>
                          <p className="text-[#C8C8C8] text-sm">Pet Type</p>
                          <p className="text-[#FFFFFF]">
                            {userData.petType || "Not specified"}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
