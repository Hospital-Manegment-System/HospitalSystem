// src/app/api/billing/[id]/route.js
import connectMongoDB from "../../../lib/config";
import Billing from "../../../lib/models/Billing";

export async function GET(request, { params }) {
  try {
    await connectMongoDB();
    const billing = await Billing.findById(params.id)
      .populate("patientId", "name email")
      .populate("appointmentId", "date time");
    if (!billing) {
      return new Response(JSON.stringify({ error: "Billing not found" }), { status: 404 });
    }
    return new Response(JSON.stringify(billing), { status: 200 });
  } catch (error) {
    console.error("Error fetching billing:", error);
    return new Response(JSON.stringify({ error: "Error fetching billing" }), { status: 500 });
  }
}