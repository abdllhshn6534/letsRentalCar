import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { getVehiclesByPage } from "../../../../api/vehicle-service";
import Loading from "../../../common/loading/loading";
import Spacer from "../../../common/spacer/spacer";
import SectionHeader from "../../common/section-header/section-header";
import VehicleCard from "../../vehicles/vehicle-card";
import "./popular-cars.scss";

const PopularCars = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      const resp = await getVehiclesByPage();
      const data = resp.data.content;

      setVehicles(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="popular-cars">
      <SectionHeader
        title1="Popular"
        title2="Cars"
        desc="To contribute to positive change and achieve our sustainability goals with many extraordinary"
      />
      <Spacer />
      <Container>
        <Row className="g-5">
          {loading ? (
            <Loading />
          ) : (
            vehicles &&
            vehicles.map((vehicle) => (
              <Col md={6} lg={4} key={vehicle.id}>
                <VehicleCard {...vehicle} />
              </Col>
            ))
          )}
        </Row>
      </Container>
    </div>
  );
};

export default PopularCars;
