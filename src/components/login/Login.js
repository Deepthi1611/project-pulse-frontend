import React from 'react'
import { useForm } from 'react-hook-form'
import {userLogin} from "../../slices/loginSlice"
import { useDispatch, useSelector } from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import loginImage from "../../images/login2.svg"
import './Login.css'

const Login = () => {
  let {register,handleSubmit,formState:{errors}}=useForm()

  let navigate=useNavigate()

  //get state from store
  let {userObj,errorMessage}=useSelector((state)=>state.login)

  console.log(userObj);

  let dispatch=useDispatch()

  useEffect(()=>{
    //naviage to dashboard based on role of user logged in
    if(userObj.role==="super admin"){
      navigate("/super-admin-dashboard")
    }
    if(userObj.role==="Admin"){
      navigate("/admin-dashboard")
    }
    if(userObj.role==="project manager"){
      navigate("/project-manager-dashboard")
    }
    if(userObj.role==="GDO head"){
      navigate("/gdo-head-dashboard")
    }
  })

  //on submission of form
  const onSubmit=(userCredentials)=>{
    console.log(userCredentials)
    let actionObj=userLogin(userCredentials)
    dispatch(actionObj)
  }

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-5 pt-5 mt-5'>
          <img src={loginImage} alt="login" height="80%" width="90%" style={{borderRadius:"0"}}></img>
        </div>
      <div className='col-md-7'>
      <p className='text-seondary display-6 text-center fw-bold login-text'>Login</p>
      <hr></hr>

      {/* error message */}
      {
        errorMessage && <p className='text-danger text-center fw-bold fs-4'>{errorMessage}</p>
      }

      <form onSubmit={handleSubmit(onSubmit)} className="p-5 mt-5 bg-light">
      
      {/* email */}
      <div className="mb-4">
        <label htmlFor="email" className="form-label fw-bold">Email</label>
        <input type="email" {...register('email', {required:"*email required"})} className="form-control"></input>
        {/* validation error msg */}
        {errors.email && <p className="text-danger"><strong>{errors.email?.message}</strong></p>}
      </div>

      {/* password */}
      <div className="mb-4">
          <label htmlFor="password" className="form-label fw-bold">Password:</label>
          <input type="password" {...register('password', {required:"*Password required"})} className="form-control"></input>
          {/* validation error msg */}
          {errors.password && <p className="text-danger"><strong>{errors.password?.message}</strong></p>}
        </div>
      
        {/* login button */}
        <div className='mb-4'>
          <button type="submit" className="btn fw-bold d-block mx-auto login-submit text-white">Login &rarr;</button>
        </div>

        {/* forget password */}
        <div className='text-center mt-5'>
          <NavLink to="/forgot-password">Forget password?</NavLink>
        </div>
      </form>
      </div>
    </div>
    </div>
  )
}

export default Login