import React,{useState} from 'react'
import {useForm} from 'react-hook-form'
import axios from 'axios'

const RaiseResourcerequest = () => {

  let {register,handleSubmit,formState:{errors},reset}=useForm()

  //get token from storage
  let token=sessionStorage.getItem("token")

  //state for error
  let [error,setError]=useState()

  //state for response error
  let [responseError,setResponseError]=useState("")

  //state for response
  let [response, setResponse]=useState("")

  //on submission of form
  const onSubmit=async(request)=>{
    reset()
    try{
      //make http request
    let res=await axios.post("http://localhost:4000/gdoHead-api/resourcing-request",request,{
      headers:{Authorization: `Bearer ${token}`}
    })
    console.log(res)
      if(res.status===201){
        setResponse(res.data.message)
        setError("")
        setResponseError("")
      }
    }catch(err){
    console.log(err)
    setError(err.response.data.message)
    }
  }

  return (
    <div className='container-fluid'>
      <p className='display-6 text-center fw-bold register-text'>Raise a Resourcing Request</p>
      <hr></hr>
      {/* error */}
      {
        responseError ? <p className='text-danger fs-4 text-center fw-bold'>{responseError}</p> :  error && <p className='text-danger fs-4 text-center fw-bold'>{error}</p> 
      }
      {
        response && <p className='text-success fs-4 text-center fw-bold'>{response}</p>
      }
      <form onSubmit={handleSubmit(onSubmit)} className="p-5 mt-5 mb-5 bg-light">

        {/* request description */}
        <div className="mb-4">
          <label htmlFor="requestDesc" className="form-label fw-bold">Request Description</label>
          <textarea rows="4" {...register('requestDesc', {required:"*request description required"})} className="form-control"></textarea>
          {/* validation error msg */}
          {errors.requestDes && <p className="text-danger"><strong>{errors.requestDesc?.message}</strong></p>}
        </div>

        {/* GDO Head email */}
        <div className="mb-4">
          <label htmlFor="GdoEmail" className="form-label fw-bold">GDO Head Email</label>
          <input type="text" {...register('GdoEmail', {required:"*GDO Head email required"})} className="form-control"></input>
          {/* validation error msg */}
          {errors.GdoEmail && <p className="text-danger"><strong>{errors.GdoEmail?.message}</strong></p>}
        </div>

        {/* project id */}
        <div className="mb-4">
          <label htmlFor="projectId" className="form-label fw-bold">Project Id</label>
          <input type="number" {...register('projectId', {required:"*project Id required"})} className="form-control"></input>
          {/* validation error msg */}
          {errors.projectId && <p className="text-danger"><strong>{errors.projectId?.message}</strong></p>}
        </div>

        {/* submit button */}
        <div>
          <button type="submit" className="btn d-block mx-auto register-submit text-white fw-bold">submit</button>
        </div>
      </form>
    </div>
  )
}

export default RaiseResourcerequest