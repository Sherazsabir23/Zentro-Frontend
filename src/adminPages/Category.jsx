import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import adminauth from "../api/adminauth";

const Category = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  // LOAD categories
  const loadCategories = async () => {
    const res = await adminauth.getCategories();
    if (res && res.success) setCategories(res.categories);
  };

  useEffect(() => {
    loadCategories();
  }, []);

  // Delete category
  const deletecategory = async (id) => {
    try {
      const response = await adminauth.deleteCategory(id);
      if (response && response.success) {
        toast.success("Category deleted successfully");
        loadCategories();
      } else {
        toast.error("Failed to delete category");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete category");
    }
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!name.trim()) return toast.error("Category name required");

    setLoading(true);
    try {
      const response = await adminauth.addCategory(name);
      if (response && response.success) {
        toast.success("Category added successfully");
        setName("");
        loadCategories();
      } else {
        toast.error("Failed to add category");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to add category");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex items-start justify-center p-10 bg-gray-50">
      <div className="bg-white shadow-2xl p-8 rounded-2xl w-[700px]">
        <h2 className="text-3xl font-bold mb-6 text-center text-orange-500">
          Manage Categories
        </h2>

        {/* Add Category Form */}
        <form onSubmit={handleAddCategory} className="mb-8">
          <input
            type="text"
            placeholder="Enter Category Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition disabled:opacity-50 font-semibold"
          >
            {loading ? "Adding..." : "Add Category"}
          </button>
        </form>

        {/* Category List */}
        <h3 className="text-xl font-semibold mb-3 text-gray-700">All Categories</h3>
        <div className="max-h-[300px] overflow-y-auto space-y-2 p-2 rounded-lg border border-gray-200 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          {categories.length > 0 ? (
            categories.map((cat) => (
              <div
                key={cat._id}
                className="bg-gray-100 hover:bg-gray-200 transition px-4 py-2 rounded-lg flex justify-between items-center capitalize shadow-sm"
              >
                <span className="text-gray-800 font-medium">{cat.name}</span>
                <button
                  className="text-red-500 font-semibold hover:text-red-600 transition"
                  onClick={() => deletecategory(cat._id)}
                >
                  Delete
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center py-4">No Category Found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Category;
