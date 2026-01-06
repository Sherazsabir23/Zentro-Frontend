import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import auth from "../api/auth";
import toast from "react-hot-toast";

function Signup() {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await auth.signupApi(userEmail, userPassword, userName);
      if (response && response.success) {
        toast.success("user created successfully");
        // Navigate karte waqt
        navigate(`/verification/email?email=${userEmail}`);
      } else {
        toast.error("backend message:" + response.message);
      }
    } catch (err) {
      toast.error("Error is :" + err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-auto flex justify-center items-center px-5 bg-gray-50">
      <div className="max-w-5xl w-full grid md:grid-cols-2 gap-x-10 place-items-center  sm:px-16 md:px-0 py-10 md:py-20">
        {/*   left side */}
        <div className=" px-4">
          <h2 className="text-orange-600 text-4xl font-montserrat font-semibold">
            § Zentro
          </h2>
          <p className="text-gray-800 font-roboto py-2">
            Zentro – your one-stop hub for seamless shopping and selling.
          </p>
        </div>
        {/*  right side */}
        <div className="w-full sm:px-16   md:px-5 border border-slate-100 shadow-lg py-10  rounded-lg md:mt-0 mt-5">
          <h2 className="text-3xl font-montserrat font-semibold text-black text-center py-6">
            Signup
          </h2>
          <form
            className="flex justify-center px-7  space-y-5 items-center flex-col w-full"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              value={userName}
              placeholder="Name"
              onChange={(e) => setUserName(e.target.value)}
              required
              className="w-full bg-gray-100 py-3 px-5 rounded-lg outline-none border-none  placeholder:text-gray-500 placeholder:font-medium "
            />
            <input
              type="email"
              value={userEmail}
              placeholder="Email Address"
              onChange={(e) => setUserEmail(e.target.value)}
              required
              className="w-full bg-gray-100 py-3 px-5 rounded-lg outline-none border-none placeholder:text-gray-500 placeholder:font-medium "
            />
            <input
              type="password"
              value={userPassword}
              placeholder="Password"
              onChange={(e) => setUserPassword(e.target.value)}
              required
              className="w-full bg-gray-100 py-3 px-5 rounded-lg outline-none border-none  placeholder:text-gray-500 placeholder:font-medium "
            />

            <button
              className="bg-orange-600 rounded-full px-6 py-3  text-white font-montserrat font-semibold"
              type="submit"
            >
              {loading ? (
                <div className="w-5 h-5 border-white border-2 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                "Submit"
              )}
            </button>
            <div>
              <Link
                to="/login"
                className="text-gray-500 hover:text-sky-600 font-medium text-sm mt-4 font-montserrat"
              >
                Already Have Any Account?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
