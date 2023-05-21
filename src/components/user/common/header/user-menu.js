import React from "react";
import { Button, Dropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { encryptedLocalStorage } from "../../../../helpers/functions/encrypt-storage";
import { question } from "../../../../helpers/functions/swal";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { logout } from "../../../../store/slices/auth-slice";
import "./user-menu.scss";

const UserMenu = () => {
  const { isUserLogin, user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    question("Logout", "Are you sure to logout?").then((result) => {
      if (result.isConfirmed) {
        dispatch(logout());
        encryptedLocalStorage.removeItem("token");
        navigate("/");/*  */
      }
    });
  };

  return (
    <div className="user-menu">
      {isUserLogin ? (
        <Dropdown align="end" data-testid="ddlUserMenu">
          <Dropdown.Toggle variant="primary">
            {user.firstName} {user.lastName}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {user.roles.includes("Administrator") && (
              <>
                <Dropdown.Item as={Link} to="/admin">
                  Admin Panel
                </Dropdown.Item>
                <Dropdown.Divider />
              </>
            )}

            <Dropdown.Item as={Link} to="/user">
              Profile
            </Dropdown.Item>
            <Dropdown.Item as={Link} to="/user/reservations">
              Reservations
            </Dropdown.Item>
            <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ) : (
        <>
          <Button variant="secondary" as={Link} to="/auth?key=login">
            Login
          </Button>
          <Button variant="primary" as={Link} to="/auth?key=register">
            Register
          </Button>
        </>
      )}
    </div>
  );
};

export default UserMenu;
