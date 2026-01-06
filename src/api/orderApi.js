 const placeOrderApi = async (orderPayload)=>{
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/placeorder`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        credentials:"include",
        body:JSON.stringify(orderPayload),
    })

    const data = await response.json();
    return data;
}


const getUserOrdersApi = async () => {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/userorders`, {
    method: "GET",
    credentials: "include", // send cookies for auth
  });
  const data = await response.json();
  return data;
};


const sellerOrders = async () => {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/sellerorders`, {
    method: "GET",
    credentials: "include", 
  });
  const data = await response.json();
  return data;
};

const updateOrderItemStatus = async (id,{productId,status})=>{
  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/updateorderstatus/${id}`,{
    method:"PUT",
    headers:{
      "Content-Type":"application/json",
    },
    credentials:"include",
    body:JSON.stringify({productId,status}),

  });
  const data = await response.json();
  return data;
};
    
const adminOrders = async (filters = {}) => {
  const queryString = new URLSearchParams({
    status: filters.status || "All",
    paymentType: filters.paymentType || "All",
    codStatus: filters.codStatus || "All",
  }).toString();

  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/allorders?${queryString}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    }
  );

  return await res.json();
};


const updateStatus = async (id,{status}) =>{
  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/updateorderstatus`,{
    method:"PUT",
headers:{
  "Content-Type":"application/json",
},

credentials:"include",
body:JSON.stringify({id,status}),
})

const data = await response.json();
return data;
}



const markCODSettled = async (id) => {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/updatepaymentstatus/${id}`,{
    method:"PUT",
    credentials:"include",
    headers:{
      "Content-Type":"application/json",
    },
  })

  const data = await response.json();
  return data;

}



export default {
    placeOrderApi,
    getUserOrdersApi,
    sellerOrders,
    updateStatus,
    adminOrders,
    updateOrderItemStatus,
    markCODSettled,


 }