import React from 'react'
import Spacer from '../../components/common/spacer/spacer'
import BestOffers from '../../components/user/about/best-offers/best-offers'
import Team from '../../components/user/about/team/team'
import WhatWeDo from '../../components/user/about/what-we-do/what-we-do'
import WhoWeAre from '../../components/user/about/who-we-are/who-we-are'
import PageHeader from '../../components/user/common/page-header/page-header'
import UserTemplate from '../../templates/user-template'

const AboutPage = () => {
  return (
    <UserTemplate>
      <PageHeader title="About Us"/>
      <Spacer/>
      <WhoWeAre/>
      <Spacer/>
      <BestOffers/>
      <Spacer/>
      <Team/>
      <Spacer/>
      <WhatWeDo/>
    </UserTemplate>
  )
}

export default AboutPage