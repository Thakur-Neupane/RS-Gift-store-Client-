import React, { useEffect, useRef, useState } from "react";
import { Alert, Button, Form, Placeholder } from "react-bootstrap";
import { CustomInput } from "../../components/common/custom-input/CustomInput";
import useForm from "../../Hooks/useForm";
import {
  createNewAdminAction,
  loginAdminAction,
} from "../../features/users/userAction";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { RequestOTP } from "../../components/password-reset/RequestOTP";
import { ResetPass } from "../../components/password-reset/ResetPass";
import { requestOTP, resetPassword } from "../../features/users/userAxios";

const ForgetPassword = () => {
  const [showForm, setShowForm] = useState("otp");
  const [email, setEmail] = useState("");
  const [resp, setResp] = useState({});
  const [timer, setTimer] = useState(10);

  const handleOnOTPRequest = async (email) => {
    setTimer(60);
    setEmail(email);
    //call api and process OTP
    const respons = await requestOTP({
      email,
    });
    setResp(respons);

    if (respons.status === "success") {
      setShowForm("reset");
      countDown();
    }
  };

  const countDown = () => {
    const cd = setInterval(() => {
      setTimer((preTimer) => {
        if (preTimer === 1) clearInterval(cd);
        return preTimer - 1;
      });
    }, 1000);
  };

  const handleOnResetPassword = (obj) => {
    resetPassword({ ...obj, email });
  };

  const forms = {
    otp: <RequestOTP handleOnOTPRequest={handleOnOTPRequest} />,
    reset: <ResetPass handleOnResetPassword={handleOnResetPassword} />,
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100  bg-dark">
      <div className="bg-light p-3 rounded" style={{ width: "450px" }}>
        {resp.message && (
          <>
            <Alert variant={resp.status === "success" ? "success" : "danger"}>
              {resp.message}
            </Alert>
            <div className="m-3">
              OTP not received? request otp agin{" "}
              <Button
                variant="secondary"
                disabled={timer > 0}
                onClick={() => handleOnOTPRequest(email)}
              >
                Request In {timer}s
              </Button>
            </div>
          </>
        )}

        {forms[showForm]}

        <div className="text-end mt-3">
          <a href="/">Login Now</a>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
