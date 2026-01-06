import React, { useEffect, useState } from "react";
import adminauth from "../api/adminauth";
import { useNavigate } from "react-router-dom";

const HomeCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const Navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await adminauth.allCategories();

        if (response && response.success) {
          setCategories(response.categories);
        } else {
          console.log("error:", response.message);
        }
      } catch (err) {
        console.error("Fetch failed:", err);
      } finally {
        setLoading(false);
      }
    };

    // ✅ You forgot to call the function here
    fetchCategories();
  }, []);

  const searchProductsByCategory = (categoryName) => {
    Navigate(`/search/?category=${categoryName}`)
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <section className="w-full bg-gray-100 pt-10  px-3  sm:px-5 md:px-20">
      <h1 className="font-montserrat font-semibold text-lg">Categories</h1>
      <div  className="w-full cursor-pointer text-sm grid md:gird-cols-4 mt-3  grid-cols-3 lg:grid-cols-6 ">
        {categories.map((cat) => (
          <div onClick={()=>searchProductsByCategory(cat.name)} key={cat._id} className="capitalize py-5 px-3 hover:bg-gray-300 transition-all border text-black">
            {cat.name}
          </div>
        ))}
      </div>
      
    </section>
  );
};

export default HomeCategories;
