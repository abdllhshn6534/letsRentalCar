import React from 'react'
import { Spinner } from 'react-bootstrap'
import logo from "../../assets/img/logo/logo.png";
import "./loading-page.scss";

const LoadingPage = () => {
  return (
    <div className="loading-page">
        <Spinner animation="border" variant="primary"/>
        <img src={logo} alt="Loading..."/>
    </div>
  )
}

export default LoadingPage