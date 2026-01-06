const signupApi = async(userEmail,userPassword,userName) =>{
    try{
const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/signup`,{
    method:"POST",
    headers:{
"Content-Type":"application/json",
    },
    
    credentials:"include",
    body:JSON.stringify({
        userEmail,userPassword,userName
    })
})

const data = await response.json();
return data;
    }catch(err){
   console.error("Signup API Error:", err);
    return { error: "Something went wrong" };
    }

}


const loginApi = async(userEmail,userPassword) =>{
    try{
const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/login`,{
    method:"POST",
    headers:{
"Content-Type":"application/json",
    },
    
    credentials:"include",
    body:JSON.stringify({
        userEmail,userPassword
    })
})

const data = await response.json();
return data;
    }catch(err){
   console.error("Signup API Error:", err);
    return { error: "Something went wrong" };
    }

}

const verifyOtp = async ({email,otp}) =>{
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/verifyOtp`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        credentials:"include",
        body:JSON.stringify({email,otp})

    });
        const data = await response.json();

        return data;
}

const me = async () => {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
     credentials: "include",
   
  });
  const data = await response.json();
  return data;
};


const userProfile = async (form,id)=>{
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/userprofile/${id}`,{
        method:"PUT",

        credentials:"include",
        body:form,
    });
    const data = await response.json();
    return data;

}
export default {
    signupApi,
    loginApi,
    verifyOtp,
    me,
    userProfile,
}