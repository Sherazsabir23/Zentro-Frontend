const allsellerRequests = async () => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/allsellerRequests`,
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
};

const addCategory = async (name) => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/addcategory`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ name }),
    }
  );
  const data = await response.json();
  return data;
};

const getCategories = async () => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/allcategories`,
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
};

const deleteCategory = async (id) => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/deletecategory/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }
  );

  const data = await response.json();
  return data;
};

const allCategories = async () => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/allcategories`,
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
};

const getSellerPayments = async () => {
  try {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/seller-payments`);
    if (!res.ok) throw new Error("Failed to fetch seller payments");
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Error in getSellerPayments API:", err);
    throw err;
  }
};

const markSellerPaymentAsPaid = async (sellerId) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/seller-payments/${sellerId}/mark-paid`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) throw new Error("Failed to mark payment as paid");
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Error in markSellerPaymentAsPaid API:", err);
    throw err;
  }
};


 const fetchDashboardStats = async () => {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/dashboard-stats`);
  return res.json();
};

const fetchLatestOrders = async () => {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/latest-orders`);
  return res.json();
};

const fetchLatestUsers = async () => {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/latest-users`);
  return res.json();
};



export const fetchAllUsers = async () => {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/users`);
  return res.json();
};


export const deleteUserById = async (id) => {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/${id}`, {
    method: "DELETE",
  });
  return res.json();
};

export const getUserDetailsById = async (id) => {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/${id}`);
  return res.json();
};



export const unApprovedProducts = async () => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/admin/products/pending`,
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
};


export const approveProduct = async (productId) => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/admin/products/approve/${productId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }
  );

  const data = await response.json();
  return data;
};


const rejectProduct = async (productId) => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/admin/products/reject/${productId}`,
    {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    }
  );

  const data = await response.json();
  return data;
};



export default {
  allsellerRequests,
  addCategory,
  getCategories,
  deleteCategory,
  allCategories,
  getSellerPayments,
  markSellerPaymentAsPaid,
  fetchDashboardStats,
  fetchLatestOrders,
  fetchLatestUsers,
  fetchAllUsers,
  deleteUserById,
  getUserDetailsById,
  unApprovedProducts,
  approveProduct,
  rejectProduct,
  
};
