import React from 'react'
import { useState } from 'react'
import { useLocation,useNavigate } from 'react-router-dom';
import auth from "../api/auth";
import { useEffect } from 'react';
import toast from 'react-hot-toast';

const VerifyOtp = () => {
    const [otp,setOtp] = useState("");
    const [resendTimer,setResendTimer] = useState(30);
    const [canResend,setCanResend] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const email  = queryParams.get("email");

   /*  resend otp  */

   useEffect(()=>{
    let interval;
    if(resendTimer > 0){
    interval=setInterval(()=>{
      setResendTimer((prev) => prev-1);
    },1000)
    }else{
        setCanResend(true);
    }
return () => clearInterval(interval); 
   },[resendTimer])

   const ResendOtp = ()=>{
    alert("otp resend");
    setResendTimer(30);
    setCanResend(false);
   }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
             const response = await auth.verifyOtp({email,otp});
        if(response && response.success){
            toast.success("Email verification done");
            navigate("/");
        }else{
            console.log("error:",response.message);
         toast.error("Something Went Wrong in verify otp check console")   ;

        }

        }catch(err){
            console.log("error:",err);
        toast.error("sever error in verify top check console");
        }
       
    }

    
  return (
    <div className='w-full py-10 flex justify-center items-center bg-gray-50'>
        <div className='max-w-md w-full py-8 flex justify-center items-center flex-col'>
            <div className='w-32 h-32'>
                <img src="./read.png" alt=""  className='w-full h-auto '/>
                </div>
                   <h2 className="text-2xl font-bold text-gray-800 mb-2 font-montserrat">Verify OTP</h2>
    <p className="text-gray-500 text-center mb-6 font-roboto">Enter the OTP sent to your email</p>
            <div className='w-full'>
                <form className='w-full p-5 flex justify-center items-center flex-col space-y-9 ' onSubmit={handleSubmit}>
                    <div className=' w-full flex justify-center items-center'>
                                             <input
              type="text"
              value={otp}
               maxLength="6"
              placeholder="Enter Your OTP"
              onChange={(e) => setOtp(e.target.value)}
              required
                className="w-full bg-gray-100 py-3 px-5 rounded-lg outline-none border-none  placeholder:text-gray-500 placeholder:font-medium "
            />
            
                    <button className="bg-orange-600 rounded-lg rounded-l-none px-6 py-3  text-white font-montserrat font-semibold" type='submit'>Submit</button>
                    </div>
                     <button disabled={!canResend} onClick={ResendOtp} className='text-gray-500 font-roboto  '>
                        {canResend?(
                          "Resend"
                        ):(
                       `Resend otp ${resendTimer}s`
                        )}
                        </button>
                </form>
            </div>
        </div>
    </div>

  )
}

export default VerifyOtp