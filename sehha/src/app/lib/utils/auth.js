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
export function extractUserIdFromToken(request) {
  const token = request.cookies.get("token")?.value; // Get the token from cookies
  if (!token) {
    throw new Error("No token provided");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Decode the JWT
    return decoded.userId; // Return userId from the decoded token
  } catch (error) {
    throw new Error("Invalid token");
  }
}
