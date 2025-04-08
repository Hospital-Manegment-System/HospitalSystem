import { NextResponse } from "next/server";
import connectMongoDB from "../../../lib/config"; // Adjust the import as needed
import User from "../../../lib/models/User"; // Adjust the import as needed
import { extractUserIdFromToken } from "../../../lib/utils/auth"; // Import the JWT helper

// GET: Fetch the user's profile
export async function GET(request) {
  try {
    await connectMongoDB();

    // Extract userId from JWT
    const userId = extractUserIdFromToken(request);

    // Fetch user data from the database
    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user); // Send back the user data
  } catch (error) {
    console.error("Error fetching user data:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// PUT: Update the user's profile
export async function PUT(request) {
  try {
    await connectMongoDB();

    // Extract userId from JWT
    const userId = extractUserIdFromToken(request);

    // Get the updated data from the request body
    const updatedData = await request.json();

    // Update user in the database
    const updatedUser = await User.findByIdAndUpdate(userId, updatedData, {
      new: true,
    });

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(updatedUser); // Send back the updated user data
  } catch (error) {
    console.error("Error updating user data:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
