import { Route, Routes } from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify";
import Login from "./pages/user/Login";
import Register from "./pages/user/Register";
import UserVerification from "./pages/user/UserVerification";
import { AdminLayout } from "./components/layout/AdminLayout";
import Dashboard from "./pages/Dashboard/Dashboard";
import Categories from "./pages/category/Categories";
import Products from "./pages/product/Products";
import { Profile } from "./pages/user/Profile";
import User from "./pages/user/User";
import Reviews from "./pages/review/Reviews";
import Admin from "./pages/user/Admin";
import Orders from "./pages/order/Orders";
import { Auth } from "./components/auth/Auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { autoLoginAction } from "./features/users/userAction";
import ForgetPassword from "./pages/user/ForgetPassword";
import NewProduct from "./pages/product/NewProduct";
import SubCategoryPage from "./pages/sub-category/SubCategory";
import ProductsDashboard from "./pages/Dashboard/ProductDashboard";
import EditProduct from "./components/forms/EditProduct";
import ProductView from "./pages/product/ProductView";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(autoLoginAction());
  }, [dispatch]);

  return (
    <div>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Login />} />
        <Route path="/verify-user" element={<UserVerification />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="admin/new" element={<Register />} />

        {/* Private routes */}
        <Route
          path="/"
          element={
            <Auth>
              <AdminLayout />
            </Auth>
          }
        >
          <Route path="admin/dashboard" element={<Dashboard />} />
          <Route path="admin/categories" element={<Categories />} />
          <Route path="admin/sub-categories" element={<SubCategoryPage />} />
          <Route path="admin/products" element={<Products />} />
          <Route path="admin/products/new" element={<NewProduct />} />
          <Route path="admin/products/view/:_id" element={<ProductView />} />
          <Route path="admin/products/edit/:_id" element={<EditProduct />} />
          <Route
            path="admin/products/products-dashboard"
            element={<ProductsDashboard />}
          />
          <Route path="admin/users" element={<User />} />
          <Route path="admin/orders" element={<Orders />} />
          <Route path="admin/reviews" element={<Reviews />} />
          <Route path="admin/admins" element={<Admin />} />
          <Route path="admin/profile" element={<Profile />} />
        </Route>

        <Route path="*" element={<h1>404 Page not found!</h1>} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
