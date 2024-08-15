import React, { useRef } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { CustomInput } from "../common/custom-input/CustomInput";
import { requestOTP } from "../../features/users/userAxios";

export const RequestOTP = ({ handleOnOTPRequest }) => {
  const emailRef = useRef("");

  const handleOnSubmit = (e) => {
    e.preventDefault();
    emailRef.current.value && handleOnOTPRequest(emailRef.current.value);
  };

  const input = {
    label: "Email",
    name: "email",
    type: "email",
    required: true,
    placeholder: "Sam@email.com",
    forwardRef: emailRef,
  };

  return (
    <Form className="shadow-lg p-3 rounded  bg-light" onSubmit={handleOnSubmit}>
      <h3 className="text-center">Request OTP</h3>
      <hr />
      <Alert>
        If your email is found in the system, We wills end you an OTP to rest
        the password!
      </Alert>

      <CustomInput {...input} />

      <div className="d-grid mt-3">
        <Button type="submit"> Request Now</Button>
      </div>
    </Form>
  );
};
