// // src/components/AppointmentForm.jsx
// export default function AppointmentForm({
//   formData,
//   onChange,
//   onSubmit,
//   isSubmitting,
//   onBack,
// }) {
//   return (
//     <div className="bg-white p-6 rounded-lg shadow-md">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-xl font-medium">Appointment Details</h2>
//         <button
//           onClick={onBack}
//           className="text-blue-600 hover:underline flex items-center"
//         >
//           <span className="mr-1">←</span> Back
//         </button>
//       </div>

//       <form onSubmit={onSubmit}>
//         <div className="mb-6">
//           <h3 className="font-medium mb-2">Selected Information</h3>
//           <div className="bg-gray-50 p-4 rounded-md">
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               <div>
//                 <p className="text-sm text-gray-500">Department</p>
//                 <p className="font-medium">{formData.department}</p>
//               </div>
//               <div>
//                 <p className="text-sm text-gray-500">Date</p>
//                 <p className="font-medium">
//                   {new Date(formData.date).toLocaleDateString()}
//                 </p>
//               </div>
//               <div>
//                 <p className="text-sm text-gray-500">Time</p>
//                 <p className="font-medium">
//                   {formData.startTime} - {formData.endTime}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Reason for Visit
//             </label>
//             <select
//               name="reason"
//               value={formData.reason}
//               onChange={onChange}
//               required
//               className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
//             >
//               <option value="">Select reason</option>
//               <option value="Consultation">Consultation</option>
//               <option value="Follow-up">Follow-up</option>
//               <option value="Test Results">Test Results</option>
//               <option value="Treatment">Treatment</option>
//               <option value="Other">Other</option>
//             </select>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Additional Notes
//             </label>
//             <textarea
//               name="notes"
//               value={formData.notes}
//               onChange={onChange}
//               rows="3"
//               className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
//               placeholder="Any additional information the doctor should know..."
//             ></textarea>
//           </div>

//           <div className="flex items-center">
//             <input
//               type="checkbox"
//               id="emergency"
//               name="emergency"
//               checked={formData.emergency}
//               onChange={onChange}
//               className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
//             />
//             <label htmlFor="emergency" className="ml-2 text-sm text-gray-700">
//               This is an emergency
//             </label>
//           </div>
//         </div>

//         <div className="mt-8 flex justify-end">
//           <button
//             type="submit"
//             disabled={isSubmitting || !formData.reason}
//             className={`px-6 py-2 rounded-md ${
//               isSubmitting || !formData.reason
//                 ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//                 : "bg-blue-600 text-white hover:bg-blue-700"
//             }`}
//           >
//             {isSubmitting ? "Booking..." : "Book Appointment"}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

// src/components/AppointmentForm.jsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AppointmentForm({ formData, onChange, onBack }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    // Debug: Log the formData to verify doctorId is present
    console.log("Submitting appointment data:", formData);

    try {
      // Make sure doctorId is included in the request body
      if (!formData.doctorId) {
        throw new Error("Doctor ID is missing. Please select a doctor.");
      }

      // Send data to API endpoint
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Use the complete formData object
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to book appointment");
      }

      // Show success message and redirect after a delay
      setSuccess(true);
      setTimeout(() => {
        router.push("/appointments"); // Redirect to appointments page
      }, 2000);
    } catch (err) {
      setError(
        err.message || "An error occurred while booking your appointment"
      );
      console.error("Appointment booking error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          </div>
          <h2 className="text-2xl font-medium text-gray-900 mb-2">
            Appointment Booked!
          </h2>
          <p className="text-gray-600">
            Your appointment has been successfully scheduled.
          </p>
          <p className="text-gray-600 mt-1">
            Redirecting to your appointments...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-medium">Appointment Details</h2>
        <button
          onClick={onBack}
          className="text-blue-600 hover:underline flex items-center"
          type="button"
        >
          <span className="mr-1">←</span> Back
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <h3 className="font-medium mb-2">Selected Information</h3>
          <div className="bg-gray-50 p-4 rounded-md">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-500">Department</p>
                <p className="font-medium">{formData.department}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Date</p>
                <p className="font-medium">
                  {new Date(formData.date).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Time</p>
                <p className="font-medium">
                  {formData.startTime} - {formData.endTime}
                </p>
              </div>
            </div>
            {/* Add a hidden field to display doctorId for debugging */}
            <div className="mt-2 text-xs text-gray-400">
              Doctor ID: {formData.doctorId || "Not selected"}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Reason for Visit
            </label>
            <select
              name="reason"
              value={formData.reason}
              onChange={onChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select reason</option>
              <option value="Consultation">Consultation</option>
              <option value="Follow-up">Follow-up</option>
              <option value="Test Results">Test Results</option>
              <option value="Treatment">Treatment</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Additional Notes
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={onChange}
              rows="3"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Any additional information the doctor should know..."
            ></textarea>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="emergency"
              name="emergency"
              checked={formData.emergency}
              onChange={(e) =>
                onChange({
                  target: {
                    name: "emergency",
                    value: e.target.checked,
                  },
                })
              }
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="emergency" className="ml-2 text-sm text-gray-700">
              This is an emergency
            </label>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting || !formData.reason || !formData.doctorId}
            className={`px-6 py-2 rounded-md ${
              isSubmitting || !formData.reason || !formData.doctorId
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {isSubmitting ? "Booking..." : "Book Appointment"}
          </button>
        </div>
      </form>
    </div>
  );
}
