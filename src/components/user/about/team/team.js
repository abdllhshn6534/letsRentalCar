import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./team.scss";
import team from "./team.json";
import SectionHeader from "../../common/section-header/section-header";
import Spacer from "../../../common/spacer/spacer";
import TeamMember from "./team-member";

const Team = () => {
  return (
    <div className="team">
      <SectionHeader
        title1="Executive"
        title2="Team"
        desc="We are here to meet your transportation needs by suggesting vip cars which are eligible to your business."
      />
      <Spacer height={50}/>
      <Container>
        <Row className="g-5">
          {team.map((member) => (
            <Col md={4} key={member.id}>
              <TeamMember {...member} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Team;
