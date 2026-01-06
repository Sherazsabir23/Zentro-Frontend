import React,{useEffect} from 'react'
import {Outlet,useNavigate} from "react-router-dom"
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import auth from "../api/auth";
import {login,logout} from "../redux/features/userSlice";
import { useDispatch } from 'react-redux';

function MainLayout() {
 const navigate = useNavigate();
 const dispatch = useDispatch();
useEffect(() => {
  const fetchUser = async () => {
    try {
      const response = await auth.me();
      if (response && response.user) {
        dispatch(login(response.user));
      }
    } catch (err) {
      dispatch(logout());
      navigate("/login");
    }
  };

  fetchUser();
}, [dispatch, navigate]);

return (
    <>
      <Nav />

      {/* Navbar height = 70px */}
      <div className="md:pt-[128px]  pt-[112px] ">
        <Outlet />
      </div>
      
    </>
  );
}

export default MainLayout;