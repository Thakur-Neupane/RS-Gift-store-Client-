import { Link } from "react-router-dom";
import { Stack } from "react-bootstrap";

const navItems = [
  { path: "/admin/dashboard", label: "Dashboard" },
  { path: "/admin/categories", label: "Categories" },
  { path: "/admin/sub-categories", label: "Sub-Categories" },
  { path: "/admin/products", label: "Products" },
  { path: "/admin/products/products-dashboard", label: "Products Action" },
  { path: "/admin/users", label: "Users" },
  { path: "/admin/orders", label: "Orders" },
  { path: "/admin/reviews", label: "Reviews" },
  { path: "/admin/coupons", label: "Coupons" },
];

export const Sidebar = () => {
  return (
    <div className="neumorphic-sidebar">
      <Stack gap={1} className="fw-bold fs-5 text-primary">
        {navItems.map((item) => (
          <div className="p-2" key={item.path}>
            <Link className="nav-link" to={item.path} aria-label={item.label}>
              {item.label}
            </Link>
          </div>
        ))}
        <hr className="border border-dark shadow" />
      </Stack>
    </div>
  );
};
