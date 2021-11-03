import React from 'react'
import NavBar from './NavBar/NavBar'
import Board from './Board/Board'

export default function SidebarNav() {
  return (
    <nav className='sidebar'>
      <NavBar/>
      <Board />
    </nav>
  )
}
