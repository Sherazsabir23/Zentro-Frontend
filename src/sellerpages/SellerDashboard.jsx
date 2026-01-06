import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import sellerApi from "../api/sellerauth"; // ✅ Alag folder se import
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const SellerDashboard = () => {
  const [metrics, setMetrics] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch seller metrics and recent orders
  const fetchDashboard = async () => {
    setLoading(true);
    try {
      const metricsData = await sellerApi.fetchSellerMetrics({ credentials: "include" });
      if (metricsData.success) setMetrics(metricsData);
      else toast.error(metricsData.message || "Failed to fetch metrics");

      const ordersData = await sellerApi.fetchSellerOrders({ credentials: "include" });
      if (ordersData.success) setOrders(ordersData.orders);
      else toast.error(ordersData.message || "Failed to fetch orders");
    } catch (err) {
      console.error(err);
      toast.error("Server error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  // ✅ Loading or no metrics yet
  if (loading || !metrics)
    return (
      <div className="text-orange-500 text-xl font-semibold text-center mt-10">
        Loading Dashboard...
      </div>
    );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-orange-500 mb-6 text-center">
        Seller Dashboard
      </h1>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <MetricCard title="Total Orders" value={metrics?.totalOrders || 0} color="bg-blue-500" />
        <MetricCard title="Pending Orders" value={metrics?.pendingOrders || 0} color="bg-yellow-500" />
        <MetricCard title="Processing Orders" value={metrics?.processingOrders || 0} color="bg-purple-500" />
        <MetricCard title="Ready For Shipped" value={metrics?.readyForShippedOrders || 0} color="bg-indigo-500" />
        <MetricCard title="Shipped Orders" value={metrics?.shippedOrders || 0} color="bg-teal-500" />
        <MetricCard title="Delivered Orders" value={metrics?.deliveredOrders || 0} color="bg-green-500" />
        <MetricCard title="Total Sales" value={`$${metrics?.totalSales || 0}`} color="bg-orange-500" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Monthly Sales */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4 text-orange-500">Monthly Sales</h2>
          <Line
            data={{
              labels: metrics?.months || [],
              datasets: [
                {
                  label: "Sales ($)",
                  data: metrics?.monthlySales || [],
                  backgroundColor: "rgba(255,165,0,0.5)",
                  borderColor: "orange",
                  borderWidth: 2,
                  fill: true,
                  tension: 0.3,
                },
              ],
            }}
            options={{ responsive: true, plugins: { legend: { display: false } } }}
          />
        </div>

        {/* Orders by Status */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4 text-orange-500">Orders by Status</h2>
          <Bar
            data={{
              labels: ["Pending", "Processing", "ReadyForShipped", "Shipped", "Delivered"],
              datasets: [
                {
                  label: "# of Orders",
                  data: [
                    metrics?.pendingOrders || 0,
                    metrics?.processingOrders || 0,
                    metrics?.readyForShippedOrders || 0,
                    metrics?.shippedOrders || 0,
                    metrics?.deliveredOrders || 0,
                  ],
                  backgroundColor: ["#FBBF24", "#A78BFA", "#6366F1", "#14B8A6", "#22C55E"],
                },
              ],
            }}
            options={{ responsive: true, plugins: { legend: { display: false } } }}
          />
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white shadow-md rounded-lg overflow-x-auto">
        <h2 className="text-xl font-bold text-orange-500 p-4">Recent Orders</h2>
        <table className="min-w-full text-left">
          <thead className="bg-orange-500 text-white">
            <tr>
              <th className="px-6 py-3">Order ID</th>
              <th className="px-6 py-3">Customer</th>
              <th className="px-6 py-3">Items</th>
              <th className="px-6 py-3">Total</th>
              <th className="px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-3 text-center text-gray-500">
                  No orders found.
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order._id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-3">{order._id.slice(-6)}</td>
                  <td className="px-6 py-3">{order.user?.name || "N/A"}</td>
                  <td className="px-6 py-3">{order.items?.length || 0}</td>
                  <td className="px-6 py-3">
                    ${order.items?.reduce((a, i) => a + i.price * i.quantity, 0) || 0}
                  </td>
                  <td className="px-6 py-3">{order.items?.[0]?.sellerStatus || "N/A"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ✅ Metric Card Component
const MetricCard = ({ title, value, color }) => (
  <div
    className={`${color} text-white p-4 rounded-lg shadow flex flex-col items-center justify-center`}
  >
    <h3 className="text-lg font-medium">{title}</h3>
    <p className="text-2xl font-bold mt-2">{value}</p>
  </div>
);

export default SellerDashboard;
