import React from 'react'
import { Container } from 'react-bootstrap';
import logo from "../../../../assets/img/logo/logo.png";
import { settings } from '../../../../helpers/settings';
import Menubar from './menubar';
import Topbar from './topbar';
import "./header.scss";

const Header = () => {
  return (
    <Container className="p-0 fixed-top">
       <div className="header">
          <div className="logo">
            <img src={logo} alt={settings.siteName} className="img-fluid"/>
          </div>
          <div className="menus">
            <Topbar/>
            <Menubar/>
          </div>
       </div>
    </Container>
  )
}

export default Header