import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import orderApi from "../api/orderApi";

const SellerOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("All");

  // ---------------------
  // Fetch Seller Orders
  // ---------------------
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await orderApi.sellerOrders();
      if (res && res.success) setOrders(res.orders);
      else toast.error(res.message || "Failed to fetch orders");
    } catch (err) {
      console.error("Error fetching seller orders:", err);
      toast.error("Server error while fetching orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // ---------------------
  // Update Seller Item Status
  // ---------------------
  const updateItemStatus = async (orderId, productId, status) => {
    try {
      const res = await orderApi.updateOrderItemStatus(orderId, {
        productId,
        status,
      });
      if (res && res.success) {
        const updatedOrders = orders.map((order) => {
          if (order._id !== orderId) return order;
          return {
            ...order,
            items: order.items.map((item) =>
              item.product._id === productId
                ? { ...item, sellerStatus: status }
                : item
            ),
          };
        });
        setOrders(updatedOrders);
        toast.success(res.message);
      } else toast.error(res.message || "Failed to update status");
    } catch (err) {
      console.error("Error updating seller item status:", err);
      toast.error("Server error while updating status");
    }
  };

  // ---------------------
  // Filtered Orders Logic
  // ---------------------
  const filteredOrders = orders.filter((order) =>
    statusFilter === "All"
      ? true
      : order.items.some((item) => {
          // Seller side filters (pending, processing, ready for shipped)
          if (
            ["Pending", "Processing", "ReadyForShipped"].includes(statusFilter)
          ) {
            return item.sellerStatus === statusFilter && order.status === null;
          }

          // Admin shipped filter
          if (statusFilter === "Shipped") {
            return (
              item.sellerStatus === "ReadyForShipped" &&
              order.status === "Shipped"
            );
          }

          // Admin delivered filter
          if (statusFilter === "Delivered") {
            return order.status === "Delivered";
          }

          return false;
        })
  );

  // ---------------------
  // Get Display Status (Seller/Admin combined)
  // ---------------------
  const getDisplayStatus = (item, order) => {
    // Admin has control
    if (order.status === "Shipped" || order.status === "Delivered") {
      return order.status;
    }
    // Else show seller status
    return item.sellerStatus;
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-xl text-gray-600">
        Loading orders...
      </div>
    );

  if (orders.length === 0)
    return (
      <div className="flex justify-center items-center h-screen text-xl text-gray-600">
        No orders for you yet.
      </div>
    );

  return (
    <div className="p-5 md:p-10 min-h-screen bg-gray-50">
      <h1 className="text-4xl font-bold text-orange-500 mb-6 text-center">
        Orders Received
      </h1>

      {/* FILTER */}
      <div className="flex gap-4 mb-6 justify-center">
        <label className="font-semibold">Filter Status:</label>
        <select
          className="border p-2 rounded"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option>All</option>
          <option>Pending</option>
          <option>Processing</option>
          <option>ReadyForShipped</option>
          <option>Shipped</option>
          <option>Delivered</option>
        </select>
      </div>

      <div className="space-y-6">
        {filteredOrders.map((order) => (
          <div
            key={order._id}
            className="bg-white shadow-md rounded-lg p-6 border border-gray-200"
          >
            {/* Order Header */}
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Order ID: {order._id.slice(-6).toUpperCase()}
              </h2>
              <p className="text-gray-600">
                Customer: <span className="font-medium">{order.user.name}</span>{" "}
                ({order.user.email})
              </p>
              <p className="text-gray-600">
                Address: {order.address.fullName}, {order.address.phone},{" "}
                {order.address.street}, {order.address.city},{" "}
                {order.address.country} - {order.address.postalCode}
              </p>
              <p className="text-gray-600">
                Payment:{" "}
                <span className="font-medium text-green-600">
                  {order.paymentStatus}
                </span>
              </p>
            </div>

            {/* Items */}
            <div className="border-t pt-3">
              <h3 className="text-lg font-semibold mb-2">Items</h3>
              {order.items.map((item) => (
                <div
                  key={item.product._id}
                  className="flex items-center gap-3 border-b py-3"
                >
                  <img
                    src={`${import.meta.env.VITE_IMAGE_URL}${
                      item.product.productimages?.[0] || "placeholder.jpg"
                    }`}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded border"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">
                      {item.product.name}
                    </p>
                    <p className="text-gray-500 text-sm">
                      Qty: {item.quantity}
                    </p>
                    <p className="text-gray-600 text-sm">
                      Status:{" "}
                      <span className="text-blue-600">
                        {getDisplayStatus(item, order)}
                      </span>
                    </p>
                  </div>
                  <p className="text-orange-500 font-semibold text-lg">
                    Rs {item.price}
                  </p>

                  {/* Action Buttons per Item */}
                  <div className="flex flex-col gap-1">
                    {item.sellerStatus === "Pending" && (
                      <button
                        onClick={() =>
                          updateItemStatus(
                            order._id,
                            item.product._id,
                            "Processing"
                          )
                        }
                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                      >
                        Mark as Processing
                      </button>
                    )}
                    {item.sellerStatus === "Processing" && (
                      <button
                        onClick={() =>
                          updateItemStatus(
                            order._id,
                            item.product._id,
                            "ReadyForShipped"
                          )
                        }
                        className="px-3 py-1 bg-purple-500 text-white rounded hover:bg-purple-600 text-sm"
                      >
                        Mark as Ready For Shipped
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Seller Total */}
            <div className="mt-4">
              <p className="font-semibold text-gray-800">
                Total Amount:{" "}
                <span className="text-orange-500">
                  Rs {order.items.reduce((sum, item) => sum + item.price, 0)}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SellerOrders;
