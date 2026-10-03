import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import adminauth from "../api/adminauth";
import { Link } from "react-router-dom";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    setLoading(true);
    const data = await adminauth.unApprovedProducts();
    if (data.success) setProducts(data.products);
    else toast.error(data.message || "Failed to fetch products");
    setLoading(false);
  };

  const handleApprove = async (id) => {
    const data = await adminauth.approveProduct(id);
    if (data.success) {
      toast.success("Product approved");
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } else toast.error(data.message || "Failed to approve");
  };

  const handleReject = async (id) => {
    const data = await adminauth.rejectProduct(id);
    if (data.success) {
      toast.success("Product rejected");
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } else toast.error(data.message || "Failed to reject");
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading)
    return (
      <div className="text-center mt-10 text-orange-500 text-xl font-semibold">
        Loading Products...
      </div>
    );

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-orange-500 text-center mb-6">
        Product Approval Requests
      </h1>

      <div className="bg-white shadow-md rounded-lg overflow-x-auto">
        <table className="min-w-full text-left">
          <thead className="bg-orange-500 text-white">
            <tr>
              <th className="px-6 py-3">Product</th>

              <th className="px-6 py-3">Price</th>
              <th className="px-6 py-3">Discount</th>
              <th className="px-6 py-3">Final Price</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  No pending products
                </td>
              </tr>
            ) : (
              products.map((product) => {
                const finalPrice = Number(
                  (
                    product.productprice -
                    (product.productprice * product.productdiscount) / 100
                  ).toFixed(2)
                );

                return (
                  <tr key={product._id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-3">
                      <div className="line-clamp-1 max-w-[350px]">
                        {product._id}
                      </div>
                    </td>

                    <td className="px-6 py-3">Rs {product.productprice}</td>
                    <td className="px-6 py-3">{product.productdiscount}%</td>
                    <td className="px-6 py-3 font-semibold text-green-600">
                      Rs {finalPrice}
                    </td>
                    <td className="px-6 py-3 space-x-2">
                      <button
                        onClick={() => handleApprove(product._id)}
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(product._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                      >
                        Reject
                      </button>
                      <Link
                        to={`/product/${product._id}`}
                        className="text-white bg-orange-500 hover:bg-orange-600 underline px-3 py-1 rounded "
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Product;
