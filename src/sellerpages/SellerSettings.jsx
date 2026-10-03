import React, { useState, useEffect } from "react";
import sellerauth from "../api/sellerauth";

const SellerSettings = () => {
  const [seller, setSeller] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    shopName: "",
    description: "",
    category: "",
    contact: "",
    paymentInfo: {
      method: "bank",
      accountHolder: "",
      accountNumber: "",
      bankName: "",
      cnic: "",
    },
  });

  // Fetch seller profile
  const fetchSellerProfile = async () => {
    try {
      const data = await sellerauth.getSellerProfile();
      if (data.success) {
        setSeller(data.seller);
        setFormData({
          shopName: data.seller.shopName || "",
          description: data.seller.description || "",
          category: data.seller.category || "",
          contact: data.seller.contact || "",
          paymentInfo: {
            method: data.seller.paymentInfo.method || "bank",
            accountHolder: data.seller.paymentInfo.accountHolder || "",
            accountNumber: data.seller.paymentInfo.accountNumber || "",
            bankName: data.seller.paymentInfo.bankName || "",
            cnic: data.seller.paymentInfo.cnic || "",
          },
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSellerProfile();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("paymentInfo.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        paymentInfo: { ...prev.paymentInfo, [key]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handle Edit / Save button click
  const handleEditSave = async (e) => {
    e.preventDefault();
    if (!isEditing) {
      // If currently not editing, enable inputs
      setIsEditing(true);
    } else {
      // Save changes
      setUpdating(true);
      try {
        const data = await sellerauth.updateSellerProfile(formData);
        if (data.success) {
          setSeller(data.seller);
          setFormData({
            shopName: data.seller.shopName || "",
            description: data.seller.description || "",
            category: data.seller.category || "",
            contact: data.seller.contact || "",
            paymentInfo: {
              method: data.seller.paymentInfo.method || "bank",
              accountHolder: data.seller.paymentInfo.accountHolder || "",
              accountNumber: data.seller.paymentInfo.accountNumber || "",
              bankName: data.seller.paymentInfo.bankName || "",
              cnic: data.seller.paymentInfo.cnic || "",
            },
          });
          setIsEditing(false);
          alert("Profile updated successfully!");
        } else {
          alert("Update failed");
        }
      } catch (err) {
        console.error(err);
        alert("Server error");
      } finally {
        setUpdating(false);
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!seller) return <div>Seller not found</div>;

  const inputClass = (editable) =>
    `p-2 w-full rounded ${
      editable ? "border border-gray-400 bg-white" : "border border-gray-200 bg-gray-100"
    }`;

  return (
    <div className=" w-full font-montserrat   mx-auto p-4 space-y-6">
      <h1 className="text-3xl text-center mt-5 md:text-left font-montserrat md:mt-0 font-bold">Shop Settings</h1>

      <div className="bg-white shadow p-4 rounded-md">
        <h2 className="text-2xl font-semibold mb-4">Shop Profile</h2>
        <form onSubmit={handleEditSave} className="space-y-4">
          <div>
            <label className="block font-medium">Shop Name</label>
            <input
              type="text"
              name="shopName"
              value={formData.shopName}
              onChange={handleChange}
              disabled={!isEditing}
              className={inputClass(isEditing)}
            />
          </div>

          <div>
            <label className="block font-medium">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              disabled={!isEditing}
              className={inputClass(isEditing)}
            />
          </div>

          <div>
            <label className="block font-medium">Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              disabled={!isEditing}
              className={inputClass(isEditing)}
            />
          </div>

          <div>
            <label className="block font-medium">Contact</label>
            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              disabled={!isEditing}
              className={inputClass(isEditing)}
            />
          </div>

          <div>
            <label className="block font-medium">Approval Status</label>
            <p>{seller.isShopApproved ? "Approved" : "Pending"}</p>
          </div>

          <h2 className="text-xl font-semibold mt-6 mb-4">Payment Settings</h2>

          <div>
            <label className="block font-medium">Payment Method</label>
            <select
              name="paymentInfo.method"
              value={formData.paymentInfo.method}
              onChange={handleChange}
              disabled={!isEditing}
              className={inputClass(isEditing)}
            >
              <option value="bank">Bank</option>
              <option value="jazzcash">JazzCash</option>
              <option value="easypaisa">EasyPaisa</option>
            </select>
          </div>

          <div>
            <label className="block font-medium">Account Holder</label>
            <input
              type="text"
              name="paymentInfo.accountHolder"
              value={formData.paymentInfo.accountHolder}
              onChange={handleChange}
              disabled={!isEditing}
              className={inputClass(isEditing)}
            />
          </div>

          <div>
            <label className="block font-medium">Account Number</label>
            <input
              type="text"
              name="paymentInfo.accountNumber"
              value={formData.paymentInfo.accountNumber}
              onChange={handleChange}
              disabled={!isEditing}
              className={inputClass(isEditing)}
            />
          </div>

          {formData.paymentInfo.method === "bank" && (
            <div>
              <label className="block font-medium">Bank Name</label>
              <input
                type="text"
                name="paymentInfo.bankName"
                value={formData.paymentInfo.bankName}
                onChange={handleChange}
                disabled={!isEditing}
                className={inputClass(isEditing)}
              />
            </div>
          )}

          <div>
            <label className="block font-medium">CNIC</label>
            <input
              type="text"
              name="paymentInfo.cnic"
              value={formData.paymentInfo.cnic}
              onChange={handleChange}
              disabled={!isEditing}
              className={inputClass(isEditing)}
            />
          </div>

          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded mt-4"
            disabled={updating}
          >
            {updating ? "Updating..." : isEditing ? "Save Changes" : "Edit Shop"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SellerSettings;
