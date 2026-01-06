import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import sellerauth from "../api/sellerauth";
import cartApi from "../api/cartApi";

const ProductDetails = () => {
  const { id } = useParams(); // product id from route
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user); // Redux user
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [userRating, setUserRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [reviews, setReviews] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  console.log(relatedProducts);

  // Fetch product and reviews

  const fetchProduct = async () => {
    try {
      const res = await sellerauth.ProductDetails(id);
      if (res && res.success) {
        setProduct(res.product);
        setMainImage(res.product.productimages?.[0] || "");
        setReviews(res.product.reviews || []);
      } else {
        toast.error(res.data?.message || "Product not found");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  //track user
  const trackViewApi = async () => {
    try {
      const res = await sellerauth.trackViewApi(id);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  //related products sesction api
  const fetchRelatedProducts = async () => {
    try {
      const res = await sellerauth.relatedProducts(id);
      if (res && res.success) {
        setRelatedProducts(res.products);
      }
    } catch (err) {
      console.error(err);
    }
  };
  // Fetch product & related products on product id change
  useEffect(() => {
    fetchProduct();
    fetchRelatedProducts();
    window.scrollTo(0, 0);
  }, [id]);

  // Track view only when user exists
  useEffect(() => {
    if (user) trackViewApi();
  }, [user]);

  // Submit review (only POST to backend)
  const handleSubmitReview = async () => {
    if (!user || !user._id) {
      toast.error("You must be logged in to submit a review");
      navigate("/login");
      return;
    }

    if (!reviewText || userRating === 0) {
      toast.error("Please give a rating and write a review");
      return;
    }

    const reviewData = {
      userId: user._id,
      stars: userRating,
      comment: reviewText,
    };
    try {
      const response = await sellerauth.postReview(id, reviewData);

      if (response && response.success) {
        toast.success("Review submitted successfully!");
        setUserRating(0);
        setReviewText("");
        fetchProduct();
      } else {
        toast.error(response.message || "Failed to submit review");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  /*  handlecart function */
  const handleAddToCart = async (productId) => {
    const res = await cartApi.addToCartApi(productId);

    if (res.success) {
      navigate("/cart"); // redirect to cart page
    }
  };

  if (loading) return <p className="p-5">Loading...</p>;
  if (!product) return <p className="p-5">Product not found</p>;

  const discountedPrice =
    product.productprice -
    (product.productdiscount / 100) * product.productprice;

  return (
    <>
      {/* Existing Product Section */}{" "}
      <section className="flex flex-col w-full min-h-screen md:flex-row gap-6 p-7 md:p-20  bg-gray-100 border-b-2">
        {/* Left - Image Slider */}{" "}
        <div className="md:w-1/2">
          {" "}
          <div className="rounded-md bg-gray-500 ">
            <img
              src={`${import.meta.env.VITE_IMAGE_URL}${mainImage}`}
              alt={product.productname}
              className="w-full h-96  object-cover rounded-md"
            />{" "}
          </div>{" "}
          <div className="flex gap-2 mt-2 overflow-x-auto">
            {product.productimages.map((img, index) => (
              <img
                key={index}
                src={`${import.meta.env.VITE_IMAGE_URL}${img}`}
                alt={`thumb-${index}`}
                className={`w-20 h-20 object-cover rounded-md border cursor-pointer ${
                  mainImage === img ? "border-black" : "border-gray-300"
                }`}
                onClick={() => setMainImage(img)}
              />
            ))}{" "}
          </div>{" "}
        </div>
        {/* Right - Product Info */}
        <div className="md:w-1/2 pt-2 flex flex-col gap-4">
          <h1 className="text-3xl font-montserrat font-semibold capitalize">
            {product.productname}
          </h1>

          {/* ⭐ Average Rating Display */}
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`text-xl ${
                  product.averageRating >= star
                    ? "text-yellow-400"
                    : "text-gray-300"
                }`}
              >
                ★
              </span>
            ))}

            <span className="text-sm text-gray-600">
              ({product.averageRating?.toFixed(1) || "0.0"})
            </span>
          </div>

          <p className="text-gray-600 font-roboto text-md">
            {product.productdescription}
          </p>

          <div className="flex items-center gap-4">
            <p className="text-xl font-bold">PKR {discountedPrice}</p>
            {product.productdiscount > 0 && (
              <p className="text-gray-500 line-through">
                PKR {product.productprice}
              </p>
            )}
          </div>

          <p className="text-gray-500">
            Remaining Stock: {product.productstock}
          </p>
          <p className="text-gray-500 capitalize">
            Category: {product.productcategory}
          </p>

          <div className="flex gap-4 mt-4">
            <button className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-gray-900 transition">
              Buy Now
            </button>
            <button
              onClick={() => handleAddToCart(product._id)}
              className="bg-gray-200 text-black px-6 py-2 rounded-lg hover:bg-gray-300 transition"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </section>
      <section className="w-full md:p-20 p-5">
        <h1 className="text-2xl font-semibold mb-8">Related Products</h1>

        <div className="w-full grid sm:grid-cols-3 grid-cols-2 md:grid-cols-4 gap-4 ">
          {relatedProducts.length > 0 ? (
            relatedProducts.map((item) => {
              const discountedPrice = Math.round(
                item.productprice -
                  (item.productprice * item.productdiscount) / 100
              );

              return (
                <div
                  key={item._id}
                  className=" shadow-md transition text-start "
                >
                  <img
                    src={`${import.meta.env.VITE_IMAGE_URL}${
                      item.productimages?.[0]
                    }`}
                    alt={item.productname}
                    className="w-full h-52 object-cover rounded "
                  />

                  <h3 className="text-sm capitalize font-montserrat px-3 mt-1 font-semibold line-clamp-1">
                    {item.productname}
                  </h3>

                  <div className="flex justify-center gap-2  items-center">
                    <span className="text-black  font-semibold">
                      Rs {discountedPrice}
                    </span>

                    {item.productdiscount > 0 && (
                      <span className="text-sm line-through text-gray-500">
                        Rs {item.productprice}
                      </span>
                    )}
                  </div>
                  <Link
                    to={`/product/${item._id}`}
                    className="block text-center underline text-orange-500 py-2 hover:bg-gray-100 rounded"
                  >
                    View Details
                  </Link>
                </div>
              );
            })
          ) : (
            <p className="text-gray-500">No related products found</p>
          )}
        </div>
      </section>
      {/* Star Rating Section */}
      <section className="p-5 md:px-20 md:py-10 bg-white border-b-2">
        <h2 className="text-2xl font-semibold mb-4">Rate this Product</h2>
        <div className="flex items-center gap-2 mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`text-3xl cursor-pointer ${
                userRating >= star ? "text-yellow-400" : "text-gray-300"
              }`}
              onClick={() => setUserRating(star)}
            >
              ★
            </span>
          ))}
        </div>
        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="Write your review..."
          className="w-full p-3 border rounded-md mb-3 outline-none"
        ></textarea>
        <button
          onClick={handleSubmitReview}
          className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition"
        >
          Submit Review
        </button>
      </section>
      {/* Reviews Section */}
      <section className="p-5 md:p-20 w-full bg-gray-100">
        <h2 className="text-2xl font-semibold mb-4">Customer Reviews</h2>

        {reviews.map((rev) => (
          <div
            key={rev._id}
            className="mb-4 p-4 bg-white max-w-4xl rounded-md shadow-sm flex flex-col gap-2"
          >
            {/* Username */}
            <p className="font-semibold text-sm">
              {rev.user?.name || "Anonymous"}
            </p>

            {/* Comment + Rating */}
            <div className="flex justify-between items-start gap-4">
              <p className="text-gray-700 flex-1">{rev.comment}</p>

              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`text-lg ${
                      rev.rating >= star ? "text-yellow-400" : "text-gray-300"
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </section>
    </>
  );
};

export default ProductDetails;
