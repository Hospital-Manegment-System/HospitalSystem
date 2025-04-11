import { verifyToken } from "../lib/utils/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardLayout({ children }) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  try {
    const decoded = verifyToken(token);
    if (decoded.role !== "admin") {
      redirect("/");
    }
  } catch (error) {
    redirect("/auth/login");
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold text-gray-800">Admin Dashboard</h1>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <a
                href="/Dashboard/UserManagement"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-200 rounded"
              >
                User Management
              </a>
            </li>
            <li>
              <a
                href="/Dashboard/PatientRecords"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-200 rounded bg-gray-200"
              >
                Patient Records
              </a>
            </li>
            <li>
              <a
                href="/Dashboard/Analytics"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-200 rounded bg-gray-200"
              >
                Analytics
              </a>
            </li>
            <li>
              <a
                href="/Dashboard/TestData"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-200 rounded"
              >
                Test Data
              </a>
            </li>
            <li>
              <a
                href="/Dashboard/Schedules"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-200 rounded"
              >
                Doctor Schedules
              </a>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm p-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-800">Admin Panel</h2>
            <div className="flex items-center space-x-4">
              {/* User profile dropdown would go here */}
              <button className="text-gray-600 hover:text-gray-800">
                Logout
              </button>
            </div>
          </div>
        </header>
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
