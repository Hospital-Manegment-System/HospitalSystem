import UserTable from "../../components/UserTable";
import axios from "axios";

// async function getUsers() {
//   try {
//     const response = await axios.get(
//       `${process.env.NEXT_PUBLIC_API_URL}/api/admin/users`,
//       {
//         withCredentials: true,
//       }
//     );
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching users:", error);
//     return [];
//   }
// }
async function getUsers() {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/users`,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("API response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Detailed API error:", {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      headers: error.response?.headers,
    });
    return [];
  }
}
export default async function UserManagementPage() {
  const users = await getUsers();

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Add New User
        </button>
      </div>
      <UserTable users={users} />
    </div>
  );
}
