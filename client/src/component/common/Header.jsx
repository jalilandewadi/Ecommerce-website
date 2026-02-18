import React from 'react'
import TopBar from '../layout/TopBar'
import Navbar from './Navbar'


const Header = () => {
  return (
    <header className='border border-gray-200'>
        {/* {TopBar} */}
        <TopBar/>
        {/* {Navbar} */}
        <Navbar/>
        {/* {Cart Items} */}
    </header>
  )
}

export default Header
