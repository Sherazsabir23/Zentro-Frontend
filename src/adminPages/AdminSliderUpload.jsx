import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaTrashAlt, FaLink, FaImage } from "react-icons/fa"; // React Icons import kiya

const AdminSliderUpload = () => {
  const [imageFile, setImageFile] = useState(null);
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [sliders, setSliders] = useState([]);

  const fetchSliders = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/sliders`);
      const data = await res.json();
      if (Array.isArray(data)) {
        setSliders(data);
      }
    } catch (error) {
      console.log("Fetch error", error);
    }
  };

  useEffect(() => {
    fetchSliders();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageFile || !link) {
      toast.error("Please select image and add link");
      return;
    }

    const formData = new FormData();
    formData.append("image", imageFile);
    formData.append("link", link);

    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/sliders`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (res.ok) {
        toast.success("Slider uploaded successfully");
        setImageFile(null);
        setLink("");
        fetchSliders();
      } else {
        toast.error("Upload failed");
      }
    } catch (error) {
      toast.error("Upload failed");
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this slider?")) return;

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/sliders/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (res.ok) {
        toast.success("Slider deleted successfully");
        setSliders(sliders.filter((s) => s._id !== id));
      } else {
        toast.error("Failed to delete slider");
      }
    } catch (error) {
      toast.error("Error deleting slider");
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 p-4 md:p-8 bg-gray-50 min-h-screen">
      <Toaster position="top-right" />
      
      {/* --- Header --- */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Slider Management</h1>
        <p className="text-gray-500">Add or remove homepage banners</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* --- Left Column: Upload Form --- */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <FaImage className="text-orange-500" /> Add Slider
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="border-2 border-dashed border-gray-200 p-4 rounded-lg text-center hover:border-orange-400 transition cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files[0])}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
                />
              </div>

              <div className="relative">
                <FaLink className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Redirect Link (e.g. /shop)"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  className="w-full border p-2 pl-10 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="bg-orange-600 text-white py-2.5 rounded-lg font-bold hover:bg-orange-700 transition disabled:bg-gray-400"
              >
                {loading ? "Processing..." : "Upload Now"}
              </button>
            </form>
          </div>
        </div>

        {/* --- Right Column: Slider List --- */}
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold mb-4">Existing Sliders</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {sliders.map((slider) => (
                <div key={slider._id} className="group relative bg-gray-100 rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                  <img 
                    src={`${import.meta.env.VITE_IMAGE_URL}${slider.image}`} 
                    alt="Slider" 
                    className="w-full h-32 object-cover group-hover:scale-105 transition duration-300"
                  />
                  <div className="p-3 flex justify-between items-center bg-white">
                    <span className="text-xs font-medium text-gray-500 truncate max-w-[120px]">
                      {slider.link}
                    </span>
                    <button 
                      onClick={() => handleDelete(slider._id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-full transition"
                      title="Delete Slider"
                    >
                      <FaTrashAlt size={16} />
                    </button>
                  </div>
                </div>
              ))}
              {sliders.length === 0 && (
                <div className="col-span-full py-10 text-center text-gray-400 border-2 border-dotted rounded-xl">
                  No active banners found.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSliderUpload;