import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

function Root() {
  return (
    <>
      <Navbar />
      <div className='main'>
        <Outlet />
      </div>
      <Footer />
    </>
  )
}

export default Root
