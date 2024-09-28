import { useEffect, useRef, useState } from "react";
import { Alert, Spinner } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { verifyUserLinkAction } from "../../features/users/userAction";

const UserVerification = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("c");
  const email = searchParams.get("e");

  const [resp, setResp] = useState({});
  const shouldCall = useRef(true);

  useEffect(() => {
    // Call API to verify the link
    if (shouldCall.current) {
      (async () => {
        const data = await verifyUserLinkAction({ token, email });
        setResp(data);
      })();
      shouldCall.current = false;
    }
  }, [token, email]);

  return (
    <div className="d-flex justify-content-center bg-dark align-items-center vh-100">
      <div
        className="bg-light p-3 rounded text-center"
        style={{ width: "450px" }}
      >
        {resp.message ? (
          <Alert variant={resp.status === "success" ? "success" : "danger"}>
            {resp.message}
          </Alert>
        ) : (
          <>
            <Spinner animation="border" variant="primary" className="fs-1" />
            <div>Please wait while we are verifying your link...</div>
          </>
        )}
      </div>
    </div>
  );
};

export default UserVerification;
