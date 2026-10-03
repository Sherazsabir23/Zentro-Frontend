import React, { useEffect, useState } from "react";
import adminauth from "../api/sellerauth";

const AdminPaymentHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      const res = await adminauth.getSellerPaymentHistory();
      if (res.success) setHistory(res.history);
      setLoading(false);
    };
    fetchHistory();
  }, []);

  if (loading) return <p className="p-6 text-center">Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-orange-500 text-center">
        Seller Payment History
      </h1>

      {history.length === 0 ? (
        <p className="text-center text-gray-500">No payment records found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full  border text-center ">
            <thead className="bg-orange-500 text-white">
              <tr>
                <th className="p-2">Order ID</th>
                <th className="p-2">Shop Name</th>
                <th className="p-2">Email</th>
                <th className="p-2">Payment Method</th>
                <th className="p-2">Account Holder</th>
                <th className="p-2">Account Number</th>
                <th className="p-2">Bank</th>
                <th className="p-2">Amount</th>
                <th className="p-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {history.map((item, i) => (
                <tr key={i} className="border-b hover:bg-gray-50 ">
                  <td className="p-2">{item.orderId}</td>
                  <td className="p-2">{item.shopName}</td>

                  <td className="p-2">{item?.email}</td>
                  <td className="p-2">{item.paymentMethod}</td>
                  <td className="p-2">{item.accountHolder}</td>
                  <td className="p-2">{item.accountNumber}</td>
                  <td className="p-2">{item.bankName}</td>
                  <td className="p-2">PKR {item.amount}</td>
                  <td className="p-2">
                    {new Date(item.paymentDate).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminPaymentHistory;
