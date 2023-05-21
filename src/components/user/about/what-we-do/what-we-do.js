import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./what-we-do.scss";
import carImage from "../../../../assets/img/about/what-we-do.jpg";
import { MdLocalCarWash, MdCreditScore } from "react-icons/md";
import { TbSteeringWheel } from "react-icons/tb";
import { GiPayMoney, GiTakeMyMoney, GiVacuumCleaner } from "react-icons/gi";

const WhatWeDo = () => {
  return (
    <Container fluid className="what-we-do">
      <Row>
        <Col md={5}>
          <img src={carImage} alt="" className="img-fluid" />
        </Col>
        <Col md={7}>
          <div>
            <h2>What we do?</h2>
            <p>
              Whether you're flying into undefined for a short break or a longer
              stay, you can take the stress out of your onward journey by
              renting a car. We make it easy to find the best deal. Simply tell
              us your travel dates and we'll show you which cars are available
              with the best prices.
            </p>
          </div>

          <Row className="props">
            <Col xl={4} sm={6}>
              <MdLocalCarWash /> <span>Select Car</span>
            </Col>
            <Col xl={4} sm={6}>
              <MdCreditScore /> <span>Pay for it</span>
            </Col>
            <Col xl={4} sm={6}>
              <TbSteeringWheel /> <span>Let's drive</span>
            </Col>
            <Col xl={4} sm={6}>
              <GiPayMoney /> <span>Price equalization</span>
            </Col>
            <Col xl={4} sm={6}>
              <GiTakeMyMoney /> <span>No extra payment</span>
            </Col>
            <Col xl={4} sm={6}>
              <GiVacuumCleaner /> <span>Hygienic Cars</span>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default WhatWeDo;
