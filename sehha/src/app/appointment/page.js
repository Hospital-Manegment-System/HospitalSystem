// src/app/appointment/page.jsx - Main appointment booking page
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import DepartmentSelector from "@/app/components/DepartmentSelector";
import DoctorSelector from "@/app/components/DoctorSelector";
import DateTimeSelector from "@/app/components/DateTimeSelector";
import AppointmentForm from "@/app/components/AppointmentForm";

export default function AppointmentPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [departments, setDepartments] = useState([
    "Cardiology",
    "Dermatology",
    "Neurology",
    "Orthopedics",
    "Pediatrics",
    "Psychiatry",
    "Radiology",
    "Surgery",
  ]);
  const [formData, setFormData] = useState({
    patientId: "507f1f77bcf86cd799439011", // This would come from auth context in a real app
    doctorId: "",
    department: "",
    date: "",
    startTime: "",
    endTime: "",
    emergency: false,
    reason: "",
    notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleDepartmentSelect = (department) => {
    setFormData({ ...formData, department });
    setStep(2);
  };

  const handleDoctorSelect = (doctorId) => {
    setFormData({ ...formData, doctorId });
    setStep(3);
  };

  const handleDateTimeSelect = (date, startTime, endTime) => {
    setFormData({ ...formData, date, startTime, endTime });
    setStep(4);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };
const handleSubmit = (e) => {
  e.preventDefault();
  setIsSubmitting(true);
  setError("");

  // طباعة البيانات بدلاً من إرسالها عبر fetch
  console.log(formData); // هنا يمكنك تنفيذ العمليات المطلوبة على البيانات

  try {
    // في حال كنت بحاجة فقط لمعالجة البيانات على المستوى المحلي
    // على سبيل المثال، يمكن تنفيذ عملية معينة أو حفظ البيانات في محلية.
    setSuccess("Appointment booked successfully!");

    // تنفيذ أي عملية بعد إرسال البيانات، مثل إعادة التوجيه أو غيرها
    setTimeout(() => {
      router.push("/appointment"); // إعادة التوجيه إلى صفحة النجاح
    }, 2000);
  } catch (error) {
    setError(error.message);
  } finally {
    setIsSubmitting(false);
  }
};



  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        Book a Doctor Appointment
      </h1>

      <div className="mb-8">
        <div className="flex items-center justify-between mb-8">
          {[1, 2, 3, 4].map((stepNumber) => (
            <div key={stepNumber} className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step === stepNumber
                    ? "bg-blue-600 text-white"
                    : step > stepNumber
                    ? "bg-green-500 text-white"
                    : "bg-gray-200"
                }`}
              >
                {step > stepNumber ? "✓" : stepNumber}
              </div>
              <div className="text-sm mt-2">
                {stepNumber === 1 && "Department"}
                {stepNumber === 2 && "Doctor"}
                {stepNumber === 3 && "Date & Time"}
                {stepNumber === 4 && "Details"}
              </div>
            </div>
          ))}
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {success}
        </div>
      )}

      {step === 1 && (
        <DepartmentSelector
          departments={departments}
          onSelect={handleDepartmentSelect}
        />
      )}

      {step === 2 && (
        <DoctorSelector
          department={formData.department}
          onSelect={handleDoctorSelect}
          onBack={() => setStep(1)}
        />
      )}

      {step === 3 && (
        <DateTimeSelector
          doctorId={formData.doctorId}
          onSelect={handleDateTimeSelect}
          onBack={() => setStep(2)}
        />
      )}

      {step === 4 && (
        <AppointmentForm
          formData={formData}
          onChange={handleInputChange}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          onBack={() => setStep(3)}
        />
      )}
    </div>
  );
}
