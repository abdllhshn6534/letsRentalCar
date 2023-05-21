import { useFormik } from "formik";
import React, { useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import ReactInputMask from "react-input-mask-next";
import * as Yup from "yup";
import { register } from "../../../api/user-service";
import { toast } from "../../../helpers/functions/swal";
import PasswordInput from "../password-input/password-input";

const RegisterForm = ({setKey}) => {
  const [loading, setLoading] = useState(false);

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    address: "",
    zipCode: "",
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required("Please enter your first name"),
    lastName: Yup.string().required("Please enter your last name"),
    email: Yup.string()
      .email("Plese enter a valid email address")
      .required("Please enter an email address"),
    password: Yup.string()
      .required("Please enter a password")
      .min(8, "Please provide at least 8 characters")
      .matches(/[a-z]+/, "One lowercase character")
      .matches(/[A-Z]+/, "One uppercase character")
      .matches(/[@$!%*#?&.]+/, "One special character")
      .matches(/\d+/, "One number"),
    confirmPassword: Yup.string()
      .required("Please re-enter your password")
      .oneOf([Yup.ref("password")], "Password fields dosen't match"),
    phoneNumber: Yup.string()
      .required("Please enter your phone number")
      .test("is_includes_", "Please enter a valid phone number", (val) => val && !val.includes("_")),
    address: Yup.string().required("Please enter your address"),
    zipCode: Yup.string().required("Please enter your zip code"),
  });

  const onSubmit = async (values) => {
    setLoading(true);
    try {
      await register(values);
      toast("You're registered", "success");
      formik.resetForm();
      setKey("login");
    } catch (err) {
      toast(err.response.data.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });


  return (
    <Form noValidate onSubmit={formik.handleSubmit} className="p-4">
      <Form.Group className="mb-3">
        <Form.Label>First Name</Form.Label>
        <Form.Control
          type="text"
          {...formik.getFieldProps("firstName")}
          isValid={formik.touched.firstName && !formik.errors.firstName}
          isInvalid={formik.touched.firstName && !!formik.errors.firstName}
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.firstName}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Last Name</Form.Label>
        <Form.Control
          type="text"
          {...formik.getFieldProps("lastName")}
          isValid={formik.touched.lastName && !formik.errors.lastName}
          isInvalid={formik.touched.lastName && !!formik.errors.lastName}
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.lastName}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Phone Number</Form.Label>
        <Form.Control
          type="text"
          as={ReactInputMask}
          mask="(999) 999-9999"
          {...formik.getFieldProps("phoneNumber")}
          isValid={formik.touched.phoneNumber && !formik.errors.phoneNumber}
          isInvalid={formik.touched.phoneNumber && !!formik.errors.phoneNumber}
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.phoneNumber}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Address</Form.Label>
        <Form.Control
          type="text"
          {...formik.getFieldProps("address")}
          isValid={formik.touched.address && !formik.errors.address}
          isInvalid={formik.touched.address && !!formik.errors.address}
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.address}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Zip Code</Form.Label>
        <Form.Control
          type="text"
          {...formik.getFieldProps("zipCode")}
          isValid={formik.touched.zipCode && !formik.errors.zipCode}
          isInvalid={formik.touched.zipCode && !!formik.errors.zipCode}
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.zipCode}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          {...formik.getFieldProps("email")}
          isValid={formik.touched.email && !formik.errors.email}
          isInvalid={formik.touched.email && !!formik.errors.email}
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.email}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <PasswordInput
          {...formik.getFieldProps("password")}
          isValid={formik.touched.password && !formik.errors.password}
          isInvalid={formik.touched.password && !!formik.errors.password}
          error={formik.errors.password}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Confirm Password</Form.Label>
        <PasswordInput
          {...formik.getFieldProps("confirmPassword")}
          isValid={
            formik.touched.confirmPassword && !formik.errors.confirmPassword
          }
          isInvalid={
            formik.touched.confirmPassword && !!formik.errors.confirmPassword
          }
          error={formik.errors.confirmPassword}
        />
      </Form.Group>

      <Button
        variant="primary"
        type="submit"
        disabled={!(formik.dirty && formik.isValid) || loading}
      >
        {loading && <Spinner animation="border" size="sm" />} Register
      </Button>
    </Form>
  );
};

export default RegisterForm;
