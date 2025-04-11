// "use client";
// import { useState } from "react";

// export default function PaymentPage() {
//   const [billingId, setBillingId] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handlePay = async () => {
//     setLoading(true);
//     try {
//       const res = await fetch("/api/payment", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ billingId }),
//       });

//       const data = await res.json();
//       if (data.url) {
//         window.location.href = data.url;
//       } else {
//         alert(data.error || "Payment failed");
//       }
//     } catch (error) {
//       console.error(error);
//       alert("Error processing payment");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-4">
//       <h1 className="text-xl font-bold mb-4">Stripe Payment</h1>
//       <input
//         type="text"
//         placeholder="Enter Billing ID"
//         value={billingId}
//         onChange={(e) => setBillingId(e.target.value)}
//         className="border p-2 rounded w-full mb-4"
//       />
//       <button
//         onClick={handlePay}
//         disabled={loading || !billingId}
//         className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//       >
//         {loading ? "Redirecting..." : "Pay Now"}
//       </button>
//     </div>
//   );
// }



// "use client"

// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
// import { Label } from "@/components/ui/label"
// import { Input } from "@/components/ui/input"
// import { PawPrint, Calendar, MessageCircle, Video } from "lucide-react"

// export default function PaymentForm() {
//   const [paymentMethod, setPaymentMethod] = useState("card")

//   return (
//     <Card className="w-full shadow-lg border-[#C8C8C8] border">
//       <CardHeader className="bg-[#FCAA29] text-white rounded-t-lg">
//         <CardTitle className="text-2xl">Select Your Plan</CardTitle>
//         <CardDescription className="text-white opacity-90">
//           Choose between a one-time consultation or full access subscription
//         </CardDescription>
//       </CardHeader>
//       <CardContent className="pt-6">
//         <Tabs defaultValue="consultation" className="w-full mb-6">
//           <TabsList className="grid w-full grid-cols-2 bg-[#C8C8C8]">
//             <TabsTrigger
//               value="consultation"
//               className="data-[state=active]:bg-[#FC7729] data-[state=active]:text-white"
//             >
//               One-Time Consultation
//             </TabsTrigger>
//             <TabsTrigger
//               value="subscription"
//               className="data-[state=active]:bg-[#FC7729] data-[state=active]:text-white"
//             >
//               Full Access Subscription
//             </TabsTrigger>
//           </TabsList>
//           <TabsContent value="consultation" className="mt-4">
//             <div className="p-4 bg-[#F9F9F9] rounded-md">
//               <h3 className="text-xl font-medium text-[#303241] mb-2">One-Time Veterinary Consultation</h3>
//               <p className="text-[#1D1D1D] mb-4">Get expert advice for your pet's specific needs</p>
//               <div className="flex items-center gap-2 mb-2">
//                 <Video size={18} className="text-[#FC7729]" />
//                 <span>30-minute video consultation</span>
//               </div>
//               <div className="flex items-center gap-2 mb-2">
//                 <MessageCircle size={18} className="text-[#FC7729]" />
//                 <span>24-hour follow-up messaging</span>
//               </div>
//               <div className="text-xl font-bold text-[#303241] mt-4">$49.99</div>
//             </div>
//           </TabsContent>
//           <TabsContent value="subscription" className="mt-4">
//             <div className="p-4 bg-[#F9F9F9] rounded-md">
//               <h3 className="text-xl font-medium text-[#303241] mb-2">Monthly VetNova Subscription</h3>
//               <p className="text-[#1D1D1D] mb-4">Unlimited access to veterinary care for your pets</p>
//               <div className="flex items-center gap-2 mb-2">
//                 <Video size={18} className="text-[#FC7729]" />
//                 <span>Unlimited video consultations</span>
//               </div>
//               <div className="flex items-center gap-2 mb-2">
//                 <MessageCircle size={18} className="text-[#FC7729]" />
//                 <span>24/7 messaging with veterinarians</span>
//               </div>
//               <div className="flex items-center gap-2 mb-2">
//                 <Calendar size={18} className="text-[#FC7729]" />
//                 <span>Priority scheduling</span>
//               </div>
//               <div className="flex items-center gap-2 mb-2">
//                 <PawPrint size={18} className="text-[#FC7729]" />
//                 <span>Digital pet health records</span>
//               </div>
//               <div className="text-xl font-bold text-[#303241] mt-4">$29.99/month</div>
//             </div>
//           </TabsContent>
//         </Tabs>

