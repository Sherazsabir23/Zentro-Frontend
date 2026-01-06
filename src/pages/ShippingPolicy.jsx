import React from "react";
import { FaTruck, FaMoneyBillWave, FaMapMarkerAlt } from "react-icons/fa";

const ShippingPolicy = () => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="h-screen bg-gradient-to-b from-orange-400 to-orange-200 flex flex-col justify-center items-center text-white p-6 ">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Shipping Policy</h1>
        <p className="text-lg md:text-2xl max-w-2xl text-center">
          Admin handles shipping for all orders. Sellers deliver products to admin and admin ships to customers.
        </p>
      </section>

      {/* How Shipping Works */}
      <section className="min-h-[70vh] bg-gray-50 flex flex-col md:flex-row items-center justify-around p-10 gap-10">
        <div className="flex flex-col items-center text-center max-w-sm bg-white p-6 rounded-xl shadow-lg hover:scale-105 transition-transform">
          <FaTruck className="text-orange-500 text-6xl mb-4" />
          <h2 className="text-xl font-semibold mb-2">Step 1: Seller Delivery</h2>
          <p>Sellers provide the product to admin for shipping. Admin takes responsibility for delivery.</p>
        </div>

        <div className="flex flex-col items-center text-center max-w-sm bg-white p-6 rounded-xl shadow-lg hover:scale-105 transition-transform">
          <FaMoneyBillWave className="text-orange-500 text-6xl mb-4" />
          <h2 className="text-xl font-semibold mb-2">Step 2: Shipping Fee</h2>
          <p>A standard shipping fee of <span className="font-bold">PKR 200</span> is charged per order.</p>
        </div>

        <div className="flex flex-col items-center text-center max-w-sm bg-white p-6 rounded-xl shadow-lg hover:scale-105 transition-transform">
          <FaMapMarkerAlt className="text-orange-500 text-6xl mb-4" />
          <h2 className="text-xl font-semibold mb-2">Step 3: Tracking</h2>
          <p>Customers can track their orders in 'My Orders' section. Cancelation allowed only before shipping.</p>
        </div>
      </section>

      {/* Optional Tips / Notes */}
      <section className="min-h-[30vh] bg-orange-50 flex flex-col justify-center items-center p-10 text-center space-y-4">
        <h2 className="text-2xl md:text-3xl font-bold">Important Notes</h2>
        <p className="max-w-2xl text-gray-700">
          Once the order is shipped, cancellation is not allowed. 
        </p>
      </section>
    </div>
  );
};

export default ShippingPolicy;
