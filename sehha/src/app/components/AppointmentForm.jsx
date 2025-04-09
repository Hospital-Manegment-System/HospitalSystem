// src/components/AppointmentForm.jsx
export default function AppointmentForm({
  formData,
  onChange,
  onSubmit,
  isSubmitting,
  onBack,
}) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-medium">Appointment Details</h2>
        <button
          onClick={onBack}
          className="text-blue-600 hover:underline flex items-center"
        >
          <span className="mr-1">←</span> Back
        </button>
      </div>

      <form onSubmit={onSubmit}>
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
              onChange={onChange}
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
            disabled={isSubmitting || !formData.reason}
            className={`px-6 py-2 rounded-md ${
              isSubmitting || !formData.reason
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
