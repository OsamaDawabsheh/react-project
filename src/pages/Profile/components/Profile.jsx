import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import * as styles from './Profile.module.css'

function Profile() {
  return (
    <div className='container main'>
          <nav className='navbar navbar-expand-lg justify-content-center'>
              <ul className='navbar-nav d-flex flex-row gap-3 text-dark'>
                  <li className='nav-item'>
                                    <NavLink className={`px-2 py-1 bg-primary nav-link`} to='orders'>orders</NavLink>

                  </li>
                  <li className='nav-item'>
                                    <NavLink className={` px-2 py-1 bg-primary nav-link`} to='information'>information</NavLink>

                  </li>
              </ul>
          </nav>
          
               <Outlet/>
    </div>
  )
}

export default Profile
