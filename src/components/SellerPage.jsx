import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import sellerauth from "../api/sellerauth";
import toast from "react-hot-toast";

const SellerPage = () => {
  const { id } = useParams();
  const [seller, setSeller] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSeller = async () => {
    try {
      const res = await sellerauth.getSellerPage(id);
      if (res.success) {
        setSeller(res.seller);
        setProducts(res.products || []);
      } else {
        toast.error(res.message || "Seller not found");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSeller();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading)
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
      </div>
    );

  if (!seller) return <p className="p-5">Seller not found</p>;

  return (
    <div className=" w-full  min-h-screen bg-gray-50">
      {/* Seller Info Section */}
      <section className="bg-gray-100 w-full max-w-5xl shadow-md mx-10 my-6 p-4 rounded-md flex items-center justify-evenly max-h-[100px] overflow-hidden">
        <div className="flex items-center gap-4">
          <img
            src={`${import.meta.env.VITE_IMAGE_URL}${seller.userId?.profileImage}`}
            alt={seller.shopName}
            className="w-20 h-20 rounded-full object-cover border-2 border-orange-500"
          />
          <div className="flex flex-col justify-center">
            <h1 className="text-xl font-bold truncate">{seller.shopName}</h1>
            {seller.user?.name && (
              <p className="text-gray-500 text-sm truncate">{seller.user.name}</p>
            )}
          </div>
        </div>

        {/* Additional Details neatly aligned to right */}
        <div className="flex  items-center gap-10 text-gray-600 text-sm  ">
          {seller.category && (
            <p>
              <span className="font-semibold">Category:</span> {seller.category}
            </p>
          )}
          {seller.contact && (
            <p>
              <span className="font-semibold">Contact:</span> {seller.contact}
            </p>
          )}
        </div>
      </section>

      {/* Seller Products Grid */}
      <section className=" w-full max-w-5xl p-10">
        <h2 className="text-2xl font-semibold mb-6">Products by {seller.shopName}</h2>

        {products.length === 0 ? (
          <p className="text-gray-500">No products found</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((item) => {
              const discount = item.productdiscount || 0;
              const discountedPrice = Math.round(
                item.productprice - (item.productprice * discount) / 100
              );
              const originalPrice = item.productprice;

              return (
                <div
                  key={item._id}
                  className="bg-white rounded-md shadow-sm hover:shadow-lg transition overflow-hidden group relative"
                >
                  {discount > 0 && (
                    <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded z-10">
                      {discount}% OFF
                    </span>
                  )}
                  <div className="overflow-hidden">
                    <img
                      src={`${import.meta.env.VITE_IMAGE_URL}${item.productimages?.[0]}`}
                      alt={item.productname}
                      className="w-full h-40 sm:h-52 object-cover transform group-hover:scale-105 transition duration-300"
                    />
                  </div>
                  <div className="p-3 flex flex-col gap-1">
                    <h3 className="text-sm font-semibold capitalize line-clamp-1">
                      {item.productname}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-lg font-bold text-black">PKR {discountedPrice}</p>
                      {discount > 0 && (
                        <p className="text-xs text-gray-400 line-through">{originalPrice}</p>
                      )}
                    </div>
                    <Link
                      to={`/product/${item._id}`}
                      className="mt-2 text-center   text-orange-500 underline py-1.5 rounded hover:bg-orange-300 transition text-sm"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};

export default SellerPage;