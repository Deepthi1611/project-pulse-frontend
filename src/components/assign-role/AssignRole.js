import React, {useState} from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios' 
import { useLocation } from 'react-router-dom'


const AssignRole = () => {

  let {register,handleSubmit,formState:{errors}}=useForm()

  //state for error
  let [error,setError]=useState("")

  //state fro response
  let [response,setResponse]=useState("")

  //get token from session storage
  let token=sessionStorage.getItem("token")

  //get email
  let email=useLocation()
  console.log("email from state",email.state)


  //on submission of form
  const onSubmit=async(userObj)=>{
    userObj.email=email.state
    console.log("userObj",userObj)
    try{
      //make request
      let res=await axios.put("http://localhost:4000/super-admin-api/user/role",userObj,{
        headers:{Authorization: `Bearer ${token}`}
      })
      console.log(res)
      setResponse(res.data.message)
      setError("")
    }
    catch(err){
      //if error occurs
      console.log(err)
      setError(err.response.data.message)
      setResponse("")
    }
  }

  return (
    <div className='container mt-5'>
    <p className='text-secondary display-6 text-center fw-bold'>Assign Role</p>
    <hr></hr>
    {
      error ? <p className='text-center fw-bold text-danger fs-3'>{error}</p> : response && <p className='text-center text-success fw-bold fs-3'>{response}</p> 
    }
    <form onSubmit={handleSubmit(onSubmit)} className="p-5 mt-5 bg-light">

     {/* email */}
    <div className='mb-4'>
    <label htmlFor="email" className="form-label fw-bold text-left">Email</label>
    <input type="email" {...register('email')} className="form-control" value={email.state} disabled></input>
    </div>

    {/* role */}
    <label for="role" className='form-label fw-bold text-left'>Choose a role:</label>
    <select name="role" id="role" className='form-control' {...register('role',{required:"*role required"})} defaultValue="--roles--">
    <option disabled>--roles--</option>
    <option value="Admin">Admin</option>
    <option value="GDO head">GDO head</option>
    <option value="project manager">project manager</option>
    <option value="hr manager">Hr manager</option>
   {/* validation error msg  */}
    {errors.role && <p className="text-danger"><strong>{errors.role?.message}</strong></p>}
    </select>

     {/* submit button */}
     <div>
        <button type="submit" className="btn btn-success d-block mx-auto">Assign</button>
      </div>
    </form>
    </div>
  )
}

export default AssignRole