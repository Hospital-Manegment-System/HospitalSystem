// import UserTable from "../../components/UserTable";
// import axios from "axios";

// async function getUsers() {
//   try {
//     const response = await axios.get(
//       `${process.env.NEXT_PUBLIC_API_URL}/api/admin/users`,
//       {
//         withCredentials: true,
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     console.log("API response:", response.data);
//     return response.data;
//   } catch (error) {
//     console.error("Detailed API error:", {
//       message: error.message,
//       status: error.response?.status,
//       data: error.response?.data,
//       headers: error.response?.headers,
//     });
//     return [];
//   }
// }
// export default async function UserManagementPage() {
//   const users = await getUsers();

//   return (
//     <div>
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
//         <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
//           Add New User
//         </button>
//       </div>
//       <UserTable users={users} />
//     </div>
//   );
// }
"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import UserTable from "../../components/UserTable";
import UserModal from "../../components/UserModal";
// async function getUsers() {
//   try {
//     const response = await axios.get(
//       `${process.env.NEXT_PUBLIC_API_URL}/api/admin/users`,
//       {
//         withCredentials: true,
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     console.log("API response:", response.data);
//     return response.data;
//   } catch (error) {
//     console.error("Detailed API error:", {
//       message: error.message,
//       status: error.response?.status,
//       data: error.response?.data,
//       headers: error.response?.headers,
//     });
//     return [];
//   }
// }
export default function UserManagementPage() {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      setError("");
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/users`,
        {
          withCredentials: true,
        }
      );
      console.log(response.data);
      setUsers(response.data);
    } catch (err) {
      setError("Failed to load users");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreateUser = async (userData) => {
    try {
      await axios.post("/api/admin/users", userData, {
        withCredentials: true,
      });
      fetchUsers();
      setIsModalOpen(false);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to create user");
      console.error(err);
    }
  };

  const handleUpdateUser = async (userId, userData) => {
    try {
      await axios.put(`/api/admin/users/${userId}`, userData, {
        withCredentials: true,
      });
      fetchUsers();
      setIsModalOpen(false);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to update user");
      console.error(err);
    }
  };

  const handleStatusChange = async (userId, status) => {
    try {
      await axios.put(
        `/api/admin/users/${userId}`,
        { status },
        { withCredentials: true }
      );
      fetchUsers();
    } catch (err) {
      setError("Failed to update user status");
      console.error(err);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
        <button
          onClick={() => {
            setSelectedUser(null);
            setIsModalOpen(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add New User
        </button>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">{error}</div>
      )}

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <UserTable
          users={users}
          onEdit={(user) => {
            setSelectedUser(user);
            setIsModalOpen(true);
          }}
          onStatusChange={handleStatusChange}
        />
      )}

      <UserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={
          selectedUser
            ? (data) => handleUpdateUser(selectedUser._id, data)
            : handleCreateUser
        }
        initialData={selectedUser}
      />
    </div>
  );
}
