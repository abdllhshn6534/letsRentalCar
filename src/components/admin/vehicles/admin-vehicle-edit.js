import React, { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Form,
  Button,
  Row,
  Col,
  ButtonGroup,
  Spinner,
  Badge,
  Alert,
} from "react-bootstrap";
import "./admin-vehicle.scss";
import { useNavigate, useParams } from "react-router-dom";
import {
  deleteVehicle,
  deleteVehicleImage,
  getVehicle,
  updateVehicle,
  uploadVehicleImage,
} from "../../../api/vehicle-service";
import { question, toast } from "../../../helpers/functions/swal";
import Loading from "../../common/loading/loading";
import { settings } from "../../../helpers/settings";

let imageChanged = false;

const AdminVehicleEdit = () => {
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const navigate = useNavigate();
  const [imageSrc, setImageSrc] = useState("");
  const { vehicleId } = useParams();
  const fileImageRef = useRef();

  const [initialValues, setInitialValues] = useState({
    model: "",
    doors: "",
    seats: "",
    luggage: "",
    transmission: "",
    airConditioning: "",
    fuelType: "",
    age: "",
    pricePerHour: "",
    image: "",
  });

  const validationSchema = Yup.object({
    model: Yup.string().required("Please enter the model"),
    doors: Yup.number().required("Please enter the number of doors"),
    seats: Yup.number().required("Please enter the number of seats"),
    luggage: Yup.number().required("Please enter the luggage capacity"),
    transmission: Yup.string().required("Please enter type of transmission"),
    airConditioning: Yup.string().required(
      "Please enter whether air conditioning exists"
    ),
    fuelType: Yup.string().required("Please enter type of fuel"),
    age: Yup.number().required("Please enter age of car"),
    pricePerHour: Yup.number().required("Please enter price per hour"),
    image: Yup.mixed().required("Please select an image"),
  });

  const loadData = async () => {
    try {
      const resp = await getVehicle(vehicleId);
      setInitialValues(resp.data);
      setImageSrc(`${settings.apiURL}/files/display/${resp.data.image[0]}`);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (values) => {
    setUpdating(true);

    try {
      let imageId = values.image[0];
      if (imageChanged) {

        // Mevcut resmi siliyoruz
        await deleteVehicleImage(imageId);

        const newImageFile = fileImageRef.current.files[0];
        const formData = new FormData();
        formData.append("file", newImageFile);

        const resp = await uploadVehicleImage(formData);
        imageId = resp.data.imageId;
        imageChanged = false;
      }

      delete values.image;

      await updateVehicle(vehicleId, imageId, values);
      toast("Vehicle was updated", "success");
      navigate(-1);
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

  const handleChangeImage = (e) => {
    const file = fileImageRef.current.files[0];
    if (!file) return;

    //Görüntüyü image içinde göstermek için:
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImageSrc(reader.result);
    };

    imageChanged = true;
  };

  const removeVehicle = async () => {
    setDeleting(true);
    try {
      await deleteVehicle(vehicleId);
      toast("Vehicle was deleted", "success");
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
          removeVehicle();
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
        <Row className="gy-5">
          <Col xl={3} className="image-area">
            <img src={imageSrc} className="img-fluid" alt="" />
            <Form.Group controlId="fileSelect">
              <Form.Control
                type="file"
                name="image"
                accept=".jpg,.jpeg,.png"
                onChange={handleChangeImage}
                className="d-none"
                ref={fileImageRef}
              />
              <Form.Label>Select Image</Form.Label>
            </Form.Group>
            <Badge bg="danger" className="image-error">
              {formik.errors.image}
            </Badge>
          </Col>
          <Col xl={9}>
            <Row className="row-cols-1 row-cols-md-2 row-cols-lg-3">
              <Form.Group as={Col} className="mb-3">
                <Form.Label>Model</Form.Label>
                <Form.Control
                  type="text"
                  {...formik.getFieldProps("model")}
                  isValid={formik.touched.model && !formik.errors.model}
                  isInvalid={formik.touched.model && !!formik.errors.model}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.model}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} className="mb-3">
                <Form.Label>Doors</Form.Label>
                <Form.Control
                  type="number"
                  {...formik.getFieldProps("doors")}
                  isValid={formik.touched.doors && !formik.errors.doors}
                  isInvalid={formik.touched.doors && !!formik.errors.doors}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.doors}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} className="mb-3">
                <Form.Label>Seats</Form.Label>
                <Form.Control
                  type="number"
                  {...formik.getFieldProps("seats")}
                  isValid={formik.touched.seats && !formik.errors.seats}
                  isInvalid={formik.touched.seats && !!formik.errors.seats}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.seats}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} className="mb-3">
                <Form.Label>Luggage</Form.Label>
                <Form.Control
                  type="number"
                  {...formik.getFieldProps("luggage")}
                  isValid={formik.touched.luggage && !formik.errors.luggage}
                  isInvalid={formik.touched.luggage && !!formik.errors.luggage}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.luggage}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} className="mb-3">
                <Form.Label>Transmission</Form.Label>
                <Form.Select
                  {...formik.getFieldProps("transmission")}
                  isValid={
                    formik.touched.transmission && !formik.errors.transmission
                  }
                  isInvalid={
                    formik.touched.transmission && !!formik.errors.transmission
                  }
                >
                  <option>Select</option>
                  <option value="Automatic">Automatic</option>
                  <option value="Manuel">Manuel</option>
                  <option value="Tiptronic">Tiptronic</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {formik.errors.transmission}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} className="mb-3">
                <Form.Label>Air Conditioning</Form.Label>
                <Form.Select
                  {...formik.getFieldProps("airConditioning")}
                  isValid={
                    formik.touched.airConditioning &&
                    !formik.errors.airConditioning
                  }
                  isInvalid={
                    formik.touched.airConditioning &&
                    !!formik.errors.airConditioning
                  }
                >
                  <option>Select</option>
                  <option value={true}>Yes</option>
                  <option value={false}>No</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {formik.errors.airConditioning}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} className="mb-3">
                <Form.Label>Fuel Type</Form.Label>
                <Form.Select
                  {...formik.getFieldProps("fuelType")}
                  isValid={formik.touched.fuelType && !formik.errors.fuelType}
                  isInvalid={
                    formik.touched.fuelType && !!formik.errors.fuelType
                  }
                >
                  <option>Select</option>
                  <option value="Electricity">Electricity</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="Gasoline">Gasoline</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Hydrogen">Hydrogen</option>
                  <option value="LPG">LPG</option>
                  <option value="CNG">CNG</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {formik.errors.fuelType}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} className="mb-3">
                <Form.Label>Age</Form.Label>
                <Form.Control
                  type="number"
                  {...formik.getFieldProps("age")}
                  isValid={formik.touched.age && !formik.errors.age}
                  isInvalid={formik.touched.age && !!formik.errors.age}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.age}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} className="mb-3">
                <Form.Label>Price Per Hour</Form.Label>
                <Form.Control
                  type="number"
                  {...formik.getFieldProps("pricePerHour")}
                  isValid={
                    formik.touched.pricePerHour && !formik.errors.pricePerHour
                  }
                  isInvalid={
                    formik.touched.pricePerHour && !!formik.errors.pricePerHour
                  }
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.pricePerHour}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
          </Col>
        </Row>
      </fieldset>
      {formik.values.builtIn && (
        <Alert variant="warning" className="mt-3">
          Built-in vehicles cannot be deleted or updated
        </Alert>
      )}
      <div className="text-end">
        <ButtonGroup>
          <Button variant="secondary" onClick={() => navigate(-1)}>
            Cancel
          </Button>
          {!formik.values.builtIn && (
            <>
              <Button variant="primary" type="submit" disabled={!(formik.isValid) || updating}>
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

export default AdminVehicleEdit;
