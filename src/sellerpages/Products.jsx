import React, { useState, useEffect } from "react";
import sellerauth from "../api/sellerauth";
import adminauth from "../api/adminauth";
import toast from "react-hot-toast";
import AddEditModal from "../components/AddEditModal";
import { Link } from "react-router-dom";

const Products = () => {
  // ---------------- ADD PRODUCT STATES ----------------
  const [ismodalopen, setismodalopen] = useState(false);
  const [productname, setproductname] = useState("");
  const [productprice, setproductprice] = useState("");
  const [productstock, setproductstock] = useState("");
  const [productdescription, setproductdescription] = useState("");
  const [productcategory, setproductcategory] = useState("");
  const [productimage, setproductimage] = useState([]);
  const [productdiscount, setproductdiscount] = useState("");
  const [loading, setloading] = useState(false);
  const [categories, setcategories] = useState([]);

  // -------------- SELLER PRODUCTS LIST ----------------
  const [myProducts, setMyProducts] = useState([]);

  // -------------- EDIT MODAL STATES ----------------
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [oldImages, setOldImages] = useState([]);

  // OPEN ADD PRODUCT MODAL
  const handlenewProduct = () => {
    // Reset all form fields
    setproductname("");
    setproductprice("");
    setproductstock("");
    setproductdiscount("");
    setproductdescription("");
    setproductcategory("");
    setproductimage([]);
    setOldImages([]); // optional, if you use oldImages in modal

    // Open modal
    setismodalopen(true);
  };

  // ----------------- SAVE NEW PRODUCT -----------------
  const handleSaveProduct = async (e) => {
    e.preventDefault();
    setloading(true);

    const newProduct = {
      productname,
      productprice,
      productstock,
      productdescription,
      productcategory,
      productimage,
      productdiscount,
    };

    try {
      const response = await sellerauth.handleproductform(newProduct);
      if (response && response.success) {
        toast.success("Product added successfully!");
        fetchMyProducts();
      } else {
        toast.error("Error while adding product.");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setloading(false);
      setismodalopen(false);
    }
  };

  // ---------------- GET CATEGORIES ----------------
  const getCategories = async () => {
    try {
      const response = await adminauth.allCategories();
      if (response.success) {
        setcategories(response.categories);
      }
    } catch (err) {
      toast.error("Error fetching categories");
    }
  };

  // ---------------- GET SELLER PRODUCTS ----------------
  const fetchMyProducts = async () => {
    try {
      const res = await sellerauth.getSellerProducts();
      if (res.success) {
        setMyProducts(res.products);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // ---------------- DELETE PRODUCT ----------------
  const handleDelete = async (id) => {
    if (!confirm("Are you sure to delete this product?")) return;

    const res = await sellerauth.deleteSellerProduct(id);

    if (res.success) {
      toast.success("Product deleted!");
      fetchMyProducts();
    } else {
      toast.error("Something went wrong!");
    }
  };

  // ---------------- OPEN EDIT MODAL ----------------
  const openEditModal = (item) => {
    setEditId(item._id);
    setproductname(item.productname);
    setproductprice(item.productprice);
    setproductstock(item.productstock);
    setproductdiscount(item.productdiscount);
    setproductdescription(item.productdescription);
    setproductcategory(item.productcategory);
    setOldImages(item.productimages); // show old images
    setproductimage([]); // reset new images
    setIsEditModalOpen(true);
  };

  // ---------------- SUBMIT EDIT PRODUCT ----------------
  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    setloading(true);

    const formData = new FormData();
    formData.append("productname", productname);
    formData.append("productprice", productprice);
    formData.append("productstock", productstock);
    formData.append("productdiscount", productdiscount ? productdiscount : 0);

    formData.append("productdescription", productdescription);
    formData.append("productcategory", productcategory);

    // new images
    for (let i = 0; i < productimage.length; i++) {
      formData.append("productimage", productimage[i]);
    }

    try {
      const res = await sellerauth.updateSellerProduct(editId, formData);

      if (res.success) {
        toast.success("Product updated!");
        fetchMyProducts();
        setIsEditModalOpen(false);
      } else {
        toast.error("Update failed");
      }
    } catch (err) {
      console.log(err);
    }

    setloading(false);
  };

  useEffect(() => {
    getCategories();
    fetchMyProducts();
  }, []);

  const chunkProducts = (products, size = 4) => {
    const chunks = [];
    for (let i = 0; i < products.length; i += size) {
      chunks.push(products.slice(i, i + size));
    }
    return chunks;
  };

  const productSlides = chunkProducts(myProducts, 4);

  return (
    <div>
      <h1 className="text-center font-montserrat font-semibold text-2xl">
        My Products
      </h1>

      {/* TOP SEARCH + ADD BUTTON */}
      <div className="m-auto text-center mt-4 w-full text-lg font-roboto flex flex-col md:flex-row justify-center items-center">
        <input
          className="w-full p-3 mr-2 outline-none border border-gray-300 rounded-md"
          type="text"
          placeholder="Search your Products"
        />

        <button
          onClick={handlenewProduct}
          className="whitespace-nowrap p-3 rounded-md font-montserrat mt-5 md:mt-0 bg-orange-500 hover:bg-orange-600 text-white font-semibold"
        >
          + Add New Product
        </button>
      </div>

      {/* ---------------- ADD PRODUCT MODAL ---------------- */}
      {ismodalopen && (
        <AddEditModal
          mode="add"
          loading={loading}
          close={() => setismodalopen(false)}
          save={handleSaveProduct}
          productname={productname}
          setproductname={setproductname}
          productprice={productprice}
          setproductprice={setproductprice}
          productstock={productstock}
          setproductstock={setproductstock}
          productdiscount={productdiscount}
          setproductdiscount={setproductdiscount}
          productdescription={productdescription}
          setproductdescription={setproductdescription}
          productcategory={productcategory}
          setproductcategory={setproductcategory}
          productimage={productimage}
          setproductimage={setproductimage}
          categories={categories}
        />
      )}

      {/* ---------------- EDIT PRODUCT MODAL ---------------- */}
      {isEditModalOpen && (
        <AddEditModal
          mode="edit"
          loading={loading}
          close={() => setIsEditModalOpen(false)}
          save={handleUpdateProduct}
          productname={productname}
          setproductname={setproductname}
          productprice={productprice}
          setproductprice={setproductprice}
          productstock={productstock}
          setproductstock={setproductstock}
          productdiscount={productdiscount}
          setproductdiscount={setproductdiscount}
          productdescription={productdescription}
          setproductdescription={setproductdescription}
          productcategory={productcategory}
          setproductcategory={setproductcategory}
          productimage={productimage}
          setproductimage={setproductimage}
          categories={categories}
          oldImages={oldImages}
        />
      )}
      {/* ---------------- PRODUCTS ROW / SLIDER ---------------- */}
      <div className="w-full overflow-x-auto md:overflow-x-hidden">
        {productSlides.map((group, index) => (
          <div
            key={index}
            className="flex gap-4 p-4 md:grid md:grid-cols-4 md:gap-4 flex-nowrap"
          >
            {group.map((item) => (
              <div
                key={item._id}
                className="bg-white border border-gray-200 rounded-md shadow-sm flex-shrink-0 w-[250px] md:w-auto"
              >
                {/* IMAGE */}
                <img
                  src={`${import.meta.env.VITE_IMAGE_URL}${
                    item.productimages?.[0]
                  }`}
                  alt={item.productname}
                  className="w-full h-48 object-cover"
                />

                {/* INFO */}
                <div className="p-2">
                  <h2 className="text-gray-800 font-medium text-sm truncate">
                    {item.productname}
                  </h2>

                  <p className="text-gray-600 text-xs mt-1">
                    PKR {item.productprice}
                  </p>

                  <p className="text-gray-500 text-xs mt-1 line-clamp-2">
                    {item.productdescription}
                  </p>

                  <div className="flex justify-between items-center mt-2">
                    <div className="flex gap-1">
                      <button
                        onClick={() => openEditModal(item)}
                        className="bg-orange-500 hover:bg-orange-600 text-white px-2 py-1 text-xs rounded"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(item._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 text-xs rounded"
                      >
                        Delete
                      </button>
                    </div>

                    
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
