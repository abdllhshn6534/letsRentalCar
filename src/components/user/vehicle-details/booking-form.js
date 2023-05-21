import React, { useState } from "react";
import {
  Alert,
  Button,
  ButtonGroup,
  FloatingLabel,
  Form,
  FormCheck,
  InputGroup,
  Spinner,
} from "react-bootstrap";
import SectionHeader from "../common/section-header/section-header";
import * as Yup from "yup";
import { useFormik } from "formik";
import InputMask from "react-input-mask-next";
import { useAppSelector } from "../../../store/hooks";
import {
  checkDates,
  checkExpireDate,
  combineDateAndTime,
  getCurrentDate,
} from "../../../helpers/functions/date-time";
import { createReservation, isVehicleAvailable } from "../../../api/reservation-service";
import { toast } from "../../../helpers/functions/swal";
import { useNavigate } from "react-router-dom";

const BookingForm = () => {
  const { isUserLogin } = useAppSelector((state) => state.auth);
  const { vehicle } = useAppSelector((state) => state.reservation);
  const [loading, setLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [vehicleAvailable, setVehicleAvailable] = useState(false);
  const navigate = useNavigate();

  const initialValues = {
    pickUpLocation: "",
    dropOffLocation: "",
    pickUpDate: "",
    pickUpTime: "",
    dropOffDate: "",
    dropOffTime: "",
    cardNo: "",
    nameOnCard: "",
    expireDate: "",
    cvc: "",
    contract: false,
  };

  const validationSchema = Yup.object({
    pickUpLocation: Yup.string().required("Enter a pick-up location"),
    dropOffLocation: Yup.string().required("Enter a drop-off location"),
    pickUpDate: Yup.string().required("Select a pick-up date"),
    pickUpTime: Yup.string().required("Select a pick-up time"),
    dropOffDate: Yup.string().required("Select a drop-off date"),
    dropOffTime: Yup.string().required("Select a drop-off time"),
    cardNo: Yup.string().required("Please enter the card number"),
    nameOnCard: Yup.string().required("Please enter the name on the card"),
    expireDate: Yup.string()
      .required("Please enter the expire date")
      .test("month_check", "Enter a valid expire date (MM/YY)", (val) =>
        checkExpireDate(val)
      ),
    cvc: Yup.number()
      .typeError("Must be number")
      .required()
      .min(1)
      .max(999, "Please enter CVC"),
    contract: Yup.boolean().oneOf(
      [true],
      "Please read the contract and check the box"
    ),
  });

  const onSubmit = async (values) => {
    const { pickUpDate, pickUpTime, dropOffDate, dropOffTime, pickUpLocation, dropOffLocation  } = values;

    const dto = {
      pickUpTime: combineDateAndTime(pickUpDate, pickUpTime),
      dropOffTime: combineDateAndTime(dropOffDate, dropOffTime),
      pickUpLocation,
      dropOffLocation
    }


    setLoading(true);
    try{
      await createReservation(vehicle.id, dto);
      toast("Reservation created", "success");
      formik.resetForm();
      navigate("/user/reservations");
    }
    catch(err){
      toast(err.response.data.message, "error")
    }
    finally{
      setLoading(false);
    }

  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const isInvalid = (field) => {
    return formik.touched[field] && formik.errors[field];
  };

  const isValid = (field) => {
    return formik.touched[field] && !formik.errors[field];
  };

  const handleAvailability = async () => {
    const { pickUpDate, pickUpTime, dropOffDate, dropOffTime } = formik.values;

    const dto = {
      carId: vehicle.id,
      pickUpDateTime: combineDateAndTime(pickUpDate, pickUpTime),
      dropOffDateTime: combineDateAndTime(dropOffDate, dropOffTime),
    };

    setLoading(true);
    try {
      if (!checkDates(formik.values))
        throw new Error(
          "Drop-off date should be at least 1 hour later from pick-up date"
        );

      const resp = await isVehicleAvailable(dto);
      const { available, totalPrice } = resp.data;
      setTotalPrice(totalPrice);
      setVehicleAvailable(available);

      if (!available) {
        throw new Error(
          "The car you selected is not available. Please select different date"
        );
      }
    } catch (err) {
      toast(err.message || err.response.data.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SectionHeader title="Booking Form" />

      {!isUserLogin && (
        <Alert>Please login first to check the car is available.</Alert>
      )}

      <Form noValidate onSubmit={formik.handleSubmit}>
        <fieldset disabled={!isUserLogin || vehicleAvailable}>
          <FloatingLabel label="Pick-up location" className="mb-3">
            <Form.Control
              type="text"
              placeholder="Pick-up location"
              {...formik.getFieldProps("pickUpLocation")}
              isInvalid={isInvalid("pickUpLocation")}
              isValid={isValid("pickUpLocation")}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.pickUpLocation}
            </Form.Control.Feedback>
          </FloatingLabel>

          <FloatingLabel label="Drop-off location" className="mb-3">
            <Form.Control
              type="text"
              placeholder="Drop-off location"
              {...formik.getFieldProps("dropOffLocation")}
              isInvalid={isInvalid("dropOffLocation")}
              isValid={isValid("dropOffLocation")}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.dropOffLocation}
            </Form.Control.Feedback>
          </FloatingLabel>

          <InputGroup className="mb-3">
            <FloatingLabel label="Pick-up date">
              <Form.Control
                type="date"
                placeholder="Pick-up date"
                min={getCurrentDate()}
                {...formik.getFieldProps("pickUpDate")}
                isInvalid={isInvalid("pickUpDate")}
                isValid={isValid("pickUpDate")}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.pickUpDate}
              </Form.Control.Feedback>
            </FloatingLabel>

            <FloatingLabel label="Time">
              <Form.Control
                type="time"
                step={900}
                min="07:00"
                max="23:00"
                placeholder="Time"
                {...formik.getFieldProps("pickUpTime")}
                isInvalid={isInvalid("pickUpTime")}
                isValid={isValid("pickUpTime")}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.pickUpTime}
              </Form.Control.Feedback>
            </FloatingLabel>
          </InputGroup>

          <InputGroup className="mb-3">
            <FloatingLabel label="Drop-off date">
              <Form.Control
                type="date"
                min={formik.values.pickUpDate}
                placeholder="Drop-off date"
                {...formik.getFieldProps("dropOffDate")}
                isInvalid={isInvalid("dropOffDate")}
                isValid={isValid("dropOffDate")}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.dropOffDate}
              </Form.Control.Feedback>
            </FloatingLabel>

            <FloatingLabel label="Time">
              <Form.Control
                type="time"
                placeholder="Time"
                {...formik.getFieldProps("dropOffTime")}
                isInvalid={isInvalid("dropOffTime")}
                isValid={isValid("dropOffTime")}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.dropOffTime}
              </Form.Control.Feedback>
            </FloatingLabel>
          </InputGroup>

          <Button
            variant="secondary"
            type="button"
            className={`w-100 ${vehicleAvailable ? "d-none" : "d-block"}`}
            onClick={handleAvailability}
            disabled={loading}
          >
            {loading && <Spinner animation="border" size="sm" />} Check
            Availability
          </Button>
        </fieldset>

        <fieldset className={`mt-5 ${vehicleAvailable ? "d-block" : "d-none"}`}>
          <Alert variant="info">
            <h2>Total Price: ${totalPrice}</h2>
          </Alert>
          <FloatingLabel label="Card number" className="mb-3">
            <Form.Control
              type="text"
              placeholder="Card number"
              as={InputMask}
              mask="9999-9999-9999-9999"
              {...formik.getFieldProps("cardNo")}
              isInvalid={isInvalid("cardNo")}
              isValid={isValid("cardNo")}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.cardNo}
            </Form.Control.Feedback>
          </FloatingLabel>

          <FloatingLabel label="Name on card" className="mb-3">
            <Form.Control
              type="text"
              placeholder="Name on card"
              {...formik.getFieldProps("nameOnCard")}
              isInvalid={isInvalid("nameOnCard")}
              isValid={isValid("nameOnCard")}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.nameOnCard}
            </Form.Control.Feedback>
          </FloatingLabel>

          <InputGroup>
            <FloatingLabel label="Expire date" className="mb-3">
              <Form.Control
                type="text"
                as={InputMask}
                mask="99/99"
                placeholder="Expire date"
                {...formik.getFieldProps("expireDate")}
                isInvalid={isInvalid("expireDate")}
                isValid={isValid("expireDate")}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.expireDate}
              </Form.Control.Feedback>
            </FloatingLabel>

            <FloatingLabel label="CVC" className="mb-3">
              <Form.Control
                type="text"
                as={InputMask}
                mask="999"
                placeholder="CVC"
                {...formik.getFieldProps("cvc")}
                isInvalid={isInvalid("cvc")}
                isValid={isValid("cvc")}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.cvc}
              </Form.Control.Feedback>
            </FloatingLabel>
          </InputGroup>

          <FormCheck
            type="checkbox"
            id="contract"
            label="I have read and aggree the contract"
            {...formik.getFieldProps("contract")}
            isInvalid={isInvalid("contract")}
            isValid={isValid("contract")}
          />

          <ButtonGroup className="mt-3 w-100">
            <Button
              variant="secondary"
              type="button"
              disabled={loading}
              onClick={() => setVehicleAvailable(false)}
            >
              Edit
            </Button>
            <Button variant="primary" type="submit" disabled={loading}>
              {loading && <Spinner animation="border" size="sm" />} Book Now
            </Button>
          </ButtonGroup>
        </fieldset>
      </Form>
    </>
  );
};

export default BookingForm;
