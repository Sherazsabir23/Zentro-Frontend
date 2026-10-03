import React, { useEffect, useState } from "react";
import sellerauth from "../api/sellerauth";

const SellerEarnings = () => {
  const [summary, setSummary] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log("summery:", summary);
  console.log("history:", history);


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const summaryRes = await sellerauth.getSellerEarnings();
      if (summaryRes.success) setSummary(summaryRes);

      const historyRes = await sellerauth.getSellerPaymentHistory();
      if (historyRes.success) {
        console.log("Fetched Seller History:", historyRes.history); 
        setHistory(historyRes.history);
      }
    } catch (err) {
      console.error("Error fetching seller data:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="p-6 text-center text-lg">Loading...</p>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">My Earnings</h1>

      {/* SUMMARY BOXES */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-yellow-100 p-4 rounded">
          <p className="text-sm">Pending Amount</p>
          <h2 className="text-xl font-bold">PKR {summary?.pendingAmount || 0}</h2>
        </div>
        <div className="bg-blue-100 p-4 rounded">
          <p className="text-sm">Available Balance</p>
          <h2 className="text-xl font-bold">PKR {summary?.availableAmount || 0}</h2>
        </div>
        <div className="bg-green-100 p-4 rounded">
          <p className="text-sm">Total Paid</p>
          <h2 className="text-xl font-bold">PKR {summary?.totalPaidAmount || 0}</h2>
        </div>
      </div>

      {/* PAYMENT HISTORY */}
      <div className="bg-white shadow rounded p-4 mt-6">
        <h2 className="text-lg font-semibold mb-4">Payment History</h2>

        {history.length === 0 ? (
          <p className="text-gray-500">No payments yet</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border">
              <thead>
                <tr className="border-b">
                  <th className="p-2">Order ID</th>
                  <th className="p-2">Amount</th>
                  <th className="p-2">Date</th>
                </tr>
              </thead>
              <tbody>
                {history.map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-2">{item.orderId}</td>
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
    </div>
  );
};

export default SellerEarnings;
