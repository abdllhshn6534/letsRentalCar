import React from 'react'
import UserTemplate from '../../templates/user-template'
import PageHeader from "../../components/user/common/page-header/page-header";
import Spacer from "../../components/common/spacer/spacer";
import Reservations from '../../components/user/reservations/reservations';

const ReservationsPage = () => {
  return (
    <UserTemplate>
      <PageHeader title="Reservations" />
      <Spacer />
      <Reservations />
      <Spacer />
    </UserTemplate>
  )
}

export default ReservationsPage