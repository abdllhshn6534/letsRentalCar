import React from "react";
import { settings } from "../../../helpers/settings";
import { GiJoystick } from "react-icons/gi";
import { RiGasStationFill, RiCarLine } from "react-icons/ri";
import { MdOutlineAirlineSeatReclineExtra } from "react-icons/md";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./vehicle-card.scss";


const VehicleCard = (props) => {
  const { id, image, model, transmission, fuelType, doors, seats } = props;

  return (
    <div className="vehicle-card">
      <div className="image">
        <img
          src={`${settings.apiURL}/files/display/${image}`}
          alt=""
          className="img-fluid"
        />
      </div>
      <h4>{model}</h4>
      <div className="details">
        <div><GiJoystick/> {transmission}</div>
        <div><RiGasStationFill/> {fuelType}</div>
        <div><RiCarLine/> {doors} doors</div>
        <div><MdOutlineAirlineSeatReclineExtra/> {seats} seats</div>
      </div>
      <Button variant="secondary" as={Link} to={`/vehicles/${id}`}>Rent Now</Button>
    </div>
  );
};

export default VehicleCard;
