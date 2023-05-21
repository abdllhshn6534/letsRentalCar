import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import SectionHeader from "../../common/section-header/section-header";
import carImage from "../../../../assets/img/about/best-offer.png";
import OfferItem from "./offer-item";
import "./best-offers.scss";

import {
  FaCarAlt,
  FaBriefcase,
  FaCarSide,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { RiCarWashingFill } from "react-icons/ri";
import { MdOutlineSupportAgent } from "react-icons/md";

const BestOffers = () => {
  return (
    <div className="best-offers">
      <SectionHeader title1="Get Our" title2="Best Offers" />

      <div className="offers">
        <Container>
          <Row className="gy-5">
            <Col lg={4}>
            <OfferItem
                icon={<FaCarAlt />}
                title="Featured Luxury Cars"
                desc="Our featured luxury cars are meticulously maintained and equipped with the latest features and technologies to ensure a smooth and seamless ride. We pride ourselves on offering only the finest and most prestigious vehicles that are guaranteed to exceed your expectations."
              />
              <OfferItem
                icon={<FaBriefcase />}
                title="Insurance Included"
                desc="Our insurance package includes comprehensive coverage, collision damage waiver, and liability insurance, providing complete protection and coverage for any unforeseen events. With our insurance included, you can enjoy your rental car without any additional worries or hassles."
              />
              <OfferItem
                icon={<FaCarSide />}
                title="Available 12.640 Cars"
                desc="Whether you're looking for a small, fuel-efficient car for city driving, a spacious family sedan for long road trips, or an SUV for off-road adventures, we have the perfect car for you. Our fleet includes models from some of the world's leading automakers, such as Toyota, Nissan, Ford, and Chevrolet, ensuring that you get the best quality and reliability."
              />
            </Col>
            <Col lg={4}>
              <img src={carImage} alt="" className="img-fluid" />
            </Col>
            <Col lg={4}>
              <OfferItem
                icon={<FaMapMarkerAlt />}
                title="Any Locations Rent"
                direction="right"
                desc="With our Any Locations Rent service, you can choose the location that's most convenient for you, whether it's at the airport, downtown, or in the suburbs. We have a network of locations across the country, so you can easily find a rental location near you, no matter where you are."
              />
              <OfferItem
                icon={<RiCarWashingFill />}
                title="Cleaning Included"
                direction="right"
                desc="We take great pride in maintaining our fleet of rental cars to the highest standards of cleanliness and hygiene. Our professional cleaning team thoroughly cleans and sanitizes each vehicle, paying close attention to high-touch surfaces such as steering wheels, door handles, and dashboard controls."
              />
              <OfferItem
                icon={<MdOutlineSupportAgent />}
                title="Online 24/7 Support"
                direction="right"
                desc="Our Online 24/7 Support team is available around the clock to help you with any questions or concerns you may have about your rental. Whether you need help with a reservation, have questions about rental policies, or need assistance with your rental car, our knowledgeable and friendly team is always here to help."
              />
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default BestOffers;
