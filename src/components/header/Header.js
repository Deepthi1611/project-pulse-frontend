import React from 'react'
import logo from "../../images/download.jpeg"
import { NavLink } from 'react-router-dom'
import './Header.css'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { clearState } from '../../slices/loginSlice'

const Header = () => {
  //get state from store
  let {userObj,status}=useSelector(state=>state.login)
  let dispatch=useDispatch()

  //logout
  const logOut=()=>{
    //remove token from session storage
    sessionStorage.removeItem("token")
    //clear the state
    dispatch(clearState())
  }

  return (
    <div>
      {
        status==="success" ? (
        <ul className='nav justify-content-end bg-dark pe-5 header d-flex justify-content-between'>

        <div className='ms-5 d-flex'>
          {/* logo */}
        <li className='nav-item'>
          <img src={logo} alt='react logo' height="35px" width="35px" className='mt-1 me-5'></img>
        </li>
        {/* title */}
        <li className='nav-item mt-2'>
          <p className='text-white fw-bold'>WAL PROJECT PULSE</p>
        </li>
        </div>

        <div className='d-flex'>
        {/* user email */}
        <li className='nav-item pt-2'>
          <p className='text-white fw-bold '>{userObj.email}</p>
        </li>
        {/* Link for logout */}
        <li className='nav-item'>
          <NavLink className="nav-link text-white" to="/login" onClick={logOut}>
          logout
          </NavLink>
        </li>
        </div>
        </ul>
        ) : (
        <ul className='nav justify-content-end bg-dark pe-5 d-flex justify-content-between'>

        <div className='ms-5 d-flex'>
        {/* logo */}
        <li className='nav-item'>
          <img src={logo} alt='react logo' height="35px" width="35px" className='mt-1 me-5'></img>
        </li>
        {/* title */}
        <li className='nav-item mt-2'>
          <p className='text-white fw-bold'>WAL PROJECT PULSE</p>
        </li>
        </div>

        <div className='d-flex'>
        {/* Link for home */}
        <li className='nav-item header-list'>
          <NavLink className="nav-link nav-link text-white me-5" to="/">
          Home
          </NavLink>
        </li>
        {/* Link for register */}
        <li className='nav-item header-list'>
          <NavLink className="nav-link text-white me-5" to="/register">
          Register
          </NavLink>
        </li>
        {/* Link for login */}
        <li className='nav-item header-list'>
          <NavLink className="nav-link text-white" to="/login">
          Login
          </NavLink>
        </li>
        </div>
      </ul>
        )
      }
    </div>
  )
}

export default Header