"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    profilePicture: "",
    petType: "",
    petName: "",
  });
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await axios.post("/api/auth/register", formData);
      if (response.status === 201) {
        // On successful registration, redirect to the Login page
        router.push("/login");
      }
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.error);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl mb-4">Register</h1>
      {error && <p className="mb-4 text-red-500">{error}</p>}
      <form
        className="flex flex-col gap-2 w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          className="p-2 border rounded"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="email">Email:</label>
        <input
          id="email"
          className="p-2 border rounded"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          id="password"
          className="p-2 border rounded"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <label htmlFor="phoneNumber">Phone Number:</label>
        <input
          id="phoneNumber"
          className="p-2 border rounded"
          type="tel"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
        />

        <label htmlFor="profilePicture">Profile Picture URL:</label>
        <input
          id="profilePicture"
          className="p-2 border rounded"
          type="text"
          name="profilePicture"
          value={formData.profilePicture}
          onChange={handleChange}
        />

        <label htmlFor="petType">Pet Type:</label>
        <input
          id="petType"
          className="p-2 border rounded"
          type="text"
          name="petType"
          value={formData.petType}
          onChange={handleChange}
        />

        <label htmlFor="petName">Pet Name:</label>
        <input
          id="petName"
          className="p-2 border rounded"
          type="text"
          name="petName"
          value={formData.petName}
          onChange={handleChange}
        />

        <button
          className="bg-blue-500 text-white p-2 rounded mt-4"
          type="submit"
        >
          Register
        </button>
      </form>
    </div>
  );
}
