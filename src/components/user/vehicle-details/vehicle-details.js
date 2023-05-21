import React, { useEffect, useState } from "react";
import { Badge, Container, Row, Col, Card } from "react-bootstrap";
import { RiGasStationFill, RiCarLine, RiCaravanLine } from "react-icons/ri";
import { IoIosSnow } from "react-icons/io";
import { MdOutlineAirlineSeatReclineExtra } from "react-icons/md";
import { GiJoystick, GiCalendarHalfYear } from "react-icons/gi";
import Spacer from "../../common/spacer/spacer";
import "./vehicle-details.scss";
import BookingForm from "./booking-form";
import { useParams } from "react-router-dom";
import { getVehicle } from "../../../api/vehicle-service";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setVehicle } from "../../../store/slices/reservation-slice";
import Loading from "../../common/loading/loading";
import { settings } from "../../../helpers/settings";

const VehicleDetails = () => {
  const [loading, setLoading] = useState(true);
  const { vehicleId } = useParams();
  const dispatch = useAppDispatch();
  const vehicle = useAppSelector((state) => state.reservation.vehicle);

  const loadData = async () => {
    try {
      const resp = await getVehicle(vehicleId);
      dispatch(setVehicle(resp.data));
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line
  }, []);

  return (
    <Container className="vehicle-details">
      {loading ? (
        <Loading />
      ) : (
        <Row className="g-5">
          <Col lg={8}>
            <div className="title">
              <h1>{vehicle.model}</h1>
              <h3>
                <Badge bg="primary">${vehicle.pricePerHour}/hour</Badge>
              </h3>
            </div>

            <Card>
              <img
                src={`${settings.apiURL}/files/display/${vehicle.image}`}
                className="img-fluid"
                alt=""
              />
            </Card>
            <Spacer height={30} />

            <h2>Property Highlights</h2>
            <ul>
              <li>
                <RiCarLine /> Model: {vehicle.model}
              </li>
              <li>
                <RiCarLine /> Doors: {vehicle.doors}
              </li>
              <li>
                <MdOutlineAirlineSeatReclineExtra /> Seats: {vehicle.seats}
              </li>
              <li>
                <RiCaravanLine /> Luggage: {vehicle.luggage}
              </li>
              <li>
                <GiJoystick /> Transmission: {vehicle.transmission}
              </li>
              {vehicle.airConditioning && (
                <li>
                  <IoIosSnow /> Air conditioning
                </li>
              )}

              <li>
                <RiGasStationFill /> Fuel Type: {vehicle.fuelType}
              </li>
              <li>
                <GiCalendarHalfYear /> Age: {vehicle.age}
              </li>
            </ul>
          </Col>
          <Col lg={4}>
            <BookingForm />
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default VehicleDetails;
