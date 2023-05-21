import React from 'react'
import Spacer from '../../components/common/spacer/spacer'
import PageHeader from '../../components/user/common/page-header/page-header'
import Vehicles from '../../components/user/vehicles/vehicles'
import UserTemplate from '../../templates/user-template'

const VehiclesPage = () => {
  return (
    <UserTemplate>
      <PageHeader title="Vehicles"/>
      <Spacer/>
      <Vehicles/>
      <Spacer/>
    </UserTemplate>
  )
}

export default VehiclesPage