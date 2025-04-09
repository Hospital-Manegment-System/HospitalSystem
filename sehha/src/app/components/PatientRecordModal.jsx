"use client";
import { useState, useEffect } from "react";
import axios from "axios";

export default function PatientRecordModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) {
  const [formData, setFormData] = useState({
    patientId: "",
    doctorId: "", // Add this line
    diagnosis: "",
    treatment: "",
    medications: [],
    notes: "",
    labResults: [],
    vitalSigns: {
      bloodPressure: "",
      heartRate: "",
      temperature: "",
      oxygenSaturation: "",
    },
  });
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchPatients();
      fetchDoctors();
      if (initialData) {
        setFormData({
          patientId: initialData.patient._id,
          doctorId: initialData.doctor._id, // Add this line
          diagnosis: initialData.diagnosis,
          treatment: initialData.treatment,
          medications: initialData.medications,
          notes: initialData.notes,
          labResults: initialData.labResults,
          vitalSigns: initialData.vitalSigns,
        });
      } else {
        setFormData({
          patientId: "",
          doctorId: "", // Add this line
          diagnosis: "",
          treatment: "",
          medications: [],
          notes: "",
          labResults: [],
          vitalSigns: {
            bloodPressure: "",
            heartRate: "",
            temperature: "",
            oxygenSaturation: "",
          },
        });
      }
    }
  }, [isOpen, initialData]);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get("/api/admin/users", {
        params: { role: "doctor" },
        withCredentials: true,
      });
      setDoctors(response.data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };
  const fetchPatients = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("/api/admin/users", {
        params: { role: "patient" },
        withCredentials: true,
      });
      setPatients(response.data);
    } catch (error) {
      console.error("Error fetching patients:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleVitalSignChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      vitalSigns: { ...prev.vitalSigns, [name]: value },
    }));
  };

  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     onSubmit(formData);
  //   };
  //   const handleSubmit = async (e) => {
  //     e.preventDefault();

  //     try {
  //       if (initialData) {
  //         // Update record
  //         await axios.put(
  //           `/api/patient-records/${initialData.patient._id}`,
  //           formData,
  //           {
  //             withCredentials: true,
  //           }
  //         );
  //       } else {
  //         // Create record
  //         await axios.post("/api/patient-records", formData, {
  //           withCredentials: true,
  //         });
  //       }

  //       onSubmit(); // Refresh or close modal
  //     } catch (error) {
  //       console.error("Error submitting form:", error);
  //     }
  //   };
  //   const handleSubmit = async (e) => {
  //     e.preventDefault();

  //     try {
  //       if (initialData) {
  //         // Update record
  //         await axios.put(
  //           `/api/patient-records/${initialData.patient._id}`,
  //           formData,
  //           {
  //             withCredentials: true,
  //           }
  //         );
  //       } else {
  //         // Create record
  //         // await axios.post("/api/patient-records", formData, {
  //         //   withCredentials: true,
  //         // });
  //       }

  //       onSubmit(formData); // ✅ FIXED: Pass formData
  //     } catch (error) {
  //       console.error("Error submitting form:", error);
  //     }
  //   };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Just pass formData to parent, don't call axios here
      onSubmit(formData);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">
              {initialData ? "Edit Record" : "Add New Record"}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Patient
                </label>
                <select
                  name="patientId"
                  value={formData.patientId}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                  disabled={!!initialData}
                >
                  <option value="">Select Patient</option>
                  {patients.map((patient) => (
                    <option key={patient._id} value={patient._id}>
                      {patient.name} ({patient.email})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Doctor
                </label>
                <select
                  name="doctorId"
                  value={formData.doctorId}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                  disabled={!!initialData}
                >
                  <option value="">Select Doctor</option>
                  {doctors.map((doctor) => (
                    <option key={doctor._id} value={doctor._id}>
                      {doctor.name} ({doctor.email})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Diagnosis
                </label>
                <input
                  type="text"
                  name="diagnosis"
                  value={formData.diagnosis}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Treatment
              </label>
              <textarea
                name="treatment"
                value={formData.treatment}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Notes
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                rows={3}
              />
            </div>

            <div className="border-t pt-4">
              <h3 className="text-lg font-medium mb-3">Vital Signs</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Blood Pressure
                  </label>
                  <input
                    type="text"
                    name="bloodPressure"
                    value={formData.vitalSigns.bloodPressure}
                    onChange={handleVitalSignChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Heart Rate (bpm)
                  </label>
                  <input
                    type="number"
                    name="heartRate"
                    value={formData.vitalSigns.heartRate}
                    onChange={handleVitalSignChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Temperature (°C)
                  </label>
                  <input
                    type="number"
                    name="temperature"
                    value={formData.vitalSigns.temperature}
                    onChange={handleVitalSignChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    O₂ Saturation (%)
                  </label>
                  <input
                    type="number"
                    name="oxygenSaturation"
                    value={formData.vitalSigns.oxygenSaturation}
                    onChange={handleVitalSignChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
              >
                {initialData ? "Update Record" : "Create Record"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
