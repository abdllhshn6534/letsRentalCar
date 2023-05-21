import React, { useEffect } from "react";
import { useState } from "react";
import { Accordion, Button, Col, Container, Row, Table } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../common/loading/loading";
import { GiCheckMark } from "react-icons/gi";
import { BsArrowBarLeft } from "react-icons/bs";
import { getReservation } from "../../../api/reservation-service";
import { settings } from "../../../helpers/settings";
import { formatDateTime } from "../../../helpers/functions/date-time";

const ReservationDetails = () => {
  const [loading, setLoading] = useState(true);
  const [reservation, setReservation] = useState({});
  const navigate = useNavigate();
  const { reservationId } = useParams();

  const loadData = async () => {
    try {
      const resp = await getReservation(reservationId);
      setReservation(resp.data);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Container>
      {loading ? (
        <Loading />
      ) : (
        <Row>
          <Col md={6}>
            <h2 className="text-center">{reservation.car.model}</h2>
            <img
              src={`${settings.apiURL}/files/display/${reservation.car.image}`}
              alt=""
              className="img-fluid"
            />
            <Button variant="primary" onClick={() => navigate(-1)}>
              <BsArrowBarLeft /> Back to reservations
            </Button>
          </Col>
          <Col md={6}>
            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="0">
                <Accordion.Header>Reservation Details</Accordion.Header>
                <Accordion.Body>
                  <Table striped bordered hover>
                    <tbody>
                      <tr>
                        <td>Pick-up Location</td>
                        <td>{reservation.pickUpLocation}</td>
                      </tr>
                      <tr>
                        <td>Drop-off Location</td>
                        <td>{reservation.dropOffLocation}</td>
                      </tr>
                      <tr>
                        <td>Pick-up Time</td>
                        <td>{formatDateTime(reservation.pickUpTime)}</td>
                      </tr>
                      <tr>
                        <td>Drop-off Time</td>
                        <td>{formatDateTime(reservation.dropOffTime)}</td>
                      </tr>
                      <tr>
                        <td>Status</td>
                        <td>{reservation.status}</td>
                      </tr>
                      <tr>
                        <td>Price</td>
                        <td>${reservation.totalPrice}</td>
                      </tr>
                    </tbody>
                  </Table>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>Vehicle Details</Accordion.Header>
                <Accordion.Body>
                  <Table striped bordered hover>
                    <tbody>
                      <tr>
                        <td>Model</td>
                        <td>{reservation.car.model}</td>
                      </tr>
                      <tr>
                        <td>Doors</td>
                        <td>{reservation.car.doors}</td>
                      </tr>
                      <tr>
                        <td>Seats</td>
                        <td>{reservation.car.seats}</td>
                      </tr>
                      <tr>
                        <td>Luggage</td>
                        <td>{reservation.car.luggage} lt</td>
                      </tr>
                      <tr>
                        <td>Transmission</td>
                        <td>{reservation.car.transmission}</td>
                      </tr>
                      {reservation.car.airConditioning && (
                        <tr>
                          <td>Air conditioning</td>
                          <td>
                            <GiCheckMark />
                          </td>
                        </tr>
                      )}

                      <tr>
                        <td>Fuel Type</td>
                        <td>{reservation.car.fuelType}</td>
                      </tr>
                      <tr>
                        <td>Age</td>
                        <td>{reservation.car.age}</td>
                      </tr>
                    </tbody>
                  </Table>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default ReservationDetails;
