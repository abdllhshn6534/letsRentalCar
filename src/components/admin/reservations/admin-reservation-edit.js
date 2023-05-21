import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Form,
  Button,
  Row,
  Col,
  ButtonGroup,
  InputGroup,
  Spinner,
} from "react-bootstrap";


import Loading from "../../common/loading/loading";
import { deleteReservationById, getReservationById, updateReservationById } from "../../../api/reservation-service";
import { combineDateAndTime, getDate, getTime } from "../../../helpers/functions/date-time";
import { getVehicles } from "../../../api/vehicle-service";
import { question, toast } from "../../../helpers/functions/swal";

const statusData = ["CREATED", "CANCELLED", "DONE"];

const AdminReservationEdit = () => {
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [saving, setSaving] = useState(false);
  const [vehicles, setVehicles] = useState([]);
  const navigate = useNavigate();
  const { reservationId } = useParams();

  const [initialValues, setInitialValues] = useState({
    pickUpLocation: "",
    dropOffLocation: "",
    pickUpDate: "",
    pickUpTime: "",
    dropOffDate: "",
    dropOffTime: "",
    carId: "",
    status: "",
    userId: "",
  })

  const validationSchema = Yup.object({
    pickUpLocation: Yup.string().required("Enter the pick up place"),
    dropOffLocation: Yup.string().required("Enter the drop off place"),
    pickUpDate: Yup.string().required("Enter the pick up date"),
    pickUpTime: Yup.string().required("Enter the pick up time"),
    dropOffDate: Yup.string().required("Enter the drop off date"),
    dropOffTime: Yup.string().required("Enter the drop off time"),
    carId: Yup.number().required("Select a car"),
    status: Yup.string().required("Select a status"),
  });

  const onSubmit = async (values) => {

    const dto = {
      pickUpTime: combineDateAndTime(values.pickUpDate, values.pickUpTime),
      dropOffTime: combineDateAndTime(values.dropOffDate, values.dropOffTime),
      pickUpLocation: values.pickUpLocation,
      dropOffLocation: values.dropOffLocation,
      status: values.status
    }

    setSaving(true);
    try {
        await updateReservationById(values.carId, reservationId, dto);
        toast("Reservation updated", "success");
    } catch (err) {
        toast(err.response.data.message, "error");
    }
    finally{
      setSaving(false);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
    enableReinitialize: true
  });


  const loadData = async() => { 
    try {
      const respRes = await getReservationById(reservationId);
      const respVeh = await getVehicles();

      const dto = { 
        ...respRes.data,  
        pickUpDate: getDate(respRes.data.pickUpTime),
        pickUpTime: getTime(respRes.data.pickUpTime),
        dropOffDate: getDate(respRes.data.dropOffTime),
        dropOffTime: getTime(respRes.data.dropOffTime),
        carId: respRes.data.car.id
      };

      setInitialValues(dto);
      setVehicles(respVeh.data);

    } catch (err) {
      console.log(err)
    }
    finally{
      setLoading(false);
    }

  }


  const removeReservation = async () => {
    setDeleting(true);
    try {
      await deleteReservationById(reservationId);
      toast("Reservation was deleted", "success");
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
          removeReservation();
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
      <Row>
        <Form.Group as={Col} md={6} lg={4} className="mb-3">
          <Form.Label>Pick-Up Location</Form.Label>
          <Form.Control
            type="text"
            {...formik.getFieldProps("pickUpLocation")}
            isValid={formik.touched.pickUpLocation && !formik.errors.pickUpLocation}
            isInvalid={formik.touched.pickUpLocation && !!formik.errors.pickUpLocation}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.pickUpLocation}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md={6} lg={4} className="mb-3">
          <Form.Label>Drop-off Location</Form.Label>
          <Form.Control
            type="text"
            {...formik.getFieldProps("dropOffLocation")}
            isValid={formik.touched.dropOffLocation && !formik.errors.dropOffLocation}
            isInvalid={formik.touched.dropOffLocation && !!formik.errors.dropOffLocation}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.dropOffLocation}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md={6} lg={4} className="mb-3">
          <Form.Label>Pick Up Time</Form.Label>
          <InputGroup className="mb-3">
            <Form.Control
              type="date"
              {...formik.getFieldProps("pickUpDate")}
              isValid={formik.touched.pickUpDate && !formik.errors.pickUpDate}
              isInvalid={formik.touched.pickUpDate && !!formik.errors.pickUpDate}
              />
            <Form.Control
              type="time"
              {...formik.getFieldProps("pickUpTime")}
              isValid={formik.touched.pickUpTime && !formik.errors.pickUpTime}
              isInvalid={formik.touched.pickUpTime && !!formik.errors.pickUpTime}
            />
          </InputGroup>
          <Form.Control.Feedback type="invalid">
            {formik.errors.pickUpDate || formik.errors.pickUpTime}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md={6} lg={4} className="mb-3">
          <Form.Label>Drop Off Time</Form.Label>
          <InputGroup className="mb-3">
            <Form.Control
              type="date"
              {...formik.getFieldProps("dropOffDate")}
              isValid={formik.touched.dropOffDate && !formik.errors.dropOffDate}
              isInvalid={formik.touched.dropOffDate && !!formik.errors.dropOffDate}
            />
            <Form.Control
              type="time"
              {...formik.getFieldProps("dropOffTime")}
              isValid={formik.touched.dropOffTime && !formik.errors.dropOffTime}
              isInvalid={formik.touched.dropOffTime && !!formik.errors.dropOffTime}
            />
          </InputGroup>
          <Form.Control.Feedback>
            {formik.errors.dropOffDate || formik.errors.dropOffTime}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md={6} lg={4} className="mb-3">
          <Form.Label>Vehicle</Form.Label>
          <Form.Select
            {...formik.getFieldProps("carId")}
            isValid={formik.touched.carId && !formik.errors.carId}
            isInvalid={formik.touched.carId && !!formik.errors.carId}
          >
            {vehicles.map(vehicle => <option value={vehicle.id} key={vehicle.id}>{vehicle.model}</option>)}
            
           
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            {formik.errors.carId}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md={6} lg={4} className="mb-3">
          <Form.Label>Status</Form.Label>
          <Form.Select
            {...formik.getFieldProps("status")}
            isValid={formik.touched.status && !formik.errors.status}
            isInvalid={formik.touched.status && !!formik.errors.status}
          >
          {statusData.map(status => <option value={status} key={status}>{status}</option>)}

          </Form.Select>
          <Form.Control.Feedback type="invalid">
            {formik.errors.status}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md={6} lg={4} className="mb-3">
          <Form.Label>Customer</Form.Label>
          <div>
            <Link to={`/admin/users/${formik.values.userId}`}>
              Go to customer
            </Link>
          </div>
        </Form.Group>
      </Row>

      <div className="text-end">
        <ButtonGroup aria-label="Basic example">
          <Button variant="primary" type="submit" disabled={!(formik.dirty && formik.isValid) || saving}>
            {saving && <Spinner animation="border" size="sm" />} Save
          </Button>
          <Button
            variant="secondary"
            type="button"
            onClick={() => navigate(-1)}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            type="button"
            disabled={deleting}
            onClick={handleDelete}
          >
            {deleting && <Spinner animation="border" size="sm" />} Delete
          </Button>
        </ButtonGroup>
      </div>
    </Form>
  );
};

export default AdminReservationEdit;
