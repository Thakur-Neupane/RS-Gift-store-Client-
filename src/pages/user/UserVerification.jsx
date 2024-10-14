import { useEffect, useState } from "react";
import { Alert, Spinner } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { verifyUserLinkAction } from "../../features/users/userAction";

const UserVerification = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("c");
  const email = searchParams.get("e");

  const [resp, setResp] = useState({ message: "", status: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyLink = async () => {
      try {
        const data = await verifyUserLinkAction({ token, email });
        setResp(data);
      } catch (error) {
        setResp({
          message: "An error occurred during verification.",
          status: "error",
        });
      } finally {
        setLoading(false);
      }
    };

    if (token && email) {
      verifyLink();
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
            <div>Please wait while we are verifying your link...</div>
          </>
        ) : (
          <Alert variant={resp.status === "success" ? "success" : "danger"}>
            {resp.message}
          </Alert>
        )}
      </div>
    </div>
  );
};

export default UserVerification;
