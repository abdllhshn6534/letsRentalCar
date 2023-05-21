import React from "react";
import UserTemplate from "../../templates/user-template";
import PageHeader from "../../components/user/common/page-header/page-header";
import Spacer from "../../components/common/spacer/spacer";
import ReservationDetails from "../../components/user/reservations/reservation-details";

const ReservationDetailsPage = () => {
  return (
    <UserTemplate>
      <PageHeader title="Reservation Details" />
      <Spacer />
      <ReservationDetails />
      <Spacer />
    </UserTemplate>
  );
};

export default ReservationDetailsPage;
