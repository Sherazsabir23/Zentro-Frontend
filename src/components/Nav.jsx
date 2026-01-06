import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { FaShoppingCart } from "react-icons/fa";
function Nav() {
  const [searchInput, setSearchInput] = useState("");
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      navigate(`/search/?query=${searchInput}`);
    }
  };
  return (
    <nav className=" bg-orange-600 w-full z-30 md:h-32 h-28   flex  md:items-center  items-start text-white fixed ">
      <ul className="absolute w-full flex flex-nowrap  whitespace-nowrap overflow-x-auto sm:justify-center justify-start  top-[55%] md:top-0 right-0  text-white  md:gap-10  md:p-0 p-5  gap-5 ">
        {user ? (
          <>
            <li className=" md:text-base text-sm font-montserrat uppercase">
              <Link to="/">Home</Link>
            </li>
            {user.role === "seller" ? (
              <li className="md:text-base text-sm font-montserrat uppercase">
                <Link to="/seller">Seller Dashboard</Link>
              </li>
            ) : (
              <li className="uppercase md:text-base text-sm font-montserrat">
                <Link to="/selleraccount">Sell on Zentro</Link>
              </li>
            )}

            <li className="uppercase md:text-base text-sm font-montserrat">
              <Link to="/myaccount">My Account</Link>
            </li>

            <li className="md:text-base text-sm font-montserra uppercase">
              <Link to="/orders">Your Orders</Link>
            </li>
          </>
        ) : (
          <>
            <li className="md:text-base text-sm font-montserrat uppercase">
              <Link to="/">Home</Link>
            </li>
            <li className="uppercase md:text-base text-sm font-montserrat">
              <Link to="/selleraccount">Sell On Zentro</Link>
            </li>
            <li className="md:text-base text-sm font-montserra uppercase">
              <Link to="/login">Login</Link>
            </li>
            <li className="md:text-base text-sm font-montserra uppercase">
              <Link to="/signup">signup</Link>
            </li>
          </>
        )}
      </ul>
      <ul className="flex items-center  gap-4 justify-evenly w-full md:p-0 pt-5 p-3">
        <li className=" text-white font-semibold hidden md:block  text-3xl">
          <span className="px-1">§</span>Zentro
        </li>
        <li className="md:flex-[0.6] flex-1 ">
          <input
            className="p-3 px-5 text-black w-full md:rounded-full rounded-lg outline-none border-none"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={handleSearch}
            type="text"
            placeholder="Search in Zentro"
          />
        </li>
        <li className="cursor-pointer hover:text-black">
          <Link to="/cart">
            <FaShoppingCart className="md:text-3xl text-4xl" />
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
