// src/app/api/billing/route.js
import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongoose"; // افتراض أنك تستخدم Mongoose
import Billing from "@/models/Billing"; // نموذج الفاتورة

export async function POST(request) {
  try {
    await connectToDB();
    const data = await request.json();

    // التأكد من أن البيانات تتطابق مع نموذج AnimalProduct
    const billingData = {
      items: data.items.map((item) => ({
        description: item.description, // اسم المنتج من AnimalProduct
        cost: item.cost, // السعر الإجمالي (price * quantity)
      })),
      amount: data.amount, // المبلغ الإجمالي
      paymentStatus: data.paymentStatus || "pending",
      issuedAt: data.issuedAt || new Date(),
    };

    const newBilling = new Billing(billingData);
    await newBilling.save();
    return NextResponse.json(newBilling, { status: 201 });
  } catch (error) {
    console.error("Error creating billing:", error);
    return NextResponse.json(
      { error: "Failed to create billing" },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    await connectToDB();
    const { searchParams } = new URL(request.url);
    const filters = Object.fromEntries(searchParams);
    const billings = await Billing.find(filters);
    return NextResponse.json(billings);
  } catch (error) {
    console.error("Error fetching billings:", error);
    return NextResponse.json(
      { error: "Failed to fetch billings" },
      { status: 500 }
    );
  }
}