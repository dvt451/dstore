import React from 'react'
import { PiPhoneCall } from "react-icons/pi";

export default function Contacts() {
  return (
    <div className='phone-widget'>
      <PiPhoneCall />
      <div className="phone-widget__content">
        <p>Need help? Call us:</p>
        <a href="tel:+118002123434">+1 1800 212 3434</a>
      </div>
    </div>
  )
}
