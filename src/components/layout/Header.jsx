import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { FaUser } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { logoutUserAction } from "../../features/users/userAction";

export const Header = () => {
  const dispatch = useDispatch();

  return (
    <Navbar expand="md" className="bg-info zindex=-1" data-bs-theme="secondary">
      <Container>
        <Navbar.Brand href="#home"> </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <NavDropdown title={<FaUser />} id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
              <NavDropdown.Item
                onClick={() => dispatch(logoutUserAction())}
                href="#"
              >
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
