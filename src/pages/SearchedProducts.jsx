import React, { useEffect, useState } from 'react'
import { useLocation, Link} from 'react-router-dom';
import api from "../api/searchapi";
import toast from 'react-hot-toast';


const SearchedProducts = () => {

  const [products,setProducts] = useState([]);
  const [loading,setloading] = useState(false);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");
  const category = new URLSearchParams(location.search).get("category");
 console.log(products.productimages?.[0])
useEffect(() => {
  const fetchProducts = async () => {
    setloading(true);
    try {
      let response;

      if (query) {
        
        response = await api.searchBarApi(query);
      } else if (category) {
        
        response = await api.getProductsByCategory(category);
      }

      if (response && response.success) {
        setProducts(response.products);
      } else {
        console.error("Error fetching products:", response?.message);
      }
    } catch (err) {
      console.log("Server error in search function:", err);
      toast.error("Server error while fetching products");
    } finally {
      setloading(false);
    }
  };

  if (query || category) fetchProducts();

}, [query, category]);



  // ---- LOADING RETURN ----
  if(loading){
    return (
      <div className="w-full min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
      </div>
    )
  }



  // ---- NORMAL RETURN ----
  return (
    <section className="w-full min-h-screen bg-gray-50 p-6">

      <div className="max-w-6xl mx-auto">

        {/* Top header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-black">Results</h1>
          <p className="text-gray-600 mt-2">Here are the items we found related to your search query.</p>

          <p className="mt-3 text-sm text-gray-500">
            Total Products Found: <span className="font-semibold text-black">{products.length}</span>
          </p>
        </div>

        {/* products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {products.length > 0 ? (
            products.map((item) => (
              <div key={item._id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition duration-200 overflow-hidden">
                
                <img
                  src={`${import.meta.env.VITE_IMAGE_URL}${item.productimages?.[0]}`}
                  alt={item.productname}
                  className="w-full h-48 object-cover"
                />

                <div className="p-4">
                  <h2 className="font-semibold text-lg  font-montserrat line-clamp-2">{item.productname}</h2>
                  <p className="text-gray-500 text-sm mt-1 line-clamp-1">{item.productdescription}</p>
                  <p className="text-black text-lg font-montserrat font-semibold mt-2">PKR {item.productprice}</p>

                  <button className="mt-4 w-full bg-black text-white py-2 rounded-lg hover:bg-gray-900 transition">
                    <Link to={`/product/${item._id}`}>View Details</Link>
                  </button>
                </div>

              </div>
            ))
          ) : (
            <p className="text-center col-span-full text-gray-500 text-lg">
              No products found!
            </p>
          )}
        </div>

      </div>
    </section>
  )
}

export default SearchedProducts;
