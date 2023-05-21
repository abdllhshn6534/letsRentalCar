import React, { useEffect, useState } from "react";
import { Button, Card, Carousel, Col, Container, Row } from "react-bootstrap";
import Loading from "../../common/loading/loading";
import { Link } from "react-router-dom";
import { getReservationsByPage } from "../../../api/reservation-service";
import { getVehiclesByPage } from "../../../api/vehicle-service";
import { getUsersByPage } from "../../../api/user-service";
import "./dashbord.scss";
import { settings } from "../../../helpers/settings";
const AdminDashboard = () => {
  const [users, setUsers] = useState(0);
  const [vehicles, setVehicles] = useState(0);
  const [reservations, setReservations] = useState(0);
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([]);
  const loadData = async (page) => {
    try {
      const respUser = await getUsersByPage(page, 100);
      const respRes = await getReservationsByPage(page, 100);
      const respVeh = await getVehiclesByPage(page, 100);
      const { content, totalElements } = respVeh.data;
      setImages(content);
      setVehicles(totalElements);
      setReservations(respRes.data.totalElements);
      setUsers(respUser.data.totalElements);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadData(0);
  }, []);
  return loading ? (
    <Loading />
  ) : (
    <Container className="dashboard">
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>{reservations} Reservations</Card.Title>
              <Button as={Link} to={"/admin/reservations"}>
                Get Reservations
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>{users} Users</Card.Title>
              <Button as={Link} to={"/admin/users"}>
                Get Users
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>{vehicles} Vehicles</Card.Title>
              <Button as={Link} to={"/admin/vehicles"}>
                Get Vehicles
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Carousel>
        {images.map((car) => (
          <Carousel.Item key={car.id}>
            <h2>{car.model}</h2>
            <Link to={`/admin/vehicles/${car.id}`}>
            <img
              src={`${settings.apiURL}/files/display/${car.image[0]}`}
              width="500"
              alt=""
            />
            </Link>
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  );
};
export default AdminDashboard;
