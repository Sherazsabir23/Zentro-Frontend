import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store/store";
import "./index.css";

// Layouts
import UserLayout from "./Layout/UserLayout";
import AdminLayout from "./Layout/AdminLayout";
import SellerLayout from "./Layout/SellerLayout";
import MainLayout from "./Layout/MainLayout";

// Public / User Pages
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import VerifyOtp from "./pages/Verifyotp";
import SellerForm from "./pages/SellerForm";
import MyAccount from "./pages/MyAccount";
import SearchedProducts from "./pages/SearchedProducts";
import ProductDetails from "./components/ProductDetails";
import Cart from "./pages/Cart";
import UserOrders from "./pages/UserOrders";
import Contact from "./pages/Contact";
import ShippingPolicy from "./pages/ShippingPolicy";
import FAQ from "./pages/FAQ";


// Admin Pages
import AdminDashboard from "./adminPages/AdminDashboard";
import AllUsers from "./adminPages/AllUsers";
import SellerRequests from "./adminPages/SellerRequests";
import Category from "./adminPages/Category";
import AdminOrders from "./adminPages/AdminOrders";
import SellerPayments from "./adminPages/SellerPayments";
import ProductApproval from "./adminPages/Product";
import AdminPaymentHistory from "./adminPages/AdminPaymentHistory";
import AdminSliderUpload from "./adminPages/AdminSliderUpload";

// Seller Pages
import SellerDashboard from "./sellerpages/SellerDashboard";
import Products from "./sellerpages/Products";
import SellerOrders from "./sellerpages/SellerOrders";
import SellerEarnings from "./sellerpages/SellerEarnings";
import Setting from "./sellerpages/SellerSettings";
import SellerTerms from "./sellerpages/SellerTerms";
import { Toaster } from "react-hot-toast";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
    
      {/* ===== USER ROUTES ===== */}
      <Route path="/" element={<MainLayout />}>

      <Route path="/" element={<UserLayout />}>
        <Route index element={<Home />} />
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
        <Route path="verification/email" element={<VerifyOtp />} />
        <Route path="selleraccount" element={<SellerForm />} />
        <Route path="myaccount" element={<MyAccount />} />
        <Route path="search" element={<SearchedProducts />} />
        <Route path="product/:id"  element={<ProductDetails />} key={window.location.pathname} />
        <Route path="cart" element={<Cart />} />
        <Route path="orders" element={<UserOrders />} />
        <Route path="contact" element={<Contact />} />
        <Route path="shippingpolicy" element={<ShippingPolicy />} />
        <Route path="faq" element={<FAQ />} />
        <Route path="terms" element={<SellerTerms />} />

      </Route>
      {/* ===== ADMIN ROUTES ===== */}
      <Route path="admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="users" element={<AllUsers />} />
        <Route path="seller-requests" element={<SellerRequests />} />
        <Route path="category" element={<Category />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="payments" element={<SellerPayments />} />
        <Route path="sellerproducts" element={<ProductApproval />} />
        <Route path="sellerpaymenthistory" element={<AdminPaymentHistory />} />
        <Route path="sliders" element={<AdminSliderUpload />} />
      </Route>

      {/* ===== SELLER ROUTES ===== */}
      <Route path="seller" element={<SellerLayout />}>
        <Route index element={<SellerDashboard />} />
        <Route path="products" element={<Products />} />
        <Route path="orders" element={<SellerOrders />} />
        <Route path="earnings" element={<SellerEarnings />} />
        <Route path="settings" element={<Setting />} />
        
      </Route>
      </Route>
    </>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <Toaster position="top-center" />
    </Provider>
  </StrictMode>
);
