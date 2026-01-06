import React, { useEffect, useState } from "react";
import orderApi from "../api/orderApi";
import { useNavigate } from "react-router-dom";

const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await orderApi.getUserOrdersApi();
        if (res.success) setOrders(res.orders);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const getDisplayStatus = (item, order) => {
    if (order.status === "Shipped" || order.status === "Delivered") {
      return order.status;
    }
    return item.sellerStatus;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-gray-200 text-gray-800";
      case "Processing":
        return "bg-blue-200 text-blue-800";
      case "ReadyForShipped":
        return "bg-purple-200 text-purple-800";
      case "Shipped":
        return "bg-teal-200 text-teal-800";
      case "Delivered":
        return "bg-green-200 text-green-800";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-lg text-gray-500">
        Loading orders...
      </div>
    );

  if (orders.length === 0)
    return (
      <div className="flex justify-center items-center h-screen text-xl text-gray-600">
        You have no orders yet.
      </div>
    );

  return (
    <div className="p-5 md:p-10 min-h-screen bg-gray-50">
      <h1 className="text-3xl md:text-4xl font-bold text-orange-500 mb-6 text-center">
        My Orders
      </h1>

      <div className="flex flex-col gap-4 items-center">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white rounded-xl shadow-md border border-gray-200 p-3 flex flex-col gap-2 w-full max-w-5xl"
          >
            {/* Order Header */}
            <div className="flex justify-between items-center">
              <h2 className="text-md font-semibold text-gray-800">
                Order: {order._id.slice(-6).toUpperCase()}
              </h2>
              <span className="text-sm text-gray-500">
                Total: <span className="font-semibold text-orange-500">Rs {order.totalAmount}</span>
              </span>
            </div>

            {/* Products - vertical */}
            <div className="flex flex-col gap-2 py-2 max-h-72 overflow-y-auto">
              {order.items.map((item) => {
                const status = getDisplayStatus(item, order);
                return (
                  <div
                    key={item._id}
                    onClick={() => navigate(`/product/${item.product._id}`)}
                    className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg border border-gray-200 shadow-sm cursor-pointer"
                  >
                    <img
                      src={`${import.meta.env.VITE_IMAGE_URL}${item.product.productimages?.[0] || "placeholder.jpg"}`}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1 flex flex-col gap-0.5">
                      <p className="font-medium text-gray-800 text-sm line-clamp-2">
                        {item.product.name}
                      </p>
                      <p className="text-gray-500 text-xs">Qty: {item.quantity}</p>
                      <p className="text-orange-500 font-semibold text-sm">Rs {item.price}</p>
                    </div>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getStatusColor(status)}`}
                    >
                      {status}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Address & Payment */}
            <div className="pt-1 border-t border-gray-200 flex flex-col gap-0.5 text-xs text-gray-500">
              <span>{order.address.fullName}, {order.address.phone}</span>
              <span>{order.address.street}, {order.address.city}, {order.address.country}</span>
              <span>Payment: {order.paymentStatus}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserOrders;
