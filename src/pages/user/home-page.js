import React from 'react'
import Spacer from '../../components/common/spacer/spacer'
import BestOffers from '../../components/user/about/best-offers/best-offers'
import Team from '../../components/user/about/team/team'
import WhatWeDo from '../../components/user/about/what-we-do/what-we-do'
import PopularCars from '../../components/user/home/popular-cars/popular-cars'
import Slider from '../../components/user/home/slider/slider'
import UserTemplate from '../../templates/user-template'

const HomePage = () => {
  return (
    <UserTemplate>
      <Slider/>
      <Spacer/>
      <PopularCars/>
      <Spacer/>
      <BestOffers/>
      <Spacer/>
      <Team/>
      <Spacer/>
      <WhatWeDo/>
    </UserTemplate>
  )
}

export default HomePage