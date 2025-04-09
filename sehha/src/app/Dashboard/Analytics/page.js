"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function AnalyticsPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("monthly");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [activeTab, setActiveTab] = useState("visits");

  useEffect(() => {
    fetchData();
  }, [timeRange, startDate, endDate]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      params.append("range", timeRange);
      if (startDate) params.append("start", startDate.toISOString());
      if (endDate) params.append("end", endDate.toISOString());

      const response = await axios.get(`/api/analytics?${params.toString()}`, {
        withCredentials: true,
      });
      setData(response.data);
    } catch (error) {
      console.error("Error fetching analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDateLabel = (item) => {
    if (timeRange === "yearly") return `${item._id.year}`;
    if (timeRange === "monthly") return `${item._id.year}-${item._id.month}`;
    return `${item._id.year}-${item._id.month}-${item._id.day}`;
  };

  const handleTimeRangeChange = (range) => {
    setTimeRange(range);
    setStartDate(null);
    setEndDate(null);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Analytics Dashboard</h1>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="flex flex-wrap items-center gap-4 mb-4">
          <div className="flex items-center space-x-2">
            <span className="font-medium">Time Range:</span>
            <button
              onClick={() => handleTimeRangeChange("weekly")}
              className={`px-3 py-1 rounded ${
                timeRange === "weekly"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200"
              }`}
            >
              Weekly
            </button>
            <button
              onClick={() => handleTimeRangeChange("monthly")}
              className={`px-3 py-1 rounded ${
                timeRange === "monthly"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => handleTimeRangeChange("yearly")}
              className={`px-3 py-1 rounded ${
                timeRange === "yearly"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200"
              }`}
            >
              Yearly
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <span className="font-medium">Custom Range:</span>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              placeholderText="Start Date"
              className="border rounded p-1"
            />
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              placeholderText="End Date"
              className="border rounded p-1"
            />
            {(startDate || endDate) && (
              <button
                onClick={() => {
                  setStartDate(null);
                  setEndDate(null);
                }}
                className="text-red-500 hover:text-red-700"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Summary Cards */}
        {data?.totals && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg shadow border-l-4 border-blue-500">
              <h3 className="font-medium text-gray-500">Total Appointments</h3>
              <p className="text-2xl font-bold">{data.totals.appointments}</p>
              <div className="flex justify-between text-sm mt-2">
                <span className="text-green-500">
                  Completed: {data.totals.completed}
                </span>
                <span className="text-red-500">
                  Cancelled: {data.totals.cancelled}
                </span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow border-l-4 border-green-500">
              <h3 className="font-medium text-gray-500">Patient Visits</h3>
              <p className="text-2xl font-bold">{data.totals.patientVisits}</p>
              <p className="text-sm mt-2">
                Unique Patients: {data.totals.uniquePatients}
              </p>
            </div>

            <div className="bg-white p-4 rounded-lg shadow border-l-4 border-purple-500">
              <h3 className="font-medium text-gray-500">Total Revenue</h3>
              <p className="text-2xl font-bold">
                ${data.totals.revenue.toFixed(2)}
              </p>
              <p className="text-sm mt-2">
                Average per appointment: $
                {data.totals.appointments
                  ? (data.totals.revenue / data.totals.appointments).toFixed(2)
                  : "0.00"}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="mb-4 border-b border-gray-200">
        <nav className="flex space-x-4">
          <button
            onClick={() => setActiveTab("visits")}
            className={`py-2 px-4 font-medium ${
              activeTab === "visits"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500"
            }`}
          >
            Patient Visits
          </button>
          <button
            onClick={() => setActiveTab("appointments")}
            className={`py-2 px-4 font-medium ${
              activeTab === "appointments"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500"
            }`}
          >
            Appointments
          </button>
          <button
            onClick={() => setActiveTab("revenue")}
            className={`py-2 px-4 font-medium ${
              activeTab === "revenue"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500"
            }`}
          >
            Revenue
          </button>
        </nav>
      </div>

      {/* Charts */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : data ? (
        <div className="bg-white p-4 rounded-lg shadow">
          {activeTab === "visits" && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Patient Visits</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={data.patientVisits.map((item) => ({
                      name: formatDateLabel(item),
                      visits: item.count,
                      unique: item.uniquePatientCount,
                    }))}
                    margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="name"
                      angle={-45}
                      textAnchor="end"
                      height={60}
                    />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="visits" name="Total Visits" fill="#8884d8" />
                    <Bar
                      dataKey="unique"
                      name="Unique Patients"
                      fill="#82ca9d"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {activeTab === "appointments" && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Appointments</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={data.appointments.map((item) => ({
                      name: formatDateLabel(item),
                      total: item.count,
                      completed: item.completed,
                      cancelled: item.cancelled,
                    }))}
                    margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="name"
                      angle={-45}
                      textAnchor="end"
                      height={60}
                    />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey="total"
                      name="Total Appointments"
                      fill="#8884d8"
                    />
                    <Bar dataKey="completed" name="Completed" fill="#82ca9d" />
                    <Bar dataKey="cancelled" name="Cancelled" fill="#ff8042" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {activeTab === "revenue" && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Revenue</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={data.appointments.map((item) => ({
                      name: formatDateLabel(item),
                      revenue: item.revenue,
                    }))}
                    margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="name"
                      angle={-45}
                      textAnchor="end"
                      height={60}
                    />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="revenue" name="Revenue ($)" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-10 text-gray-500">
          No data available for the selected time range
        </div>
      )}

      {/* Export Button */}
      {data && (
        <div className="mt-6 flex justify-end">
          <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            Export Report
          </button>
        </div>
      )}
    </div>
  );
}
