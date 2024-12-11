import { Route, Routes } from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

// Pages
import Login from "./pages/user/Login";
import Register from "./pages/user/Register";
import UserVerification from "./pages/user/UserVerification";
import ForgetPassword from "./pages/user/ForgetPassword";
import Dashboard from "./pages/Dashboard/Dashboard";
import Categories from "./pages/category/Categories";
import Products from "./pages/product/Products";
import ProductView from "./pages/product/ProductView";
import NewProduct from "./pages/product/NewProduct";
import EditProduct from "./components/forms/EditProduct";
import ProductsDashboard from "./pages/Dashboard/ProductDashboard";
import Orders from "./pages/order/Orders";
import Reviews from "./pages/review/Reviews";
import User from "./pages/user/User";
import Profile from "./pages/user/Profile";
import UserDetails from "./pages/user/UserAction";
import SubCategoryPage from "./pages/sub-category/SubCategory";
import Coupon from "./pages/coupon/Coupon";

// Layouts
import { AdminLayout } from "./components/layout/AdminLayout";

// Auth
import { Auth } from "./components/auth/Auth";
import { autoLoginAction } from "./features/users/userAction";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(autoLoginAction());
  }, [dispatch]);

  return (
    <div>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/verify-user" element={<UserVerification />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="admin/new" element={<Register />} />
        <Route path="/users/:id" element={<UserDetails />} />

        {/* Private Routes */}
        <Route
          path="/admin/*"
          element={
            <Auth>
              <AdminLayout />
            </Auth>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="categories" element={<Categories />} />
          <Route path="coupons" element={<Coupon />} />
          <Route path="sub-categories" element={<SubCategoryPage />} />
          <Route path="products" element={<Products />} />
          <Route path="products/new" element={<NewProduct />} />
          <Route path="products/view/:_id" element={<ProductView />} />
          <Route path="products/edit/:_id" element={<EditProduct />} />
          <Route
            path="products/products-dashboard"
            element={<ProductsDashboard />}
          />
          <Route path="users" element={<User />} />
          <Route path="orders" element={<Orders />} />
          <Route path="reviews" element={<Reviews />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        {/* Catch-All Route */}
        <Route path="*" element={<h1>404 Page Not Found</h1>} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
