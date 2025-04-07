"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
// If using NextAuth for Google, import signIn
// import { signIn } from "next-auth/react";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setError(null);
  //   try {
  //     const res = await fetch("/api/auth/login", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(formData),
  //     });
  //     const data = await res.json();
  //     if (!res.ok) {
  //       setError(data.error);
  //     } else {
  //       // Redirect based on user role:
  //       if (data.user.role === "admin") {
  //         router.push("/dashboard/admin");
  //       } else {
  //         router.push("/");
  //       }
  //     }
  //   } catch (err) {
  //     setError("Something went wrong. Please try again.");
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await axios.post("/api/auth/login", formData, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });

      // Redirect based on user role
      if (res.data.user.role === "admin") {
        router.push("/Dashboard");
      } else {
        router.push("/");
      }
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    }
  };
  const handleGoogleLogin = async () => {
    // Trigger Google login via NextAuth
    signIn("google");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl mb-4">Login</h1>
      {error && <p className="mb-4 text-red-500">{error}</p>}
      <form
        className="flex flex-col gap-2 w-full max-w-md"
        onSubmit={handleSubmit}
      >
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

        <button
          className="bg-blue-500 text-white p-2 rounded mt-4"
          type="submit"
        >
          Login
        </button>
      </form>

      <div className="mt-6">
        <p>Or login with:</p>
        <button
          className="bg-red-500 text-white p-2 rounded mt-2"
          onClick={handleGoogleLogin}
        >
          Google
        </button>
      </div>
    </div>
  );
}
