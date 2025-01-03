import React from 'react'
import { Link } from 'react-router-dom'

export default function Logo({nameClass}) {
  return (
    <Link to={'/'} className={`${nameClass? nameClass : ''}logo`}>DStore</Link>
  )
}
