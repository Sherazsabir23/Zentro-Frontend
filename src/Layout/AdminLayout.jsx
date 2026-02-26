import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="flex">
      <Sidebar type="admin" />

      <div className="md:ml-64 w-full min-h-screen bg-gray-100  ">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
