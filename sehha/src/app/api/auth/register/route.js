import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import connectMongoDB from "../../../lib/config"; // Adjust the import path as necessary
import User from "../../../lib/models/User"; // Adjust the import path as necessary

export async function POST(request) {
  try {
    await connectMongoDB();

    const { name, email, password } = await request.json();

    // 1. Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // 2. Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      // role: defaults to "patient" as per your schema
    });
    await newUser.save();

    return NextResponse.json(
      { message: "Registration successful" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in register route:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
