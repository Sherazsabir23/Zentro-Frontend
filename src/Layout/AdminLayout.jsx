import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Sidebar from "../components/Sidebar";
import adminauth from "../api/adminauth";

const AdminLayout = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdminRole = async () => {
      try {
        const res = await adminauth.checkAdminRole();

        if (res.success) {
          setIsAdmin(true);
          navigate("/admin")
        } else {
          toast.error(res.message || "Access Denied");
          navigate("/", { replace: true });
        }
      } catch (err) {
        console.log(err);

        toast.error(
          err.response?.data?.message || "Access Denied"
        );

        navigate("/", { replace: true });
      } finally {
        setLoading(false);
      }
    };

    checkAdminRole();
  }, [navigate]);

  // Jab tak role verify na ho
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-xl font-semibold text-orange-500">
          Checking Admin Access...
        </h1>
      </div>
    );
  }

  // Agar admin nahi hai to kuch render mat karo
  if (!isAdmin) {
    return null;
  }

  return (
    <div className="flex">
      <Sidebar type="admin" />

      <div className="md:ml-64 w-full min-h-screen bg-gray-100">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;