import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../../assets/img/logo/logo.png";
import {
  RiHome3Line,
  RiUser3Line,
  RiCarLine,
  RiFileList3Line,
  RiLogoutCircleRLine,
  RiDashboardLine,
  RiMessage3Line,
} from "react-icons/ri";
import { useAppDispatch } from "../../../store/hooks";
import { question } from "../../../helpers/functions/swal";
import { logout } from "../../../store/slices/auth-slice";
import { encryptedLocalStorage } from "../../../helpers/functions/encrypt-storage";
import "./sidebar.scss";

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleLogout = () => {
    question("Logout", "Are you sure to logout?").then((result) => {
      if (result.isConfirmed) {
        dispatch(logout());
        encryptedLocalStorage.removeItem("token");
        navigate("/");
      }
    });
  };

  return (
    <Navbar bg="primary" expand="lg" className="admin-navbar" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/admin">
          <img src={logo} alt="Admin Panel" className="img-fluid" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/admin" active={pathname==="/admin"}>
              <RiDashboardLine /> Dashboard
            </Nav.Link>
            <Nav.Link as={Link} to="/admin/users" active={pathname.startsWith("/admin/users")}>
              <RiUser3Line /> Users
            </Nav.Link>
            <Nav.Link as={Link} to="/admin/vehicles"  active={pathname.startsWith("/admin/vehicles")}>
              <RiCarLine /> Vehicles
            </Nav.Link>
            <Nav.Link as={Link} to="/admin/reservations"  active={pathname.startsWith("/admin/reservations")}>
              <RiFileList3Line /> Reservations
            </Nav.Link>
            <Nav.Link as={Link} to="/admin/contact-messages"  active={pathname.startsWith("/admin/contact-messages")}>
              <RiMessage3Line /> Contact Messages
            </Nav.Link>
            <Nav.Link as={Link} to="/">
              <RiHome3Line /> Web Site
            </Nav.Link>
            <Nav.Link  onClick={handleLogout}>
              <RiLogoutCircleRLine/> Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Sidebar;
