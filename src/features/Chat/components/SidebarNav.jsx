import React from 'react'
import NavBar from './NavBar/NavBar'
import ConvList from './ConvList/ConvList'

export default function SidebarNav() {
  return (
    <nav className='sidebar'>
      <NavBar/>
      <ConvList />
    </nav>
  )
}
