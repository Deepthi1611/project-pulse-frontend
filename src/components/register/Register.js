import React from 'react'
import {useForm} from 'react-hook-form'
import './Register.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import registerImage from "../../images/register.svg"

const Register = () => {
  
  let {register,handleSubmit,formState:{errors},reset}=useForm()
  let navigate=useNavigate()

  //state for error
  let [error,setError]=useState()

  //state for response error
  let [responseError,setResponseError]=useState("")

  //on submission of form
  const onSubmit=async(userObj)=>{
    // console.log(userObj)
    try{
    // console.log(userObj)
    reset()
    //make http request
    let res=await axios.post("http://localhost:4000/user-api/register",userObj);
    if(res.status===201){
    navigate("/login")
    setError("")
    setResponseError("")
    }
  }catch(err){
    //if error occurs
    console.log("error",err)
    setError(err.message)
    setResponseError(err.response.data.message)
  }
  }


  return (
    <div className='container-fluid'>
      <div className='row g-3'>
        <div className='col-md-5 pt-5 mt-5'>
          <img src={registerImage} alt="registration" height="100%" width="100%" style={{borderRadius:"0"}}></img>
        </div>
      <div className='col-md-7'>
      <p className='display-6 text-center fw-bold register-text'>Register</p>
      <hr></hr>
      {/* error */}
      {
        responseError ? <p className='text-danger fw-bold fs-4 text-center'>{responseError}</p> :  error && <p className='text-danger fs-4 text-center fw-bold'>{error}</p> 
      }
      <form onSubmit={handleSubmit(onSubmit)} className="p-5 mt-5 bg-light">

        {/* email */}
        <div className="mb-4">
          <label htmlFor="email" className="form-label fw-bold">Email</label>
          <input type="email" {...register('email', {required:"*email required"})} className="form-control"></input>
          {/* validation error msg */}
          {errors.email && <p className="text-danger"><strong>{errors.email?.message}</strong></p>}
        </div>

        {/* username */}
        <div className="mb-4">
          <label htmlFor="username" className="form-label fw-bold">Username</label>
          <input type="text" {...register('username', {required:"*Username required"})} className="form-control"></input>
          {/* validation error msg */}
          {errors.username && <p className="text-danger"><strong>{errors.username?.message}</strong></p>}
        </div>

        {/* password */}
        <div className="mb-4">
          <label htmlFor="password" className="form-label fw-bold">Password:</label>
          <input type="password" {...register('password', {required:"*Password required"})} className="form-control"></input>
          {/* validation error msg */}
          {errors.password && <p className="text-danger"><strong>{errors.password?.message}</strong></p>}
        </div>

        {/* submit button */}
        <div>
          <button type="submit" className="btn d-block mx-auto register-submit text-white fw-bold">submit &rarr; </button>
        </div>
      </form>
    </div>
    </div>
    </div>
  )
}

export default Register