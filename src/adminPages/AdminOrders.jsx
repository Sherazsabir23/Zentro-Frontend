import React, { useEffect, useState } from "react";
import orderApi from "../api/orderApi";
import { toast } from "react-hot-toast";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [statusFilter, setStatusFilter] = useState("All");
  const [paymentFilter, setPaymentFilter] = useState("All");
  const [codFilter, setCodFilter] = useState("All");

  // Fetch orders with filters
  const fetchOrders = async () => {
    setLoading(true);

    try {
      const res = await orderApi.adminOrders({
        status: statusFilter,
        paymentType: paymentFilter,
        codStatus: codFilter,
      });

      if (res.success) {
        setOrders(res.orders);
      } else {
        toast.error("Failed to fetch orders");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [statusFilter, paymentFilter, codFilter]);

  // Update order status
  const updateStatus = async (id, status) => {
    try {
      const res = await orderApi.updateStatus(id, { status });
      if (res.success) {
        toast.success(`Order marked as ${status}`);
        fetchOrders();
      } else {
        toast.error("Failed to update status");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error");
    }
  };

  // Mark COD Settled
  const markCODSettled = async (id) => {
    try {
      const res = await orderApi.markCODSettled(id);
      if (res.success) {
        toast.success("COD Settled");
        fetchOrders();
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error");
    }
  };

  // Admin action button logic
  const getAdminAction = (order) => {
    const ready = order.items.every(
      (item) => item.sellerStatus === "ReadyForShipped"
    );

    if (!ready) return null;

    if (order.status !== "Shipped" && order.status !== "Delivered")
      return "Shipped";

    if (order.status === "Shipped") return "Delivered";

    if (
      order.status === "Delivered" &&
      order.paymentMethod === "COD" &&
      !order.isCODSettled
    )
      return "CODSettled";

    return null;
  };

  return (
    <div className="p-5 md:p-10 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-orange-600 text-center mb-8">
        Admin Orders
      </h1>

      {/* FILTER BAR */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-8 flex flex-wrap gap-4 justify-between">
        {/* Status Filter */}
        <div>
          <label className="font-semibold">Order Status</label>
          <select
            className="border p-2 rounded ml-2"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option>All</option>
            <option>ReadyForShipped</option>
            <option>Shipped</option>
            <option>Delivered</option>
          </select>
        </div>

        {/* Payment Type */}
        <div>
          <label className="font-semibold">Payment Type</label>
          <select
            className="border p-2 rounded ml-2"
            value={paymentFilter}
            onChange={(e) => setPaymentFilter(e.target.value)}
          >
            <option>All</option>
            <option>COD</option>
            <option>Online</option>
          </select>
        </div>

        {/* COD Status */}
        <div>
          <label className="font-semibold">COD Settlement</label>
          <select
            className="border p-2 rounded ml-2"
            value={codFilter}
            onChange={(e) => setCodFilter(e.target.value)}
          >
            <option>All</option>
            <option>Settled</option>
            <option>Unsettled</option>
          </select>
        </div>
      </div>

      {/* LOADING */}
      {loading && (
        <div className="text-center text-gray-600 text-xl">Loading...</div>
      )}

      {/* ORDERS LIST */}
      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white p-6 rounded-lg shadow-lg border"
          >
            {/* Order Header */}
            <div className="mb-4">
              <h2 className="text-xl font-bold text-gray-700">
                Order #{order._id.slice(-6).toUpperCase()}
              </h2>
              <p className="text-gray-600">
                Customer: <span className="font-medium">{order.user?.name}</span>
              </p>
              <p className="text-gray-600">Phone: {order.address.phone}</p>
              <p className="text-gray-600">
                Address: {order.address.street}, {order.address.city}
              </p>
              <p className="text-blue-700 font-semibold">
                Status: {order.status || "Pending"}
              </p>
              <p className="text-green-700 font-semibold">
                Payment: {order.paymentStatus}
              </p>
              <p className="text-gray-600">
                COD Settled: {order.isCODSettled ? "Yes" : "No"}
              </p>
            </div>

            {/* Items */}
            <div>
              <h3 className="font-semibold mb-2">Items:</h3>
              {order.items.map((item) => (
                <div className="flex items-center gap-4 border-b py-3" key={item._id}>
                  <img
                    src={`${import.meta.env.VITE_IMAGE_URL}${
                      item.product.productimages?.[0] || "placeholder.jpg"
                    }`}
                    className="w-16 h-16 object-cover rounded border"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">
                      {item.product.productname}
                    </p>
                    <p className="text-gray-500 text-sm">Qty: {item.quantity}</p>
                    <p className="text-gray-500 text-sm">
                      Seller: {item.seller.shopName}
                    </p>
                    <p className="text-gray-500 text-sm">
                      Seller Status:{" "}
                      <span className="text-blue-600">{item.sellerStatus}</span>
                    </p>
                  </div>

                  <p className="text-orange-600 font-semibold">Rs {item.price}</p>
                </div>
              ))}
            </div>

            {/* Total */}
            <p className="mt-3 font-semibold text-lg">
              Total:{" "}
              <span className="text-orange-600">Rs {order.totalAmount}</span>
            </p>

            {/* Admin Actions */}
            <div className="mt-4 flex flex-wrap gap-3">
              {getAdminAction(order) === "Shipped" && (
                <button
                  onClick={() => updateStatus(order._id, "Shipped")}
                  className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600"
                >
                  Mark as Shipped
                </button>
              )}

              {getAdminAction(order) === "Delivered" && (
                <button
                  onClick={() => updateStatus(order._id, "Delivered")}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Mark Delivered
                </button>
              )}

              {getAdminAction(order) === "CODSettled" && (
                <button
                  onClick={() => markCODSettled(order._id)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                >
                  Mark COD Settled
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminOrders;
