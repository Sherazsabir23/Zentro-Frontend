import React, { useState ,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import sellerauth from "../api/sellerauth";
import adminauth from '../api/adminauth';
import toast from "react-hot-toast";
import {useSelector} from 'react-redux';



const SellerForm = () => {
  const [step, setStep] = useState(1);
  const user = useSelector((state) => state.user.user);

  const [shopName, setShopName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [admincategories, setadmincategories]=useState([]);
  const [contact, setContact] = useState("");

  // Payment fields
  const [method, setMethod] = useState("");
  const [accountHolder, setAccountHolder] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [bankName, setBankName] = useState("");
  const [cnic, setCnic] = useState("");

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleNext = () => {
    if (!shopName || !description || !category || !contact) {
      toast.error("Please fill all fields!");
      return;
    }
    setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

      if (!user) {
    toast.error("You must be logged in to submit!");
    navigate("/login"); // Redirect to login page
    return;
  }
    if (!method || !accountHolder || !accountNumber || !cnic) {
      toast.error("Please fill payment info!");
      return;
    }

    try {
      setLoading(true);

      const sellerInfo = {
        method,
        accountHolder,
        accountNumber,
        bankName: method === "bank" ? bankName : "",
        cnic,
      };

      const response = await sellerauth.handleSellerForm({
        shopName,
        description,
        category,
        contact,
        sellerInfo,
      });

      if (response && response.success) {
        toast.success("Seller request sent!");
        navigate("/");
      } else {
        toast.error(response.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error");
    } finally {
      setLoading(false);
    }
  };


  const getCategories = async () => {
      try {
        const response = await adminauth.allCategories();
        if (response && response.success) {
          setadmincategories(response.categories);
        } else {
          toast.error("Something went wrong");
        }
      } catch (err) {
        console.log("error of backend is:", err);
        toast.error("Internal Server Error in allCatgories");
      }
    };
  
    useEffect(() => {
      getCategories();
    }, []);
  return (
    <div className="w-full sm:px-16 px-5 md:px-5 flex justify-center items-center flex-col py-10 ">
      <form
        className="max-w-md w-full bg-white shadow-lg rounded-2xl p-10 space-y-6 border border-gray-200"
        onSubmit={handleSubmit}
      >
        <h2 className="text-4xl font-bold text-center">
          Become a <span className="text-orange-600">Zentro Seller</span>
        </h2>

        {/* Step Indicators */}
        <div className="flex justify-center gap-4 pb-4">
          <div className={`w-3 h-3 rounded-full ${step === 1 ? "bg-orange-600" : "bg-gray-300"}`}></div>
          <div className={`w-3 h-3 rounded-full ${step === 2 ? "bg-orange-600" : "bg-gray-300"}`}></div>
        </div>

        {/* STEP 1: SHOP DETAILS */}
        {step === 1 && (
          <div className="space-y-4 animate-fadeIn">
            <input
              type="text"
              placeholder="Shop Name"
              value={shopName}
              onChange={(e) => setShopName(e.target.value)}
              className="w-full bg-gray-100 py-3 px-4 rounded-lg outline-none"
            />

            <textarea
              placeholder="Shop Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-gray-100 py-3 px-4 rounded-lg outline-none resize-none"
            />

         <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2 mb-3 border rounded-md outline-none"
              >
                <option value="">Select Category</option>

                {admincategories.map((cat) => (
                  <option key={cat._id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
          
            <input
              type="email"
              placeholder="Contact Email"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className="w-full bg-gray-100 py-3 px-4 rounded-lg outline-none"
            />

            <button
              type="button"
              onClick={handleNext}
              className="w-full bg-orange-600 text-white py-3 rounded-xl text-lg font-semibold hover:bg-orange-700 transition"
            >
              Next
            </button>
          </div>
        )}

        {/* STEP 2: PAYMENT DETAILS */}
        {step === 2 && (
          <div className="space-y-4 animate-fadeIn">
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              className="w-full bg-gray-100 py-3 px-4 rounded-lg outline-none"
            >
              <option value="">Payment Method</option>
              <option value="bank">Bank Transfer</option>
              <option value="jazzcash">JazzCash</option>
              <option value="easypaisa">EasyPaisa</option>
            </select>

            <input
              type="text"
              placeholder="Account Holder Name"
              value={accountHolder}
              onChange={(e) => setAccountHolder(e.target.value)}
              className="w-full bg-gray-100 py-3 px-4 rounded-lg outline-none"
            />

            <input
              type="text"
              placeholder="Account Number"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              className="w-full bg-gray-100 py-3 px-4 rounded-lg outline-none"
            />

            {method === "bank" && (
              <input
                type="text"
                placeholder="Bank Name"
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                className="w-full bg-gray-100 py-3 px-4 rounded-lg outline-none"
              />
            )}

            <input
              type="text"
              placeholder="CNIC Number"
              value={cnic}
              onChange={(e) => setCnic(e.target.value)}
              className="w-full bg-gray-100 py-3 px-4 rounded-lg outline-none"
            />

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex-1 bg-gray-300 py-3 rounded-xl font-semibold hover:bg-gray-400 transition"
              >
                Back
              </button>

              <button
                type="submit"
                className="flex-1 bg-orange-600 text-white py-3 rounded-xl font-semibold hover:bg-orange-700 transition"
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </div>
        )}
      </form>

      {/* Small CSS Animation */}
      
    </div>
  );
};

export default SellerForm;
