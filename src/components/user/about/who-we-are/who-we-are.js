import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import imageWhoWeAre from "../../../../assets/img/about/who-we-are.jpg";
import "./who-we-are.scss";
import { GiPayMoney, GiTakeMyMoney, GiVacuumCleaner } from "react-icons/gi";

const WhoWeAre = () => {
  return (
    <Container className="who-we-are">
      <Row className="gy-5">
        <Col lg={4}>
          <img src={imageWhoWeAre} alt="" className="img-fluid" />
        </Col>
        <Col lg={8} className="content">
          <div>
            <h2>Who We Are</h2>
            <p>
              Whether you're flying into undefined for a short break or a longer
              stay, you can take the stress out of your onward journey by
              renting a car. We make it easy to find the best deal. Simply tell
              us your travel dates and we'll show you which cars are available
              with the best prices.
            </p>

            <p>
              You can get more out of your trip if you rent a car. You don't
              need to rely on public transport to and from undefined, instead
              you can step off the plane and drive straight to your destination.
              No more struggling to squeeze your
            </p>

            <p>
              Looking for a small or medium economy car rental or something a
              little larger to fit all the family? We have a great range of new
              and comfortable rental cars to choose from. Browse our fleet range
              now and rent a car online today.
            </p>
          </div>

          <Row className="props">
            <Col md={4}>
              <GiPayMoney />
              <h4>Price Equalization</h4>
              <p>
                If you find the same service cheaper, we will provide the
                service at the price you found
              </p>
            </Col>
            <Col md={4}>
              <GiTakeMyMoney /> <h4>No Extra Price</h4>
              <p>
                You will not encounter surprise payments. You know exactly what
                you're paying for.
              </p>
            </Col>
            <Col md={4}>
              <GiVacuumCleaner />
              <h4>Hygienic Cars</h4>
              <p>
                We disinfect our vehicles before giving them to you to keep you
                safe in the driver's seat.
              </p>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default WhoWeAre;
