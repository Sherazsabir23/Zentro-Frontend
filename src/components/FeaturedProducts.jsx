import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import sellerauth from "../api/sellerauth";
import { Link } from "react-router-dom";

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const response = await sellerauth.featuredProducts();

      if (response && response.success) {
        setProducts(response.products);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return <p className="text-center py-10">Loading...</p>;
  }

  return (
    <section className="w-full bg-gray-100 pt-10 px-3 sm:px-5 md:px-20">
      <h1 className="font-montserrat font-semibold text-lg">
        Featured Products
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3  lg:grid-cols-4 xl:grid-cols-6 gap-2 mt-4">
        {products.length > 0 ? (
          products.map((item) => {
            // 🔹 STEP 1: Get original price
            const originalPrice = item.productprice;

            // 🔹 STEP 2: Get discount (from schema)
            const discount = item.productdiscount || 0;

            // 🔹 STEP 3: Calculate discounted price
           const discountedPrice = Math.round(
  originalPrice - (originalPrice * discount) / 100
);


            return (
              <div
                key={item._id}
                className="bg-white rounded-sm shadow-sm hover:shadow-md transition overflow-hidden relative"
              >
                {/* 🔥 DISCOUNT BADGE */}
                {discount > 0 && (
                  <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                    {discount}% OFF
                  </span>
                )}

                <img
                  src={`${import.meta.env.VITE_IMAGE_URL}${item.productimages?.[0]}`}
                  alt={item.productname}
                  className="w-full h-40 sm:h-52 object-cover"
                />

                <div className="p-2">
                  <h2 className="text-sm capitalize font-medium line-clamp-1">
                    {item.productname}
                  </h2>

                  {/* PRICE SECTION */}
                  <div className="mt-1 flex items-center space-x-1">
                    {discount > 0 ? (
                      <>
                       <p className="text-lg font-semibold text-black">
                          PKR {discountedPrice}
                        </p>
                        <p className="text-xs  text-gray-400 line-through">
                          PKR {originalPrice}
                        </p>
                       
                      </>
                    ) : (
                      <p className="text-lg font-semibold text-black">
                        PKR {originalPrice}
                      </p>
                    )}
                  </div>

                  <Link
                    to={`/product/${item._id}`}
                    className="block text-center underline text-orange-500 py-2 hover:bg-gray-100 rounded"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center col-span-full text-gray-500">
            No products found!
          </p>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;
