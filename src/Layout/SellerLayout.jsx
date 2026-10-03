
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux"
import sellerauth from "../api/sellerauth";
import Sidebar from "../components/Sidebar";
import toast from "react-hot-toast";
import { logout } from "../redux/features/userSlice";

const SellerLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const checkRole = async () => {
      try {
        const res = await sellerauth.checkSellerRole();

        // Token invalid (admin ne seller approve kar diya)
        if (res.status === 401) {
          dispatch(logout());
          toast.error("Session expired. Please login again.");
          navigate("/login");
          return;
        }

        // Token valid hai lekin seller nahi hai
        if (res.status === 403) {
          toast.error(res.message);
          navigate("/login");
          return;
        }

        // Koi aur failure
        if (!res.success) {
          toast.error(res.message);
          navigate("/");
          return;
        }
      } catch (err) {
        toast.error("Something went wrong");
        navigate("/");
      }
    };

    checkRole();
  }, [dispatch, navigate]);

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
