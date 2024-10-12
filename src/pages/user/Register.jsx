import React, { useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { CustomInput } from "../../components/common/custom-input/CustomInput";
import useForm from "../../Hooks/useForm";
import { registerNewAdmin } from "../../features/users/userAction"; // Renamed for clarity
import { toast } from "react-toastify";

const Register = () => {
  const { form, setForm, handleOnChange, resetForm } = useForm({});

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const { confirmPassword, ...rest } = form;

    if (confirmPassword !== rest.password) {
      return toast.error("Passwords do not match");
    }

    registerNewAdmin(rest)
      .then(() => {
        toast.success("Admin registered successfully");
        resetForm(); // Reset form after successful registration
      })
      .catch((error) => {
        toast.error(error.message || "Registration failed");
      });
  };

  const inputs = [
    {
      label: "First Name",
      name: "fName",
      type: "text",
      required: true,
      placeholder: "Sam",
    },
    {
      label: "Last Name",
      name: "lName",
      type: "text",
      required: true,
      placeholder: "Smith",
    },
    {
      label: "Phone",
      name: "phone",
      type: "tel", // Change to 'tel' for better mobile experience
      placeholder: "0412345",
    },
    {
      label: "Email",
      name: "email",
      type: "email",
      required: true,
      placeholder: "Sam@email.com",
    },
    {
      label: "Password",
      name: "password",
      type: "password",
      required: true,
      placeholder: "*******",
    },
    {
      label: "Confirm Password",
      name: "confirmPassword",
      type: "password",
      required: true,
      placeholder: "*******",
    },
  ];

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div style={{ width: "450px" }}>
        <Form className="shadow-lg p-3 rounded" onSubmit={handleOnSubmit}>
          <h3>Admin Registration</h3>
          {inputs.map((input, index) => (
            <CustomInput key={index} {...input} onChange={handleOnChange} />
          ))}
          <div className="d-grid">
            <Button type="submit">Register New Admin</Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Register;
