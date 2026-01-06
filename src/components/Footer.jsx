import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Footer() {
  const user = useSelector((state) => state.user.user);

  
  return (
    <footer className="bg-orange-600 text-white pt-10 font-montserrat pb-6 px-6 ">
      
      {/* Top Section */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 p-10">

        {/* Brand */}
        <div>
          <h2 className="text-3xl font-semibold mb-3"> § Zentro</h2>
          <p className="text-sm text-orange-100 font-roboto">
            Your trusted multi-vendor platform for quality products and reliable sellers.
          </p>
        </div>

        {/* Customer Support */}
        <div>
          <h3 className="font-semibold mb-3">Customer Support</h3>
          <ul className=" flex flex-col gap-2 text-sm text-orange-100 font-roboto">
           <Link to="/contact"><li className="hover:text-white cursor-pointer">Contact Us</li></Link> 
           <Link to="/faq"><li className="hover:text-white cursor-pointer">FAQs</li></Link> 
           
          <Link to="/shippingpolicy"> <li className="hover:text-white cursor-pointer">Shipping Policy</li></Link>
          </ul>
        </div>

        {/* Seller Section */}
        <div>
          <h3 className="font-semibold mb-3">Sellers</h3>
          <ul className=" text-sm text-orange-100 font-roboto flex flex-col gap-2">
            <Link to="/selleraccount"><li className="hover:text-white cursor-pointer">Become a Seller</li></Link>
            {user && (
          <Link to="/seller"> <li className="hover:text-white cursor-pointer">Seller Dashboard</li></Link>
            )}
          
           <Link to="/terms"> <li className="hover:text-white cursor-pointer">Seller Terms</li></Link>
          </ul>
        </div>

        {/* Account */}
        <div>
          <h3 className="font-semibold text-xl mb-3">Account</h3>
          <ul className=" text-sm text-orange-100 font-roboto flex flex-col gap-2">
            {!user && (
              <>
               <Link to="/login"> <li className="hover:text-white cursor-pointer">Login</li></Link> 
           <Link to="/signup"> <li className="hover:text-white cursor-pointer">Register</li></Link>
              </>
            )}
          
           {user && (
            <>
          <Link to="/orders"> <li className="hover:text-white cursor-pointer">My Orders</li></Link>
          <Link to="/myaccount"> <li className="hover:text-white cursor-pointer">My Account</li></Link>
          <Link to="/cart"> <li className="hover:text-white cursor-pointer">Your Cart</li></Link>
          </>
           )}
           
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-orange-400 mt-8 pt-4 text-center text-sm text-orange-100">
        © 2025 Zentro. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;
