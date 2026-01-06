import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import adminApi from "../api/adminauth"; // import all functions

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");

  useEffect(() => {
    const getUsers = async () => {
      const res = await adminApi.fetchAllUsers();
      if (res.success) setUsers(res.users);
      else toast.error(res.message || "Failed to fetch users");
      setLoading(false);
    };
    getUsers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    const res = await adminApi.deleteUserById(id);
    if (res.success) {
      toast.success("User deleted successfully");
      setUsers(prev => prev.filter(u => u._id !== id));
    } else toast.error(res.message || "Failed to delete user");
  };

  const handleViewDetails = async (id) => {
    const res = await adminApi.getUserDetailsById(id);
    if (res.success) {
      setSelectedUser(res.user);
      setShowModal(true);
    } else toast.error(res.message || "Failed to fetch user details");
  };

  const filteredUsers = users.filter(u => {
    const matchesRole = roleFilter ? u.role.toLowerCase() === roleFilter.toLowerCase() : true;
    const matchesSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    return matchesRole && matchesSearch;
  });

  if (loading) return <div className="text-orange-500 text-xl font-semibold text-center mt-8">Loading Users...</div>;

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-orange-500 mb-6 text-center">All Users</h1>

      {/* Filters */}
      <div className="flex mb-4 space-x-4">
        <input
          type="text"
          placeholder="Search by name or email"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border px-3 py-1 rounded w-1/3"
        />
        <select value={roleFilter} onChange={e => setRoleFilter(e.target.value)} className="border px-3 py-1 rounded">
          <option value="">All Roles</option>
          <option value="user">User</option>
          <option value="seller">Seller</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white shadow-md rounded-lg overflow-x-auto">
        <table className="min-w-full text-left">
          <thead className="bg-orange-500 text-white">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Role</th>
              <th className="px-6 py-3">Created At</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-3 text-center text-gray-500">No users found.</td>
              </tr>
            ) : (
              filteredUsers.map(u => (
                <tr key={u._id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-3">{u.name}</td>
                  <td className="px-6 py-3">{u.email}</td>
                  <td className="px-6 py-3">{u.role}</td>
                  <td className="px-6 py-3">{new Date(u.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-3 space-x-2">
                    <button
                      onClick={() => handleViewDetails(u._id)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleDelete(u._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

     {/* Modal */}
{showModal && selectedUser && (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
    <div className="bg-white rounded-2xl w-96 sm:w-[500px] p-6 relative shadow-xl overflow-y-auto max-h-[90vh] animate-fadeIn">
      
      {/* Close Button */}
      <button
        onClick={() => setShowModal(false)}
        className="absolute top-4 right-4 text-white bg-red-500 px-3 py-1 rounded-full hover:bg-red-600 transition"
      >
        ✕
      </button>
      
      {/* Header */}
      <h2 className="text-2xl font-bold text-orange-500 mb-4 border-b pb-2">User Details</h2>
      
      {/* User Info */}
      <div className="space-y-2">
        <p><span className="font-semibold">Name:</span> {selectedUser.name}</p>
        <p><span className="font-semibold">Email:</span> {selectedUser.email}</p>
        <p><span className="font-semibold">Created:</span> {new Date(selectedUser.createdAt).toLocaleDateString()}</p>
        <p><span className="font-semibold">Role:</span> {selectedUser.role}</p>
      </div>

      {/* Shop Info */}
      {selectedUser.role === "seller" && selectedUser.shop && (
        <div className="mt-5 border-t pt-4 space-y-2">
          <h3 className="text-xl font-semibold text-orange-500">Shop Details</h3>
          <p><span className="font-semibold">Shop Name:</span> {selectedUser.shop.shopName}</p>
          <p><span className="font-semibold">Description:</span> {selectedUser.shop.description}</p>
          <p><span className="font-semibold">Category:</span> {selectedUser.shop.category}</p>
          <p><span className="font-semibold">Contact:</span> {selectedUser.shop.contact}</p>

          {/* Payment Info */}
          <div className="mt-3 border-t pt-2 space-y-1">
            <h4 className="font-semibold text-gray-700">Payment Info</h4>
            <p><span className="font-semibold">Method:</span> {selectedUser.shop.paymentInfo?.method}</p>
            <p><span className="font-semibold">Account Holder:</span> {selectedUser.shop.paymentInfo?.accountHolder}</p>
            <p><span className="font-semibold">Account Number:</span> {selectedUser.shop.paymentInfo?.accountNumber}</p>
            <p><span className="font-semibold">Bank Name:</span> {selectedUser.shop.paymentInfo?.bankName}</p>
            <p><span className="font-semibold">CNIC:</span> {selectedUser.shop.paymentInfo?.cnic}</p>
          </div>
        </div>
      )}
      
    </div>
  </div>
)}

    </div>
  );
};

export default AdminUsers;
