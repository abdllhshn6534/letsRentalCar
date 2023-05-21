import React from 'react'
import Spacer from '../../components/common/spacer/spacer'
import PageHeader from '../../components/user/common/page-header/page-header'
import VehicleDetails from '../../components/user/vehicle-details/vehicle-details'
import { useAppSelector } from '../../store/hooks'
import UserTemplate from '../../templates/user-template'

const VehicleDetailsPage = () => {
  const vehicle = useAppSelector(state=>state.reservation.vehicle);

  return (
    <UserTemplate>
      <PageHeader title={vehicle?.model}/>
      <Spacer/>
      <VehicleDetails/>
      <Spacer/>
    </UserTemplate>
  )
}

export default VehicleDetailsPage