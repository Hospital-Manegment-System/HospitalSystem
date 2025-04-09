import { NextResponse } from "next/server";
import connectMongoDB from "../../../lib/config";
import User from "../../../lib/models/User";
import { verifyToken } from "../../../lib/utils/auth";
import { headers } from "next/headers";
export async function GET(request) {
  try {
    await connectMongoDB();

    // console.log(request.cookies);

    // const token = request.cookies.get("token")?.value;
    // const decoded = verifyToken(token);

    // if (decoded.role !== "admin") {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }

    const users = await User.find({}).select("-password -googleId");
    console.log(users);
    return NextResponse.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
// export async function GET(request) {
//   try {
//     await connectMongoDB();

//     // Get cookie header from the request
//     console.log(request.cookies.token);

//     // console.log(token);
//     if (!token) {
//       throw new Error("No token provided");
//     }

//     const decoded = verifyToken(token);

//     if (decoded.role !== "admin") {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const users = await User.find({}).select("-password -googleId");

//     return NextResponse.json(users);
//   } catch (error) {
//     console.error("Error fetching users:", error);
//     return NextResponse.json(
//       { error: error.message || "Internal server error" },
//       { status: 500 }
//     );
//   }
// }
export async function POST(request) {
  try {
    await connectMongoDB();

    // Verify admin role
    // const token = request.cookies.get("token")?.value;
    // const decoded = verifyToken(token);

    // if (decoded.role !== "admin") {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }

    const { name, email, password, role } = await request.json();

    // Basic validation
    if (!name || !email || !password || !role) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // Create new user
    const newUser = new User({
      name,
      email,
      password: await bcrypt.hash(password, 10),
      role,
      status: "active",
    });

    await newUser.save();

    return NextResponse.json(
      { message: "User created successfully", user: newUser },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
