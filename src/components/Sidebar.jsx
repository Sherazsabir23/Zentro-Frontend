// src/components/Sidebar.jsx
import { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ type }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="z-10 ">
      <button
        className="text-black font-semibold text-3xl md:hidden fixed top-32 left-2 z-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        ☰
      </button>

      <div
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 pt-44 w-64 min-h-screen bg-orange-600  font-roboto text-white p-10  fixed top-0 left-0 transition-all duration-200`}
      >
        {type === "admin" ? (
          <>
            <h2 className="text-2xl mt-10 font-bold mb-6 font-montserrat">
              Admin Panel
            </h2>
            <nav className="flex flex-col gap-4">
              <Link
                to="/admin"
                onClick={() => setIsOpen(false)}
                className="hover:text-yellow-300"
              >
                Dashboard
              </Link>
              <Link to="/admin/category">Categories</Link>
              <Link
                to="/admin/users"
                onClick={() => setIsOpen(false)}
                className="hover:text-yellow-300"
              >
                Users
              </Link>
              <Link
                to="/admin/payments"
                onClick={() => setIsOpen(false)}
                className="hover:text-yellow-300"
              >
                Seller Payments
              </Link>
              <Link
                to="/admin/orders"
                onClick={() => setIsOpen(false)}
                className="hover:text-yellow-300"
              >
                Orders
              </Link>
                <Link
                to="/admin/sellerproducts"
                onClick={() => setIsOpen(false)}
                className="hover:text-yellow-300"
              >
                Seller Products
              </Link>
              <Link
                to="/admin/seller-requests"
                onClick={() => setIsOpen(false)}
                className="hover:text-yellow-300"
              >
                Seller Requests
              </Link>
            </nav>
          </>
        ) : (
          <>
            <nav className="flex flex-col gap-6 text-md font-montserrat font-semibold ">
              <Link
                to=""
                onClick={() => setIsOpen(false)}
                className="hover:text-yellow-300"
              >
                Dashboard
              </Link>
              <Link
                to="/seller/products"
                onClick={() => setIsOpen(false)}
                className="hover:text-yellow-300"
              >
                Products
              </Link>
              <Link
                to="/seller/orders"
                onClick={() => setIsOpen(false)}
                className="hover:text-yellow-300"
              >
                Orders
              </Link>
              <Link
                to="/seller/earnings"
                onClick={() => setIsOpen(false)}
                className="hover:text-yellow-300"
              >
                Earnings
              </Link>
              <Link
                to="/seller/settings"
                onClick={() => setIsOpen(false)}
                className="hover:text-yellow-300"
              >
                Settings
              </Link>
            </nav>
          </>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
