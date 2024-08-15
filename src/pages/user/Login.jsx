import React, { useEffect, useRef } from "react";
import { Button, Form, Placeholder } from "react-bootstrap";
import { CustomInput } from "../../components/common/custom-input/CustomInput";
import useForm from "../../Hooks/useForm";
import {
  createNewAdminAction,
  loginAdminAction,
} from "../../features/users/userAction";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import { FaFacebook, FaGoogle } from "react-icons/fa";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const emailRef = useRef("");
  const passwordRef = useRef("");

  const { user } = useSelector((state) => state.userInfo);

  const redirectTo = location?.state?.from?.pathname || "/admin/dashboard";
  useEffect(() => {
    user?._id && navigate(redirectTo);
  }, [user?._id]);

  const handleOnSubmit = (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    if (!email || !password) {
      return toast.error("Must have email and password filled");
    }

    //call server to process the authentication
    dispatch(loginAdminAction({ email, password }));
  };

  const inputs = [
    {
      label: "Email",
      name: "email",
      type: "email",
      required: true,
      placeholder: "Sam@email.com",
      forwardRef: emailRef,
    },
    {
      label: "Password",
      name: "password",
      type: "password",
      required: true,
      placeholder: "*******",
      forwardRef: passwordRef,
    },
  ];

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        backgroundColor: "#F9F5F3", // Soft and inviting background color
        minHeight: "100vh", // Ensure full viewport height coverage
        padding: "20px", // Optional: Add padding around the content
      }}
    >
      <div
        className="d-flex flex-column align-items-center"
        style={{ maxWidth: "600px", width: "100%" }}
      >
        {/* Login Form */}
        <div className="mb-3" style={{ width: "100%" }}>
          <Form
            className="shadow-lg p-3 rounded bg-light"
            onSubmit={handleOnSubmit}
          >
            <h3 className="text-center mb-4">Admin Login</h3>
            <hr />
            {inputs.map((item, i) => (
              <CustomInput key={i} {...item} />
            ))}
            <hr />
            <div className="d-grid mt-3">
              <Button variant="info" type="submit" className="w-100">
                Login Now
              </Button>
            </div>
            <div className="text-end mt-3">
              <small>
                Forgot password? <a href="/forget-password">Reset Now</a>
              </small>
            </div>
          </Form>
        </div>

        {/* Social Media Login Buttons */}
        <div style={{ width: "100%" }}>
          <Button
            variant="danger"
            type="button"
            className="w-100 mb-3 d-flex align-items-center justify-content-center"
            style={{ padding: "10px" }}
          >
            <FaGoogle size={20} className="me-2" />
            <span className="text-nowrap">Sign in with Google</span>
          </Button>

          <Button
            variant="primary"
            type="button"
            className="w-100 mb-3 d-flex align-items-center justify-content-center"
            style={{ padding: "10px" }}
          >
            <FaFacebook size={20} className="me-2" />
            <span className="text-nowrap">Sign in with Facebook</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
