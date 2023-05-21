import React from "react";
import { Container, Row, Col, Alert } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { useAppSelector } from "../../../store/hooks";
import PasswordForm from "./password-form";
import ProfileForm from "./profile-form";

const Profile = () => {
  const user = useAppSelector((state) => state.auth.user);
  const { firstName, lastName, email, builtIn } = user;

  return (
    <Container>
      <Row className="g-5">
        <Col lg={2} className="text-center">
          <FaUserCircle size="120" />
          <h4>
            {firstName} {lastName}
          </h4>
          <em>{email}</em>

          {builtIn && (
            <Alert variant="warning mt-5">
              Built-in accounts cannot be updated
            </Alert>
          )}
        </Col>
        <Col lg={5}>
          <h3>Update Profile</h3>
          <ProfileForm />
        </Col>
        <Col lg={5}>
          <h3>Update Password</h3>
          <PasswordForm />
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
