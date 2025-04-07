// lib/utils/auth.js
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export function verifyToken(token) {
  if (!token) {
    throw new Error("No token provided");
  }

  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new Error("Invalid token");
  }
}
