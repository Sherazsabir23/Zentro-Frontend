import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import auth from "../api/auth";
import toast from "react-hot-toast";

const MyAccount = () => {
  const user = useSelector((state) => state.user.user);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const id = user?._id;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    profileImage: null,
  });

  // Initialize form data from Redux user
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        address: user.address || "",
        phone: user.phone || "",
        profileImage: null,
      });
        setImagePreview(
      user.profileImage
        ? `${import.meta.env.VITE_IMAGE_URL}${user.profileImage}`
        : ""
    );
    }
  }, [user]);

  // Handle input text changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image selection and preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, profileImage: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // If not editing, switch to edit mode
    if (!isEditing) {
      setIsEditing(true);
      return;
    }

    setIsLoading(true);
    try {
      // Prepare FormData for multipart upload
      const form = new FormData();
      form.append("name", formData.name);
      form.append("email", formData.email);
      form.append("address", formData.address);
      form.append("phone", formData.phone);
      if (formData.profileImage) {
        form.append("profileImage", formData.profileImage);
      }

      const response = await auth.userProfile(form, id);

      if (response && response.success) {
        toast.success("Profile updated successfully!");
        setIsEditing(false);
          const imageUrl = response?.updatedUser?.profileImage
    ? `${import.meta.env.VITE_IMAGE_URL}${response.updatedUser.profileImage}`
    : imagePreview;
  setImagePreview(imageUrl);
      } else {
        toast.error(response?.message || "Failed to update profile.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("An error occurred while updating your profile.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full px-5 py-10 flex justify-center items-center bg-gray-50">
      <div className="max-w-md w-full bg-white shadow-md rounded-xl p-6">
        <div className="flex flex-col items-center">
          {/* Profile Image */}
          <div className="relative">
            <img
              src={
                imagePreview
                  ? imagePreview
                  : "https://picsum.photos/150?random=1"
              }
              alt="Profile"
              className="w-32 h-32 rounded-full border-2 border-orange-500 object-cover object-center"
            />
            {isEditing && (
              <label className="absolute bottom-0 right-0 bg-orange-500 text-white rounded-full p-2 cursor-pointer hover:bg-orange-600 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                  disabled={isLoading}
                />
                📷
              </label>
            )}
          </div>

          {/* Title */}
          <h3 className="font-montserrat font-medium text-black text-center text-lg mt-4">
            My Account
          </h3>
          <p className="font-montserrat text-gray-500 text-sm font-medium text-center">
            Manage your account information
          </p>
        </div>

        {/* Form */}
        <form
          className="w-full space-y-4 mt-6"
          onSubmit={handleSubmit}
          aria-label="User profile form"
        >
          <input
            name="name"
            placeholder="Enter your full name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            disabled={!isEditing || isLoading}
            className={`w-full p-3 rounded-md border ${
              isEditing
                ? "border-orange-400 bg-gray-50"
                : "border-gray-200 bg-gray-100"
            } outline-none focus:ring-2 focus:ring-orange-400 transition-all ${
              !isEditing || isLoading ? "cursor-not-allowed" : ""
            }`}
          />

          <input
            name="email"
            placeholder="Enter your email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            disabled={!isEditing || isLoading}
            className={`w-full p-3 rounded-md border ${
              isEditing
                ? "border-orange-400 bg-gray-50"
                : "border-gray-200 bg-gray-100"
            } outline-none focus:ring-2 focus:ring-orange-400 transition-all ${
              !isEditing || isLoading ? "cursor-not-allowed" : ""
            }`}
          />

          <input
            name="address"
            placeholder="Enter your address"
            type="text"
            value={formData.address}
            onChange={handleChange}
            disabled={!isEditing || isLoading}
            className={`w-full p-3 rounded-md border ${
              isEditing
                ? "border-orange-400 bg-gray-50"
                : "border-gray-200 bg-gray-100"
            } outline-none focus:ring-2 focus:ring-orange-400 transition-all ${
              !isEditing || isLoading ? "cursor-not-allowed" : ""
            }`}
          />

          <input
            name="phone"
            placeholder="Enter your phone number"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            disabled={!isEditing || isLoading}
            className={`w-full p-3 rounded-md border ${
              isEditing
                ? "border-orange-400 bg-gray-50"
                : "border-gray-200 bg-gray-100"
            } outline-none focus:ring-2 focus:ring-orange-400 transition-all ${
              !isEditing || isLoading ? "cursor-not-allowed" : ""
            }`}
          />

          <div className="w-full text-right">
            <button
              type="submit"
              disabled={isLoading}
              className={`bg-orange-500 text-white px-6 py-3 rounded-full font-semibold font-montserrat hover:bg-orange-600 transition-all ${
                isLoading ? "opacity-60 cursor-not-allowed" : ""
              }`}
            >
              {isLoading
                ? "Saving..."
                : isEditing
                ? "Save Changes"
                : "Edit Profile"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MyAccount;
