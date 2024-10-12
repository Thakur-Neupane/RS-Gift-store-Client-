import { useEffect, useRef, useState } from "react";
import { Alert, Spinner } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { verifyUserLinkAction } from "../../features/users/userAction";

const UserVerification = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("c");
  const email = searchParams.get("e");

  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const shouldCall = useRef(true);

  useEffect(() => {
    const verifyLink = async () => {
      try {
        const data = await verifyUserLinkAction({ token, email });
        setResponse(data);
      } catch (err) {
        setError("An error occurred while verifying the link.");
      } finally {
        setLoading(false);
      }
    };

    if (shouldCall.current) {
      verifyLink();
      shouldCall.current = false;
    }
  }, [token, email]);

  return (
    <div className="d-flex justify-content-center bg-dark align-items-center vh-100">
      <div
        className="bg-light p-3 rounded text-center"
        style={{ width: "450px" }}
      >
        {loading ? (
          <>
            <Spinner animation="border" variant="primary" className="fs-1" />
            <div>Please wait while we verify your link...</div>
          </>
        ) : error ? (
          <Alert variant="danger">{error}</Alert>
        ) : response?.message ? (
          <Alert variant={response.status === "success" ? "success" : "danger"}>
            {response.message}
          </Alert>
        ) : null}
      </div>
    </div>
  );
};

export default UserVerification;