//         <div className="mb-6">
//           <h3 className="text-lg font-medium mb-3 text-[#303241]">Payment Method</h3>
//           <RadioGroup defaultValue="card" onValueChange={setPaymentMethod} className="flex flex-col space-y-2">
//             <div className="flex items-center space-x-2">
//               <RadioGroupItem value="card" id="card" />
//               <Label htmlFor="card" className="flex items-center">
//                 <svg className="w-8 h-8 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                   <rect x="2" y="5" width="20" height="14" rx="2" stroke="#303241" strokeWidth="2" />
//                   <line x1="2" y1="10" x2="22" y2="10" stroke="#303241" strokeWidth="2" />
//                 </svg>
//                 Credit/Debit Card
//               </Label>
//             </div>
//             <div className="flex items-center space-x-2">
//               <RadioGroupItem value="paypal" id="paypal" />
//               <Label htmlFor="paypal" className="flex items-center">
//                 <svg className="w-8 h-8 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                   <path
//                     d="M19.5 7.5H18C17.1716 7.5 16.5 8.17157 16.5 9V10.5C16.5 11.3284 17.1716 12 18 12H19.5C20.3284 12 21 11.3284 21 10.5V9C21 8.17157 20.3284 7.5 19.5 7.5Z"
//                     stroke="#303241"
//                     strokeWidth="2"
//                   />
//                   <path
//                     d="M16.5 9.75H3.75C3.33579 9.75 3 9.41421 3 9V4.5C3 3.67157 3.67157 3 4.5 3H16.5C17.3284 3 18 3.67157 18 4.5V9C18 9.41421 17.6642 9.75 17.25 9.75H16.5Z"
//                     stroke="#303241"
//                     strokeWidth="2"
//                   />
//                   <path
//                     d="M3 9.75V18C3 19.6569 4.34315 21 6 21H18C19.6569 21 21 19.6569 21 18V12"
//                     stroke="#303241"
//                     strokeWidth="2"
//                   />
//                 </svg>
//                 PayPal
//               </Label>
//             </div>
//           </RadioGroup>
//         </div>

//         {paymentMethod === "card" && (
//           <div className="space-y-4">
//             <div>
//               <Label htmlFor="cardName">Cardholder Name</Label>
//               <Input id="cardName" placeholder="John Doe" className="mt-1" />
//             </div>
//             <div>
//               <Label htmlFor="cardNumber">Card Number</Label>
//               <Input id="cardNumber" placeholder="1234 5678 9012 3456" className="mt-1" />
//             </div>
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <Label htmlFor="expiry">Expiry Date</Label>
//                 <Input id="expiry" placeholder="MM/YY" className="mt-1" />
//               </div>
//               <div>
//                 <Label htmlFor="cvc">CVC</Label>
//                 <Input id="cvc" placeholder="123" className="mt-1" />
//               </div>
//             </div>
//           </div>
//         )}

//         {paymentMethod === "paypal" && (
//           <div className="bg-[#F9F9F9] p-4 rounded-md text-center">
//             <p className="mb-2">You'll be redirected to PayPal to complete your payment.</p>
//           </div>
//         )}
//       </CardContent>
//       <CardFooter className="flex flex-col">
//         <Button className="w-full bg-[#FC7729] hover:bg-[#FCAA29] text-white">Complete Payment</Button>
//         <p className="text-xs text-[#303241] mt-4 text-center">
//           By proceeding, you agree to VetNova's{" "}
//           <a href="#" className="text-[#FC7729] underline">
//             Terms of Service
//           </a>{" "}
//           and{" "}
//           <a href="#" className="text-[#FC7729] underline">
//             Privacy Policy
//           </a>
//         </p>
//       </CardFooter>
//     </Card>
//   )
// }



"use client"
import { useState } from "react"
import { PawPrint, Calendar, MessageCircle, Video } from "lucide-react"

