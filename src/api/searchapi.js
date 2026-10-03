 
 const searchBarApi = async (query)=>{
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/search?query=${query}`,{
        method:"GET",
        headers:{
            "Content-Type":"application/json",
        },
         credentials:"include",
    });
     
    const data = await response.json();
    return data ;
}

const getProductsByCategory = async (category)=>{
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/productsbycategory/${category}`,{
        method:"GET",
        headers:{
            "Content-Type":"application/json",
        },
        credentials:"include",
    });

    const data = await response.json();
    return data;
}
export default {
    searchBarApi,
    getProductsByCategory,

}