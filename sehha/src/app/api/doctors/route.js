// src/app/api/doctors/route.js - API route for fetching doctors
import { NextResponse } from "next/server";
import connectDB from "../../lib/mongodb";
import Doctor from "../../lib/models/Doctor";

export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const department = searchParams.get("department");

    const query = department ? { department } : {};
    const doctors = await Doctor.find(query).populate("userId", "name");

    return NextResponse.json({ doctors });
  } catch (error) {
    console.error("Error fetching doctors:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch doctors",
      },
      { status: 500 }
    );
  }
}