export default function PaymentForm() {
  const [selectedTab, setSelectedTab] = useState("consultation")
  const [paymentMethod, setPaymentMethod] = useState("card")

  return (
    <div className="w-full border border-[#C8C8C8] shadow-lg rounded-lg">
      <div className="bg-[#FCAA29] text-white p-6 rounded-t-lg">
        <h2 className="text-2xl font-bold">Select Your Plan</h2>
        <p className="opacity-90">
          Choose between a one-time consultation or full access subscription
        </p>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-2 mb-6 bg-[#C8C8C8] rounded overflow-hidden">
          <button
            className={`py-2 px-4 text-center ${selectedTab === "consultation" ? "bg-[#FC7729] text-white" : ""}`}
            onClick={() => setSelectedTab("consultation")}
          >
            One-Time Consultation
          </button>
          <button
            className={`py-2 px-4 text-center ${selectedTab === "subscription" ? "bg-[#FC7729] text-white" : ""}`}
            onClick={() => setSelectedTab("subscription")}
          >
            Full Access Subscription
          </button>
        </div>

        {selectedTab === "consultation" && (
          <div className="p-4 bg-[#F9F9F9] rounded-md mb-6">
            <h3 className="text-xl font-medium text-[#303241] mb-2">
              One-Time Veterinary Consultation
            </h3>
            <p className="text-[#1D1D1D] mb-4">Get expert advice for your pet's specific needs</p>
            <div className="flex items-center gap-2 mb-2">
              <Video size={18} className="text-[#FC7729]" />
              <span>30-minute video consultation</span>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <MessageCircle size={18} className="text-[#FC7729]" />
              <span>24-hour follow-up messaging</span>
            </div>
            <div className="text-xl font-bold text-[#303241] mt-4">$49.99</div>
          </div>
        )}

        {selectedTab === "subscription" && (
          <div className="p-4 bg-[#F9F9F9] rounded-md mb-6">
            <h3 className="text-xl font-medium text-[#303241] mb-2">
              Monthly VetNova Subscription
            </h3>
            <p className="text-[#1D1D1D] mb-4">Unlimited access to veterinary care for your pets</p>
            <div className="flex items-center gap-2 mb-2">
              <Video size={18} className="text-[#FC7729]" />
              <span>Unlimited video consultations</span>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <MessageCircle size={18} className="text-[#FC7729]" />
              <span>24/7 messaging with veterinarians</span>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <Calendar size={18} className="text-[#FC7729]" />
              <span>Priority scheduling</span>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <PawPrint size={18} className="text-[#FC7729]" />
              <span>Digital pet health records</span>
            </div>
            <div className="text-xl font-bold text-[#303241] mt-4">$29.99/month</div>
          </div>
        )}

        <div className="mb-6">
          <h3 className="text-lg font-medium mb-3 text-[#303241]">Payment Method</h3>
          <div className="flex flex-col space-y-2">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="payment"
                value="card"
                checked={paymentMethod === "card"}
                onChange={() => setPaymentMethod("card")}
              />
              <span className="flex items-center">
                <svg className="w-8 h-8 mr-2" viewBox="0 0 24 24" fill="none">
                  <rect x="2" y="5" width="20" height="14" rx="2" stroke="#303241" strokeWidth="2" />
                  <line x1="2" y1="10" x2="22" y2="10" stroke="#303241" strokeWidth="2" />
                </svg>
                Credit/Debit Card
              </span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="payment"
                value="paypal"
                checked={paymentMethod === "paypal"}
                onChange={() => setPaymentMethod("paypal")}
              />
              <span className="flex items-center">
                <svg className="w-8 h-8 mr-2" viewBox="0 0 24 24" fill="none">
                  <path d="M19.5 7.5H18..." stroke="#303241" strokeWidth="2" />
                  <path d="M16.5 9.75H3.75..." stroke="#303241" strokeWidth="2" />
                  <path d="M3 9.75V18..." stroke="#303241" strokeWidth="2" />
                </svg>
                PayPal
              </span>
            </label>
          </div>
        </div>

        {paymentMethod === "card" && (
          <div className="space-y-4">
            <div>
              <label htmlFor="cardName" className="block mb-1 font-medium">Cardholder Name</label>
              <input
                type="text"
                id="cardName"
                placeholder="John Doe"
                className="w-full border p-2 rounded"
              />
            </div>
            <div>
              <label htmlFor="cardNumber" className="block mb-1 font-medium">Card Number</label>
              <input
                type="text"
                id="cardNumber"
                placeholder="1234 5678 9012 3456"
                className="w-full border p-2 rounded"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="expiry" className="block mb-1 font-medium">Expiry Date</label>
                <input
                  type="text"
                  id="expiry"
                  placeholder="MM/YY"
                  className="w-full border p-2 rounded"
                />
              </div>
              <div>
                <label htmlFor="cvc" className="block mb-1 font-medium">CVC</label>
                <input
                  type="text"
                  id="cvc"
                  placeholder="123"
                  className="w-full border p-2 rounded"
                />
              </div>
            </div>
          </div>
        )}

        {paymentMethod === "paypal" && (
          <div className="bg-[#F9F9F9] p-4 rounded-md text-center">
            <p className="mb-2">You'll be redirected to PayPal to complete your payment.</p>
          </div>
        )}
      </div>

      <div className="px-6 pb-6">
        <button className="w-full py-2 bg-[#FC7729] hover:bg-[#FCAA29] text-white font-semibold rounded">
          Complete Payment
        </button>
        <p className="text-xs text-[#303241] mt-4 text-center">
          By proceeding, you agree to VetNova's{" "}
          <a href="#" className="text-[#FC7729] underline">Terms of Service</a> and{" "}
          <a href="#" className="text-[#FC7729] underline">Privacy Policy</a>.
        </p>
      </div>
    </div>
  )
}
