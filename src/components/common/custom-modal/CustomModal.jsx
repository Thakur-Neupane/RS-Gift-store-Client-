import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { setShowModal } from "../../../store/systemSlice";

export const CustomModal = ({ show, setShow, title, children, ...rest }) => {
  const dispatch = useDispatch();
  // const { showModal } = useSelector((state) => state.system);

  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      {...rest}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
};
