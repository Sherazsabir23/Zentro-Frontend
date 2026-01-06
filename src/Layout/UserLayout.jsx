import React from 'react'
import { Outlet } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'


const UserLayout = () => {
  return (
   <>
      <div>
        <Outlet /> {/* User pages ka content */}
      </div>
      <Footer /> {/* Sirf user pages me footer */}
    </>
  )
}

export default UserLayout