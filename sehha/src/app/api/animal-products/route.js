// src/app/api/animal-products/route.js
import connectMongoDB from "../../lib/config";
import Product from "../../lib/models/AnimalProduct";

export async function GET() {
  try {
    await connectMongoDB();
    const products = await Product.find();
    return new Response(JSON.stringify(products), { status: 200 });
  } catch (error) {
    console.error("Error fetching products:", error);
    return new Response(JSON.stringify({ error: "Error fetching products" }), { status: 500 });
  }
}