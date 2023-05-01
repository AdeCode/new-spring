import React from 'react'
import {Outlet} from 'react-router-dom'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

function Layout() {
  return (
    <div className='bg-[#EFFCF3]'>
        <Navbar/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default Layout


