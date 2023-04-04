import React,{useState} from 'react'
import {useForm} from 'react-hook-form'
import axios from 'axios'
import { useSelector } from 'react-redux'

const ProjectUpdates = () => {
  let {register,handleSubmit,formState:{errors},reset}=useForm()

  //get token from storage
  let token=sessionStorage.getItem("token")

  //get state from store
  let {userObj}=useSelector(state=>state.login)

  //state for error
  let [error,setError]=useState()

  //state for response error
  let [responseError,setResponseError]=useState("")

  //state for response
  let [response, setResponse]=useState("")

  //on submission of form
  const onSubmit=async(updateObj)=>{
    reset()
    //add project manager email 
    updateObj.projectManager=userObj.email
    //add date 
    updateObj.date=new Date()
    try{
      //make http request
    let res=await axios.post("http://localhost:4000/project-manager-api/project-updates",updateObj,{
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
      <p className='display-6 text-center fw-bold register-text'>Create Project Update</p>
      <hr></hr>
      {/* error */}
      {
        responseError ? <p className='text-danger fs-4 text-center fw-bold'>{responseError}</p> :  error && <p className='text-danger fs-4 text-center fw-bold'>{error}</p> 
      }
      {
        response && <p className='text-success fs-4 text-center fw-bold'>{response}</p>
      }
      <form onSubmit={handleSubmit(onSubmit)} className="p-5 mt-5 mb-5 bg-light">

        {/* project id */}
        <div className="mb-4">
          <label htmlFor="projectId" className="form-label fw-bold">Project Id</label>
          <input type="number" {...register('projectId', {required:"*project Id required"})} className="form-control"></input>
          {/* validation error msg */}
          {errors.projectId && <p className="text-danger"><strong>{errors.projectId?.message}</strong></p>}
        </div>

        {/* project manager */}
        {/* <div className="mb-4">
          <label htmlFor="projectManager" className="form-label fw-bold">project manager email</label>
          <input type="email" {...register('projectManager', {required:"*project manager email required required"})} className="form-control"></input>
          {/* validation error msg 
          {errors.projectManager && <p className="text-danger"><strong>{errors.projectManager?.message}</strong></p>}
        </div> */}

        {/* date */}
        {/* <div className="mb-4">
          <label htmlFor="date" className="form-label fw-bold">Date</label>
          <input type="date" {...register('date', {required:"*date required"})} className="form-control"></input>
          {/* validation error msg 
          {errors.date && <p className="text-danger"><strong>{errors.date?.message}</strong></p>}
        </div> */}

        {/* status update */}
        <div className="mb-4">
          <label htmlFor="statusUpdate" className="form-label fw-bold">Status Update</label>
          <textarea rows="4" {...register('statusUpdate', {required:"*status update required"})} className="form-control"></textarea>
          {/* validation error msg */}
          {errors.statusUpdate && <p className="text-danger"><strong>{errors.statusUpdate?.message}</strong></p>}
        </div>

        {/* schedule status */}
        <div className="mb-4">
          <label htmlFor="scheduleStatus" className="form-label fw-bold">Schedule status</label>
          <select {...register('scheduleStatus', {required:"* schedule status required"})} defaultValue="--schedule status--" className='form-control'>
            <option value="--schedule status--" disabled>--schedule status--</option>
            <option value="red">red</option>
            <option value="amber">amber</option>
            <option value="green">green</option>
          </select>
          {/* validation error msg */}
          {errors.scheduleStatus && <p className="text-danger"><strong>{errors.scheduleStatus?.overallProjectFitnessIndicator}</strong></p>}
        </div>

        {/* resourcing status*/}
        <div className="mb-4">
          <label htmlFor="resourcingStatus" className="form-label fw-bold">Resourcing status</label>
          <select {...register('resourcingStatus', {required:"* resourcing status required"})} defaultValue="--resourcing status--" className='form-control'>
            <option value="--resourcing status--" disabled>--resourcing status--</option>
            <option value="red">red</option>
            <option value="amber">amber</option>
            <option value="green">green</option>
          </select>
          {/* validation error msg */}
          {errors.resourcingStatus && <p className="text-danger"><strong>{errors.resourcingStatus?.message}</strong></p>}
        </div>

        {/* quality status */}
        <div className="mb-4">
          <label htmlFor="qualityStatus" className="form-label fw-bold">Quality status</label>
          <select {...register('qualityStatus', {required:"*quality status required"})} className="form-control" defaultValue="--quality status--">
          <option value="--quality status--" disabled>--quality status--</option>
            <option value="red">red</option>
            <option value="amber">amber</option>
            <option value="green">green</option>
          </select>
          {/* validation error msg */}
          {errors.qualityStatus && <p className="text-danger"><strong>{errors.qualityStatus?.message}</strong></p>}
        </div>

        {/*client inputs */}
        <div className="mb-4">
          <label htmlFor="clientInputs" className="form-label fw-bold">Client Inputs</label>
          <select {...register('clientInputs', {required:"*client inputs required"})} className="form-control" defaultValue="--client inputs--">
            <option value="--client inputs">--client inputs--</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
          {/* validation error msg */}
          {errors.clientInputs && <p className="text-danger"><strong>{errors.clientInputs?.message}</strong></p>}
        </div>

        {/* submit button */}
        <div>
          <button type="submit" className="btn d-block mx-auto register-submit text-white fw-bold">submit</button>
        </div>
      </form>
    </div>
  )
}

export default ProjectUpdates