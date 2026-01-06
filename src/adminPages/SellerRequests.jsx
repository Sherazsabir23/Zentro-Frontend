import React, { useEffect, useState } from "react";
import sellerauth from "../api/sellerauth";
import toast from "react-hot-toast";

const SellerRequests = () => {
  const [sellerRequests, setSellerRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedRequest, setSelectedRequest] = useState(null); // For modal
  const [showModal, setShowModal] = useState(false);

  /* Fetch all seller requests */
  const fetchSellerRequests = async () => {
    try {
      const response = await sellerauth.allsellerRequests();
      if (response && response.success) {
        setSellerRequests(response.allRequests);
      } else {
        toast.error("Something went wrong");
      }
    } catch (err) {
      console.log("Backend error:", err);
      toast.error("Internal Server Error in fetchSellerRequests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSellerRequests();
  }, []);

  /* Handle seller approval */
  const handleApproved = async (id) => {
    try {
      const response = await sellerauth.handleApproved(id);
      if (response && response.success) {
        toast.success("Approval successful");
        setSellerRequests(prev => prev.filter(req => req._id !== id));
      } else {
        toast.error(response?.message || "Something went wrong");
      }
    } catch (err) {
      toast.error("Internal server error on approval");
      console.log("Approval error:", err);
    }
  };

  /* Handle seller rejection */
  const handleReject = async (id) => {
    try {
      const response = await sellerauth.handleReject(id);
      if (response && response.success) {
        toast.success("Request rejected");
        setSellerRequests(prev => prev.filter(req => req._id !== id));
      } else {
        toast.error(response?.message || "Something went wrong");
      }
    } catch (err) {
      toast.error("Internal server error on reject");
      console.log("Reject error:", err);
    }
  };

  /* Open modal with seller details */
  const handleViewDetails = (request) => {
    setSelectedRequest(request);
    setShowModal(true);
  };

  if (loading) return <div className="text-orange-500 text-xl font-semibold text-center mt-8">Loading Seller Requests...</div>;

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-orange-500 mb-6 text-center">Seller Requests</h1>

      <div className="bg-white shadow-md rounded-lg overflow-x-auto">
        <table className="min-w-full text-left">
          <thead className="bg-orange-500 text-white">
            <tr>
              <th className="px-6 py-3">Shop Name</th>
              <th className="px-6 py-3">User ID</th>
              <th className="px-6 py-3">Shop Category</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sellerRequests.length === 0 ? (
              <tr>
                <td colSpan="4" className="px-6 py-3 text-center text-gray-500">
                  No seller requests found.
                </td>
              </tr>
            ) : (
              sellerRequests.map(request => (
                <tr key={request._id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-3">{request.shopName}</td>
                  <td className="px-6 py-3">{request.userId}</td>
                  <td className="px-6 py-3">{request.category}</td>
                  <td className="px-6 py-3 space-x-2">
                    <button
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                      onClick={() => handleViewDetails(request)}
                    >
                      View
                    </button>
                    <button
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                      onClick={() => handleApproved(request._id)}
                    >
                      Approve
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                      onClick={() => handleReject(request._id)}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg w-96 p-6 relative shadow-lg">
            <h2 className="text-2xl font-bold text-orange-500 mb-4">Seller Details</h2>
            <p><strong>Shop Name:</strong> {selectedRequest.shopName}</p>
            <p><strong>User ID:</strong> {selectedRequest.userId}</p>
            <p><strong>Description:</strong> {selectedRequest.description}</p>
            <p><strong>Category:</strong> {selectedRequest.category}</p>
            <p><strong>Contact:</strong> {selectedRequest.contact}</p>
            <p><strong>Approval Status:</strong> {selectedRequest.isShopApproved ? "Approved" : "Pending"}</p>
            <p className="mt-2 font-semibold">Payment Info:</p>
            <p><strong>Method:</strong> {selectedRequest.paymentInfo?.method}</p>
            <p><strong>Account Holder:</strong> {selectedRequest.paymentInfo?.accountHolder}</p>
            <p><strong>Account Number:</strong> {selectedRequest.paymentInfo?.accountNumber}</p>
            <p><strong>Bank Name:</strong> {selectedRequest.paymentInfo?.bankName}</p>
            <p><strong>CNIC:</strong> {selectedRequest.paymentInfo?.cnic}</p>
            <p><strong>Created At:</strong> {new Date(selectedRequest.createdAt).toLocaleDateString()}</p>

            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-white bg-red-500 px-2 py-1 rounded hover:bg-red-600"
            >
              X
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerRequests;
