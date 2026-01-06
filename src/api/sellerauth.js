
const handleSellerForm = async ({shopName,description,category,contact,sellerInfo}) =>{
   const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/sellerform`,{
    method:"POST",
    headers:{
        "Content-Type":"application/json",
    },
    credentials:"include",
    body:JSON.stringify({shopName,description,category,contact,sellerInfo}),

    
   })
   const data =  await response.json();

   return data;
   
}

const allsellerRequests = async () => {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/allsellerrequests`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const data = await response.json();
  return data;
};

const handleApproved = async (id)=>{
  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/handleapproved/${id}`,{
    method:"PUT",
    headers:{
        "Content-Type":"application/json",
    },
    credentials:"include",
        
    })

    const data = await response.json();
    return data;
}

const handleReject = async(id)=>{
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/handlereject/${id}`,{
    method:"DELETE",
    headers:{
        "Content-Type":"application/json",
    },
    credentials:"include",
    })


    if(!response.ok){
      const text = await response.text();
    return { success: false, message: text };
    }
     const data = await response.json();
    return data;
}



const handleproductform = async ({
  productname,
  productprice,
  productstock,
  productdiscount,
  productdescription,
  productcategory,
  productimage
}) => {
  try {
    const formData = new FormData();
    formData.append("productname", productname);
    formData.append("productprice", productprice);
    formData.append("productstock", productstock);
    formData.append("productdiscount",productdiscount);
    formData.append("productdescription", productdescription);
    formData.append("productcategory", productcategory);
    
    for (let i = 0; i < productimage.length; i++) {
      formData.append("productimage", productimage[i]);
    }

    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/handleproductform`,
      {
        method: "POST",
        credentials: "include",
        body: formData, 
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error submitting product form:", error);
    throw error;
  }
};


const featuredProducts = async () => {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/featuredproducts`, {
    method: "GET",
    headers:{
      "Content-Type":"application/json",
    },
    credentials:"include",
  });

  const data = await response.json();
  return data;


    };


const ProductDetails = async (id) => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/productdetails/${id}`,{
      method:"GET",
      headers:{
        "Content-Type":"application/json",

      },
      credentials:"include",
    })

    const data = await response.json();
    return data;
   
}


const postReview = async (id, reviewData) => {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/postreview/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials:"include",
      body: JSON.stringify(reviewData),
    });

    const data = await res.json();
    return data;
 
};


const trackViewApi = async (id) => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/trackview/${id}`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json",

      },
      credentials:"include",
    })

    const data = await response.json();
    return data;
   
}


const justForYouApi = async () => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/productsforhome`,{
      method:"GET",
      headers:{
        "Content-Type":"application/json",

      },
      credentials:"include",
    })

    const data = await response.json();
    return data;
   
}


const relatedProducts = async (id) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/relatedproducts/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error fetching related products:", err);
    return { success: false, products: [] };
  }
};


const checkSellerRole = async ()=>{
  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/checksellerrole`,{
    method:"GET",
    credentials:'include',
    headers:{
      "Content-Type":"application/json",
    }
    })
    const data = await response.json();
    return data;
}


// api/sellerApi.js
const fetchSellerMetrics = async () => {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/sellerdashboard-metrics`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // ✅ cookie auth
  });
  return res.json();
};

 const fetchSellerOrders = async () => {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/orders`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // ✅ cookie auth
  });
  return res.json();
};


const getSellerProducts = async () => {
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/seller-products`,
    {
      method: "GET",
      credentials: "include",
    }
  );
  return res.json();
};

const deleteSellerProduct = async (id) => {
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/delete-product/${id}`,
    {
      method: "DELETE",
      credentials: "include",
    }
  );
  return res.json();
};

const updateSellerProduct = async (id, formData) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/update-product/${id}`,
      {
        method: "PUT",
        credentials: "include",
        body: formData
      }
    );

    const data = await response.json();
    return data;

  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

const getSellerEarnings = async () => {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/earnings-summary`, {
    method: "GET",
    credentials: "include", // 🔥 important for cookies/session
    headers: {
      "Content-Type": "application/json",
    },
  });

  return await res.json();
};

// Seller payment history
const getSellerPaymentHistory = async () => {
  try {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/earnings-history`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // session/cookie ke liye
    });

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Error fetching seller payment history:", err);
    return { success: false, history: [] };
  }
};

const getSellerProfile = async () => {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/seller/profile`, {
    credentials: "include"
  });
  const data = await res.json();
  return data;
};

// Update profile
const updateSellerProfile = async (body) => {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/seller/profile`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(body),
  });
  return await res.json();
};
export default   {
handleSellerForm,
handleApproved,
handleReject,
allsellerRequests,
handleproductform,
featuredProducts,
ProductDetails,
postReview,
trackViewApi,
justForYouApi,
relatedProducts,
checkSellerRole,
fetchSellerMetrics,
fetchSellerOrders,
getSellerProducts,
deleteSellerProduct,
updateSellerProduct,
getSellerEarnings,
getSellerPaymentHistory,
getSellerProfile,
updateSellerProfile,
}