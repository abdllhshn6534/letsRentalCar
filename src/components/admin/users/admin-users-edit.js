import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  ButtonGroup,
  Col,
  Form,
  Row,
  Spinner,
} from "react-bootstrap";
import PasswordInput from "../../common/password-input/password-input";
import ReactInputMask from "react-input-mask-next";
import * as Yup from "yup";
import { useFormik } from "formik";
import { question, toast } from "../../../helpers/functions/swal";
import Loading from "../../common/loading/loading";
import {
  deleteUserById,
  getUserById,
  updateUserById,
} from "../../../api/user-service";
import { useNavigate, useParams } from "react-router-dom";

const AdminUsersEdit = () => {
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [updating, setUpdating] = useState(false);
  const { userId } = useParams();
  const navigate = useNavigate();

  const [initialValues, setInitialValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
    zipCode: "",
    roles: [],
    builtIn: false, //bazı kayıtların değiştirilmesi ve silinmesini engellemek için kullanıyoruz.
  });

  const validationSchema = Yup.object({
    firstName: Yup.string().required("Please enter your first name"),
    lastName: Yup.string().required("Please enter your last name"),
    email: Yup.string()
      .email("Plese enter a valid email address")
      .required("Please enter an email address"),
    password: Yup.string()
      .min(8, "Please provide at least 8 characters")
      .matches(/[a-z]+/, "One lowercase character")
      .matches(/[A-Z]+/, "One uppercase character")
      .matches(/[@$!%*#?&.]+/, "One special character")
      .matches(/\d+/, "One number"),
    phoneNumber: Yup.string()
      .required("Please enter your phone number")
      .test(
        "is_includes_",
        "Please enter a valid phone number",
        (val) => val && !val.includes("_")
      ),
    address: Yup.string().required("Please enter your address"),
    zipCode: Yup.string().required("Please enter your zip code"),
    roles: Yup.array().test(
      "role_check",
      "Please select a role",
      (val) => val.length > 0
    ),
  });

  const onSubmit = async (values) => {
    if (!values.password) {
      delete values.password;
    }

    setUpdating(true);
    try {
      await updateUserById(userId, values);
      toast("User was updated", "success");
    } catch (err) {
      toast(err.response.data.message, "error");
    } finally {
      setUpdating(false);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
    enableReinitialize: true,
  });

  const loadData = async () => {
    setLoading(true);
    try {
      const resp = await getUserById(userId);
      setInitialValues({ ...resp.data, password: "" });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const removeUser = async () => {
    setDeleting(true);
    try {
      await deleteUserById(userId);
      toast("User was deleted", "success");
      navigate(-1);
    } catch (err) {
      toast(err.response.data.message, "error");
    } finally {
      setDeleting(false);
    }
  };

  const handleDelete = () => {
    question("Are you sure to delete?", "You won't be able to undo it!").then(
      (result) => {
        if (result.isConfirmed) {
          removeUser();
        }
      }
    );
  };

  useEffect(() => {
    loadData();
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <Form noValidate onSubmit={formik.handleSubmit}>
      <fieldset disabled={formik.values.builtIn}>
        <Row className="row-cols-1 row-cols-md-2 row-cols-lg-3">
          <Form.Group as={Col} className="mb-3">
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

          <Form.Group as={Col} className="mb-3">
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

          <Form.Group as={Col} className="mb-3">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="text"
              as={ReactInputMask}
              mask="(999) 999-9999"
              {...formik.getFieldProps("phoneNumber")}
              isValid={formik.touched.phoneNumber && !formik.errors.phoneNumber}
              isInvalid={
                formik.touched.phoneNumber && !!formik.errors.phoneNumber
              }
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.phoneNumber}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              {...formik.getFieldProps("email")}
              isValid={formik.touched.email && !formik.errors.email}
              isInvalid={formik.touched.email && !!formik.errors.email}
              disabled
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.email}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} className="mb-3">
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

          <Form.Group as={Col} className="mb-3">
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

          <Form.Group as={Col} className="mb-3">
            <Form.Label>Password</Form.Label>
            <PasswordInput
              {...formik.getFieldProps("password")}
              isValid={formik.touched.password && !formik.errors.password}
              isInvalid={formik.touched.password && !!formik.errors.password}
              error={formik.errors.password}
            />
          </Form.Group>

          <Form.Group as={Col} className="mb-3">
            <Form.Label>Roles</Form.Label>
            <Form.Check
              label="Customer"
              type="checkbox"
              name="roles"
              value="Customer"
              checked={formik.values.roles.includes("Customer")}
              onChange={formik.handleChange}
              isValid={formik.touched.roles && !formik.errors.roles}
              isInvalid={formik.touched.roles && !!formik.errors.roles}
            />
            <Form.Check
              label="Administrator"
              type="checkbox"
              name="roles"
              value="Administrator"
              checked={formik.values.roles.includes("Administrator")}
              onChange={formik.handleChange}
              isValid={formik.touched.roles && !formik.errors.roles}
              isInvalid={formik.touched.roles && !!formik.errors.roles}
              feedback={formik.errors.roles}
              feedbackType="invalid"
            />
          </Form.Group>
        </Row>
      </fieldset>
      {formik.values.builtIn && (
        <Alert variant="warning">
          Built-in accounts cannot be deleted or updated
        </Alert>
      )}
      <div className="text-end">
        <ButtonGroup>
          <Button variant="secondary" onClick={() => navigate(-1)}>
            Cancel
          </Button>
          {!formik.values.builtIn && (
            <>
              <Button variant="primary" type="submit" disabled={!(formik.dirty && formik.isValid) || updating}>
                {" "}
                {updating && <Spinner animation="border" size="sm" />} Update
              </Button>
              <Button
                variant="danger"
                onClick={handleDelete}
                disabled={deleting}
              >
                {deleting && <Spinner animation="border" size="sm" />} Delete
              </Button>
            </>
          )}
        </ButtonGroup>
      </div>
    </Form>
  );
};

export default AdminUsersEdit;
