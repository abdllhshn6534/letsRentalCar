import React from 'react'
import {MdOutlineHeadphones, MdOutlinePhonelinkRing, MdLocationOn, MdEmail} from "react-icons/md";
import { settings } from '../../../../helpers/settings';


const ContactInfo = () => {
  return (
    <ul className="contact-info">
        <li><a href={`tel:${settings.phone1}`}><MdOutlineHeadphones/> {settings.phone1}</a></li>
        <li><a href={`tel:${settings.phone2}`}><MdOutlinePhonelinkRing/> {settings.phone2}</a></li>
        <li><a href={settings.mapUrl} target="_blank" rel="noreferrer"><MdLocationOn/> {settings.address}</a></li>
        <li><a href={`mailto:${settings.email}`}><MdEmail/> {settings.email}</a></li>
    </ul>
  )
}

export default ContactInfo