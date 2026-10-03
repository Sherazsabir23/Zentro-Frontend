// 1) ADD TO CART
const addToCartApi = async (productId) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/add`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ productId }),
      }
    );

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Add To Cart API Error:", err);
    return { error: "Something went wrong" };
  }
};

// 2) GET USER CART
const getCartApi = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/`,
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
    console.error("Get Cart API Error:", err);
    return { error: "Something went wrong" };
  }
};

// 3) UPDATE QUANTITY (+ / -)
const updateQuantityApi = async (itemId, quantity) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/update/${itemId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ quantity }),
      }
    );

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Update Quantity API Error:", err);
    return { error: "Something went wrong" };
  }
};

// 4) REMOVE ITEM FROM CART
const removeItemApi = async (itemId) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/remove/${itemId}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Remove Item API Error:", err);
    return { error: "Something went wrong" };
  }
};

// 5) CLEAR CART
const clearCartApi = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/clear`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Clear Cart API Error:", err);
    return { error: "Something went wrong" };
  }
};



export default {
  addToCartApi,
  getCartApi,
  updateQuantityApi,
  removeItemApi,
  clearCartApi,
};
