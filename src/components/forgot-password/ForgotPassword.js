import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import {useForm} from 'react-hook-form'
import axios from 'axios'
import forgetImage from "../../images/forget.svg"


const ForgotPassword = () => {
  let {handleSubmit,register}=useForm()
  let navigate=useNavigate()
  //state for error
  let [error,setError]=useState()
  let [forget,setforget]=useState({})
  //state for response error
  let [responseError,setResponseError]=useState("")
  const navigatetoreset=()=>{
    // console.log("forgot in navigate:",forgotObject);
    navigate("/reset-password",{state:forget})
  }
    // console.log("forgot:",forget)
    //on submission of the form
    const onSubmit=async(forgotObj)=>{
        setforget({...forget,...forgotObj})
        // console.log("forgot in submit:",forget)
        try{
          //make http request
            let res=await axios.post("http://localhost:4000/user-api/forget-password",forgotObj)
            //console.log(forgotObj)
            console.log(res.data)
            setError("")
            setResponseError("")
        }
        catch(err){
            console.log("err is :",err)
            setError("")
            setResponseError(err.message)
        }
     }
  return (
    <div className='container-fluid'>
      <div className='row'>
      <div className='col-5 pt-5 mt-5'>
          <img src={forgetImage} alt="login" height="80%" width="90%" style={{borderRadius:"0"}}></img>
        </div>
    <div className='col-7'>
     <p className='text-center display-6 fw-bold' style={{color:"#6C63FF"}}>Forget password</p>
     <hr></hr>
    <div className='container bg-white mx-auto mt-5'>

     <form onSubmit={handleSubmit(onSubmit)} className="p-5 bg-light">
      {/* email */}
     <div className='mb-4  fw-semibold'>
        <label htmlFor='email' className='form-label'> Email </label>
        <input type="email" {...register("email")}name="email" id="email" className='form-control' placeholder="Enter Email"></input>
     </div>
     {/* otp */}
     <div className='text-center '>
        <button className='btn btn-success rounded fme-5' type="submit">Get OTP</button>
        <button className='btn btn-primary rounded ms-5' onClick={navigatetoreset}>Reset Password</button>
     </div>
     </form>
     </div>
    </div>
    </div>
    </div>
  )
}
export default ForgotPassword