import React, { useEffect, useState } from "react";
import adminApi from "../api/adminauth";

const AdminDashboard = () => {
  const [stats, setStats] = useState({});
  const [latestOrders, setLatestOrders] = useState([]);
  const [latestUsers, setLatestUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const statsData = await adminApi.fetchDashboardStats();
        const ordersData = await adminApi.fetchLatestOrders();
        const usersData = await adminApi.fetchLatestUsers();

        if (statsData.success) setStats(statsData.data);
        if (ordersData.success) setLatestOrders(ordersData.orders);
        if (usersData.success) setLatestUsers(usersData.users);

      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-orange-500 text-xl font-semibold">
        Loading...
      </div>
    );

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl sm:text-left text-center  font-bold text-orange-500 mb-8">Admin Dashboard Overview</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-10">
        <div className="bg-white shadow-md rounded-lg p-6 text-center border-t-4 border-orange-500">
          <div className="text-gray-500 text-sm font-medium">Total Users</div>
          <div className="text-2xl font-bold text-gray-800">{stats.totalUsers}</div>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6 text-center border-t-4 border-orange-500">
          <div className="text-gray-500 text-sm font-medium">Total Sellers</div>
          <div className="text-2xl font-bold text-gray-800">{stats.totalSellers}</div>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6 text-center border-t-4 border-orange-500">
          <div className="text-gray-500 text-sm font-medium">Total Orders</div>
          <div className="text-2xl font-bold text-gray-800">{stats.totalOrders}</div>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6 text-center border-t-4 border-orange-500">
          <div className="text-gray-500 text-sm font-medium">Pending Orders</div>
          <div className="text-2xl font-bold text-gray-800">{stats.pendingOrders}</div>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6 text-center border-t-4 border-orange-500">
          <div className="text-gray-500 text-sm font-medium">Total Earnings</div>
          <div className="text-2xl font-bold text-gray-800">{stats.totalEarnings.toFixed(2)}</div>
        </div>
      </div>

      {/* Latest Orders */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold text-orange-500 mb-4">Latest Orders</h2>
        <div className="bg-white shadow-md rounded-lg overflow-x-auto">
          <table className="min-w-full text-left">
            <thead className="bg-orange-500 text-white">
              <tr>
                <th className="px-6 py-3">User</th>
                <th className="px-6 py-3">Amount</th>
                <th className="px-6 py-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {latestOrders.map(order => (
                <tr key={order._id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-3">{order.user?.name}</td>
                  <td className="px-6 py-3">{order.totalAmount}</td>
                  <td className="px-6 py-3">{new Date(order.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Latest Users */}
      <div>
        <h2 className="text-2xl font-semibold text-orange-500 mb-4">Latest Users</h2>
        <div className="bg-white shadow-md rounded-lg overflow-x-auto">
          <table className="min-w-full text-left">
            <thead className="bg-orange-500 text-white">
              <tr>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Email</th>
              </tr>
            </thead>
            <tbody>
              {latestUsers.map(user => (
                <tr key={user._id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-3">{user.name}</td>
                  <td className="px-6 py-3">{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
