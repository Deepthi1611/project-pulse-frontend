import React,{useState} from 'react'
import {useForm} from 'react-hook-form'
import axios from 'axios'
import {useNavigate,useLocation} from 'react-router-dom'
const ResetPassword = () => {
    let navigate=useNavigate();
    let {state}=useLocation();
    //console.log("state in reset password",state)
    let {register,handleSubmit,reset,formState:{errors}}=useForm()
     //state for error
    let [error,setError]=useState()
    //state for response error
    let [responseError,setResponseError]=useState("")
    const onSubmit=async(resetObj)=>{
      reset()
      console.log("resetObject:",resetObj)
        try{
          //make http request
            let res=await axios.put(`http://localhost:4000/user-api/reset-password/email/${state.email}`,resetObj)
            console.log("",res);
            if(res.status===200)
            {
              navigate('/login')
              setError("")
              setResponseError("")
            }
        }
        catch(err){
              console.log("err is:",err)
              setError("")
              setResponseError(err.response.data.message)
        }
    }
  return (
    <div>
    <p className='text-center display-6 fw-bold' style={{color:"#6C63FF"}}>Reset password</p>
    <hr></hr>
    {
      responseError? <p className='text-danger fs-3 text-center fw-bold'>{responseError}</p>:error && <p className='text-danger fs-3 text-center'>{error}</p>}
    <div className='container bg-white mx-auto mt-5'>
     <form onSubmit={handleSubmit(onSubmit)} className="p-5 bg-light">
      {/* otp */}
     <div className='mb-4  fw-semibold'>
          <label htmlFor='otp' className='form-label'> OTP </label>
          <input type="number" {...register("otp", {required:"* otp required"})} name="otp" id="otp" className='form-control' placeholder="Enter OTP"></input>
          {/* validation error msg */}
          {errors.otp && <p className="text-danger"><strong>{errors.otp?.message}</strong></p>}
     </div>
     <div className='mb-4  fw-semibold'>
          <label htmlFor='password' className='form-label'> New password </label>
          <input type="password" {...register("password", {required:"* password required"})} name="password" id="password" className='form-control' placeholder="Enter Password"></input>
          {/* validation error msg */}
          {errors.password && <p className="text-danger"><strong>{errors.password?.message}</strong></p>}
     </div>
     <div className='text-center'>
        <button type="submit" className='btn btn-success rounded'>Reset Password</button>
     </div>
     </form>
     </div>
    </div>
  )
}
export default ResetPassword