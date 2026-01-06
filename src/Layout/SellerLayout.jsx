import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import sellerauth from "../api/sellerauth";
import Sidebar from "../components/Sidebar";
import toast from "react-hot-toast";

const SellerLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkRole = async () => {
      try {
        const res = await sellerauth.checkSellerRole();
        if (!res.success) {
          toast.error(res.message);
          navigate("/");
        }
      } catch (err) {
        toast.error("Access denied");
        navigate("/");
      }
    };

    checkRole();
  }, [navigate]);

  return (
    <div className="flex">
      <Sidebar />

      <div className=" w-full min-h-screen bg-gray-100 md:p-6 md:ml-64">
        <Outlet />
      </div>
    </div>
  );
};

export default SellerLayout;
