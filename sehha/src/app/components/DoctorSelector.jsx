// // src/components/DoctorSelector.jsx
// "use client";

// import { useState, useEffect } from "react";
// import Image from "next/image";

// export default function DoctorSelector({ department, onSelect, onBack }) {
//   const [doctors, setDoctors] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchDoctors = async () => {
//       try {
//         const response = await fetch(`/api/doctors?department=${department}`);
//         if (!response.ok) {
//           throw new Error("Failed to fetch doctors");
//         }
//         const data = await response.json();
//         setDoctors(data.doctors);
//       } catch (err) {
//         setError("Failed to load doctors. Please try again.");
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDoctors();
//   }, [department]);

//   if (loading) {
//     return (
//       <div className="text-center py-12">
//         <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
//         <p className="mt-2">Loading doctors...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="bg-red-100 p-4 rounded-lg">
//         <p className="text-red-700">{error}</p>
//         <button
//           onClick={onBack}
//           className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
//         >
//           Go Back
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-white p-6 rounded-lg shadow-md">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-xl font-medium">Select Doctor from {department}</h2>
//         <button
//           onClick={onBack}
//           className="text-blue-600 hover:underline flex items-center"
//         >
//           <span className="mr-1">←</span> Back
//         </button>
//       </div>

//       {doctors.length === 0 ? (
//         <p className="text-gray-500">
//           No doctors available in this department.
//         </p>
//       ) : (
//         <div className="grid grid-cols-1 gap-4">
//           {doctors.map((doctor) => (
//             <div
//               key={doctor._id}
//               onClick={() => onSelect(doctor._id)}
//               className="p-4 border border-gray-200 rounded-lg hover:bg-blue-50 cursor-pointer flex items-center"
//             >
//               <div className="w-16 h-16 bg-gray-200 rounded-full overflow-hidden mr-4">
//                 <img
//                   src="/api/placeholder/64/64"
//                   alt={doctor.userId.name}
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//               <div className="flex-1">
//                 <h3 className="font-medium text-lg">
//                   Dr. {doctor.userId.name}
//                 </h3>
//                 <p className="text-gray-600">
//                   {doctor.specializations.join(", ")}
//                 </p>
//                 <div className="flex items-center mt-1">
//                   <div className="flex text-yellow-400">
//                     {[...Array(5)].map((_, i) => (
//                       <span
//                         key={i}
//                         className={
//                           i < Math.floor(doctor.rating)
//                             ? "text-yellow-400"
//                             : "text-gray-300"
//                         }
//                       >
//                         ★
//                       </span>
//                     ))}
//                   </div>
//                   <span className="ml-1 text-sm text-gray-600">
//                     {doctor.rating.toFixed(1)} ({doctor.reviewCount} reviews)
//                   </span>
//                 </div>
//                 <p className="text-gray-600 text-sm mt-1">
//                   {doctor.experience} years experience
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// src/components/DoctorSelector.jsx
"use client";

import { useState, useEffect } from "react";

export default function DoctorSelector({ department, onSelect, onBack }) {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);

        // استبدال هذا بال API الحقيقي
        setTimeout(() => {
          // البيانات المحاكية للمستشفى
          const sampleDoctors = {
            Cardiology: [
              {
                _id: "c1",
                userId: { name: "Robert Smith" },
                specializations: ["Heart Disease"],
                rating: 4.8,
                reviewCount: 124,
                experience: 15,
              },
              {
                _id: "c2",
                userId: { name: "Sarah Johnson" },
                specializations: ["Cardiac Surgery"],
                rating: 4.7,
                reviewCount: 98,
                experience: 12,
              },
              {
                _id: "c3",
                userId: { name: "Michael Chen" },
                specializations: ["Interventional Cardiology"],
                rating: 4.9,
                reviewCount: 156,
                experience: 18,
              },
            ],
            // إضافة الأقسام الأخرى هنا...
          };

          setDoctors(sampleDoctors[department] || []);
          setLoading(false);
        }, 800);
      } catch (err) {
        setError("Failed to load doctors. Please try again.");
        console.error(err);
        setLoading(false);
      }
    };

    fetchDoctors();
  }, [department]);

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="mt-2">Loading doctors in {department}...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 p-4 rounded-lg">
        <p className="text-red-700">{error}</p>
        <button
          onClick={onBack}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-medium">Select Doctor from {department}</h2>
        <button
          onClick={onBack}
          className="text-blue-600 hover:underline flex items-center"
        >
          <span className="mr-1">←</span> Back
        </button>
      </div>

      {doctors.length === 0 ? (
        <p className="text-gray-500">
          No doctors available in this department.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {doctors.map((doctor) => (
            <div
              key={doctor._id}
              onClick={() => onSelect(doctor._id)}
              className="border border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all cursor-pointer"
            >
              <div className="p-4 flex flex-col h-full">
                <div className="flex items-start mb-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full overflow-hidden flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="text-blue-600 text-2xl font-medium">
                      {doctor.userId.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">
                      Dr. {doctor.userId.name}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {department} Specialist
                    </p>
                    <div className="flex items-center mt-1">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={
                              i < Math.floor(doctor.rating)
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }
                          >
                            ★
                          </span>
                        ))}
                      </div>
                      <span className="ml-1 text-xs text-gray-600">
                        {doctor.rating.toFixed(1)} ({doctor.reviewCount})
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-auto">
                  <div className="mb-2">
                    <span className="text-sm text-gray-600">
                      {doctor.experience} years experience
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {doctor.specializations.map((spec, index) => (
                      <span
                        key={index}
                        className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                  <button
                    className="w-full mt-4 bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-md text-sm font-medium transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelect(doctor._id);
                    }}
                  >
                    Select Doctor
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
