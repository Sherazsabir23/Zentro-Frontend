import React from "react";

const AddEditModal = ({
  mode,
  loading,
  close,
  save,
  productname,
  setproductname,
  productprice,
  setproductprice,
  productstock,
  setproductstock,
  productdiscount,
  setproductdiscount,
  productdescription,
  setproductdescription,
  productcategory,
  setproductcategory,
  productimage,
  setproductimage,
  categories,
  oldImages = [],
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white w-full max-w-lg rounded-xl shadow-2xl p-6 overflow-y-auto max-h-[90vh]">

        {/* Header */}
        <h2 className="text-2xl font-bold mb-5 text-orange-500">
          {mode === "add" ? "Add New Product" : "Edit Product"}
        </h2>

        <form onSubmit={save} className="space-y-4">
          {/* PRODUCT NAME */}
          <div>
            <label className="block font-medium mb-1">Product Name</label>
            <input
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
              type="text"
              value={productname}
              onChange={(e) => setproductname(e.target.value)}
              required
            />
          </div>

          {/* PRICE */}
          <div>
            <label className="block font-medium mb-1">Price</label>
            <input
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
              type="number"
              value={productprice}
              onChange={(e) => setproductprice(e.target.value)}
              required
            />
          </div>

          {/* STOCK */}
          <div>
            <label className="block font-medium mb-1">Stock</label>
            <input
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
              type="number"
              value={productstock}
              onChange={(e) => setproductstock(e.target.value)}
              required
            />
          </div>

          {/* DISCOUNT */}
          <div>
            <label className="block font-medium mb-1">Discount (optional)</label>
            <input
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
              type="number"
              value={productdiscount}
              onChange={(e) => setproductdiscount(e.target.value)}
            />
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="block font-medium mb-1">Description</label>
            <textarea
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
              rows="4"
              value={productdescription}
              onChange={(e) => setproductdescription(e.target.value)}
              required
            />
          </div>

          {/* CATEGORY */}
          <div>
            <label className="block font-medium mb-1">Category</label>
            <select
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
              value={productcategory}
              onChange={(e) => setproductcategory(e.target.value)}
              required
            >
              <option value="">Select Category</option>
              {categories.map((c) => (
                <option key={c._id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* IMAGES */}
          <div>
            <label className="block font-medium mb-1">Product Images</label>
            <input
              className="w-full p-2 border border-gray-300 rounded-lg"
              type="file"
              multiple
              onChange={(e) => setproductimage(e.target.files)}
              accept="image/*"
            />
          </div>

          {/* OLD IMAGES PREVIEW */}
          {mode === "edit" && oldImages.length > 0 && (
            <div className="mt-3">
              <p className="font-medium mb-2">Old Images:</p>
              <div className="grid grid-cols-3 gap-2">
                {oldImages.map((img, i) => (
                  <img
                    key={i}
                    src={`${import.meta.env.VITE_IMAGE_URL}${img}`}
                    className="w-full h-24 object-cover rounded-lg border"
                  />
                ))}
              </div>
            </div>
          )}

          {/* BUTTONS */}
          <div className="flex justify-end gap-3 mt-5">
            <button
              type="button"
              onClick={close}
              className="px-5 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg font-medium transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition"
            >
              {loading
                ? "Saving..."
                : mode === "add"
                ? "Add Product"
                : "Update Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditModal;
