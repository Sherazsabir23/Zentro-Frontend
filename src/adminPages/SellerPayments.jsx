import React, { useEffect, useState } from "react";
import adminauth from "../api/adminauth";

const SellerPayments = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    setLoading(true);
    try {
      const res = await adminauth.getSellerPayments();
      if (res.success) setList(res.sellers);
    } catch (err) {
      console.error("Error fetching seller payments:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsPaid = async (sellerId) => {
    try {
      await adminauth.markSellerPaymentAsPaid(sellerId);
      alert("Payment marked as Paid!");
      getData(); // refetch data
    } catch (err) {
      console.error("Error marking as paid:", err);
      alert("Failed to mark payment as Paid");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (loading) return <p className="p-6 text-center text-lg">Loading...</p>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-orange-500 text-center">
        Seller Payments Summary
      </h1>

      <div className="flex flex-wrap gap-6 justify-center">
        {list.map((seller) => (
          <div
            key={seller.sellerId}
            className="flex flex-col md:flex-row bg-white shadow-lg rounded-xl overflow-hidden w-full max-w-5xl hover:shadow-xl transition-shadow  "
          >
            {/* Left Section: Seller Info */}
            <div className="flex-1 p-6 md:border-r md:border-gray-200">
              <h2 className="text-2xl font-semibold mb-2">{seller.shopName}</h2>
              <p className="text-gray-600 mb-1">
                <span className="font-medium">Shop Owner:</span> {seller.ownerName}
              </p>
              <p className="text-gray-600 mb-4">
                <span className="font-medium">Email:</span> {seller.email}
              </p>

              <h3 className="text-lg font-semibold mb-2 text-gray-700">
                Payment Details
              </h3>
              <p className="text-gray-600 mb-1">
                <span className="font-medium">Method:</span> {seller.paymentMethod}
              </p>
              <p className="text-gray-600 mb-1">
                <span className="font-medium">Holder:</span> {seller.accountHolder}
              </p>
              <p className="text-gray-600 mb-1">
                <span className="font-medium">Account:</span> {seller.accountNumber}
              </p>
              {seller.bankName && (
                <p className="text-gray-600">
                  <span className="font-medium">Bank:</span> {seller.bankName}
                </p>
              )}
            </div>

            {/* Right Section: Earnings + Button */}
            <div className="flex-1 p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-700">Earnings</h3>
                <p className="text-gray-600 mb-1">
                  <span className="font-medium">Total Orders:</span> {seller.ordersCount}
                </p>
                <p className="text-gray-600 mb-1">
                  <span className="font-medium">Total Amount:</span> PKR {seller.totalAmount}
                </p>
                <p className="text-gray-600 mb-1">
                  <span className="font-medium">Platform Fee:</span> PKR {seller.totalPlatformFee}
                </p>
                <p className="font-bold text-green-600 text-lg">
                  Seller Earning: PKR {seller.sellerEarning}
                </p>
              </div>

              <div className="mt-4 md:mt-6 flex justify-center md:justify-end">
                <button
                  onClick={() => handleMarkAsPaid(seller.sellerId)}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition transform hover:-translate-y-1"
                >
                  Mark as Paid
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SellerPayments;
