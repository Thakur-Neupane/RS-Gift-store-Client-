import { Link } from "react-router-dom";
import { Stack } from "react-bootstrap";

export const Sidebar = () => {
  return (
    <div className="neumorphic-sidebar">
      <Stack gap={1} className="fw-bold fs-5 text-primary">
        <div className="p-2">
          <Link className="nav-link" to="/admin/dashboard">
            Dashboard
          </Link>
        </div>
        <div className="p-2">
          <Link className="nav-link" to="/admin/categories">
            Categories
          </Link>
        </div>
        <div className="p-2">
          <Link className="nav-link" to="/admin/sub-categories">
            Sub-Categories
          </Link>
        </div>
        <div className="p-2">
          <Link className="nav-link" to="/admin/products">
            Products
          </Link>
        </div>

        <div className="p-2">
          <Link className="nav-link" to="/admin/products/products-dashboard">
            ProductsView
          </Link>
        </div>
        <div className="p-2">
          <Link className="nav-link" to="/admin/users">
            Users
          </Link>
        </div>
        <div className="p-2">
          <Link className="nav-link" to="/admin/orders">
            Orders
          </Link>
        </div>
        <div className="p-2">
          <Link className="nav-link" to="/admin/reviews">
            Reviews
          </Link>
        </div>
        <hr className="border border-dark shadow" />
        <div className="p-2">
          <Link className="nav-link" to="/admin/admins">
            Admins
          </Link>
        </div>
      </Stack>
    </div>
  );
};
