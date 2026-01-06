import React, { useEffect, useState } from "react";
import cartApi from "../api/cartApi";
import toast from "react-hot-toast";
import orderApi from "../api/orderApi";

import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading] = useState(false);
  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    street: "",
    city: "",
    country: "",
    postalCode: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    const res = await cartApi.getCartApi();
    setCart(res.cart);
  };

  const handleQtyChange = async (itemId, newQty) => {
    if (newQty < 1) return;
    await cartApi.updateQuantityApi(itemId, newQty);
    fetchCart();
  };

  const handleRemove = async (itemId) => {
    await cartApi.removeItemApi(itemId);
    fetchCart();
  };

  const handleClear = async () => {
    await cartApi.clearCartApi();
    fetchCart();
  };

  const handleCheckoutClick = () => {
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async () => {
    try {
      const orderPayload = {
        cartItems: cart.items,
        totalAmount: cart.finalPrice,
        address,
        paymentMethod,
      };

      const res = await orderApi.placeOrderApi(orderPayload);

      if (res.success) {
         toast.success("Order placed successfully!");
        handleClear();
        setShowModal(false);
        
      } else {
        toast.error("Failed to place order. Try again!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error. Try again later.");
    }
  };

  if (!cart) return <div className="p-10 text-center text-lg">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-5 md:p-10">
      <h1 className="text-3xl font-bold text-orange-500 mb-6">Your Cart</h1>

      {cart.items.length === 0 && (
        <div className="text-center mt-16">
          <h2 className="text-xl font-semibold text-gray-700">Your cart is empty</h2>
          <button
            onClick={() => navigate("/")}
            className="mt-5 px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
          >
            Continue Shopping
          </button>
        </div>
      )}

      {cart.items.map((item) => {
        const discountedPrice =
          item.product.productprice -
          (item.product.productprice * (item.product.productdiscount || 0)) / 100;
        return (
          <div key={item._id} className="bg-white shadow rounded-lg p-4 flex flex-col md:flex-row items-center gap-5">
            <img
              src={`${import.meta.env.VITE_IMAGE_URL}${item.product.productimages?.[0]}`}
              className="w-28 h-28 object-cover rounded-lg border"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-lg text-gray-800">{item.product.name}</h3>
              <p className="text-gray-600">
                <span className="line-through mr-2">Rs {item.product.productprice}</span>
                <span className="font-semibold text-orange-500">Rs {discountedPrice}</span>
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleQtyChange(item._id, item.quantity - 1)}
                className="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                -
              </button>
              <span className="font-semibold text-lg">{item.quantity}</span>
              <button
                onClick={() => handleQtyChange(item._id, item.quantity + 1)}
                className="px-3 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
              >
                +
              </button>
            </div>
            <button
              onClick={() => handleRemove(item._id)}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Remove
            </button>
          </div>
        );
      })}

      {cart.items.length > 0 && (
        <div className="mt-8 bg-white p-5 rounded-lg shadow-md max-w-md mx-auto">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Summary</h2>
          <div className="flex justify-between mb-2">
            <span>Subtotal:</span>
            <span>Rs {cart.totalPrice}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Shipping:</span>
            <span>Rs {cart.shipping}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Discount (Coupon):</span>
            <span>Rs {cart.discount}</span>
          </div>
          <div className="flex justify-between mt-3 pt-3 border-t font-bold text-lg text-orange-500">
            <span>Total:</span>
            <span>Rs {cart.finalPrice}</span>
          </div>
          <div className="mt-5 flex justify-end gap-4">
            <button
              onClick={handleCheckoutClick}
              className="px-6 py-3 bg-orange-500 text-black rounded-lg hover:bg-orange-700 hover:text-white transition-all shadow-lg"
            >
              CheckOut
            </button>
            <button
              onClick={handleClear}
              className="px-6 py-3 bg-white text-black rounded-lg hover:bg-red-700 hover:text-white transition-all shadow-lg"
            >
              Clear Cart
            </button>
          </div>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg relative">
            <h2 className="text-xl font-semibold mb-4">Enter Address & Payment</h2>

            {/* Close Button */}
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 font-bold"
              onClick={() => setShowModal(false)}
            >
              X
            </button>

            {/* Address Fields */}
            <div className="space-y-2">
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={address.fullName}
                onChange={handleInputChange}
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={address.phone}
                onChange={handleInputChange}
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                name="street"
                placeholder="Street"
                value={address.street}
                onChange={handleInputChange}
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                name="city"
                placeholder="City"
                value={address.city}
                onChange={handleInputChange}
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                name="country"
                placeholder="Country"
                value={address.country}
                onChange={handleInputChange}
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                name="postalCode"
                placeholder="Postal Code"
                value={address.postalCode}
                onChange={handleInputChange}
                className="w-full border p-2 rounded"
              />
            </div>

            {/* Payment Method */}
            <div className="mt-4">
              <label className="font-semibold mr-3">Payment Method:</label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="border p-2 rounded"
              >
                <option value="COD">Cash on Delivery</option>
                <option value="JazzCash">JazzCash</option>
                <option value="EasyPaisa">EasyPaisa</option>
                <option value="CARD">Credit/Debit Card</option>
              </select>
            </div>

            <button
              onClick={handlePlaceOrder}
              className="mt-6 w-full bg-orange-500 text-white py-3 rounded hover:bg-orange-600 transition"
            >
              Place Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
