import { useEffect, useRef, useState } from "react";
import { Alert, Spinner } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { verifyUserLinkAction } from "../../features/users/userAction";

const UserVerification = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("c");
  const email = searchParams.get("e");

  const [response, setResponse] = useState(null);
  const hasFetched = useRef(false);

  useEffect(() => {
    const verifyLink = async () => {
      const data = await verifyUserLinkAction({ token, email });
      setResponse(data);
    };

    if (!hasFetched.current) {
      verifyLink();
      hasFetched.current = true;
    }
  }, [token, email]);

  const renderContent = () => {
    if (response) {
      return (
        <Alert variant={response.status === "success" ? "success" : "danger"}>
          {response.message}
        </Alert>
      );
    }

    return (
      <>
        <Spinner animation="border" variant="primary" className="fs-1" />
        <div>Please wait while we are verifying your link...</div>
      </>
    );
  };

  return (
    <div className="d-flex justify-content-center bg-dark align-items-center vh-100">
      <div
        className="bg-light p-3 rounded text-center"
        style={{ width: "450px" }}
      >
        {renderContent()}
      </div>
    </div>
  );
};

export default UserVerification;
