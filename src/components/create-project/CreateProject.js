import React, {useState} from 'react'
import "./CreateProject.css"
import {useForm} from 'react-hook-form'
import axios from 'axios'

const CreateProject = () => {

  let {register,handleSubmit,formState:{errors},reset}=useForm()

  //get token from storage
  let token=sessionStorage.getItem("token")

  //state for error
  let [error,setError]=useState()

  //state for response error
  let [responseError,setResponseError]=useState("")

  //state for response
  let [response, setResponse]=useState("")

  console.log(response)

  //on submission of form
  const onSubmit=async(projectObj)=>{
    reset()
    // console.log(projectObj)
    try{
      //make request
    let res=await axios.post("http://localhost:4000/admin-api/project",projectObj,{
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
      <p className='display-6 text-center fw-bold register-text'>Create Project</p>
      <hr></hr>
      {
        responseError ? <p className='text-danger fs-2 text-center fw-bold'>{responseError}</p> :  error && <p className='text-danger fs-2 text-center fw-bold'>{error}</p> 
      }
      {
        response && <p className='text-success fs-2 text-center fw-bold'>{response}</p>
      }
      <form onSubmit={handleSubmit(onSubmit)} className="p-5 mt-5 mb-5 bg-light">

        {/* project name */}
        <div className="mb-4">
          <label htmlFor="projectName" className="form-label fw-bold">Project Name</label>
          <input type="text" {...register('projectName', {required:"*project name required"})} className="form-control"></input>
          {/* validation error msg */}
          {errors.projectName && <p className="text-danger"><strong>{errors.projectName?.message}</strong></p>}
        </div>

        {/* client */}
        <div className="mb-4">
          <label htmlFor="client" className="form-label fw-bold">Client</label>
          <input type="text" {...register('client', {required:"*client required"})} className="form-control"></input>
          {/* validation error msg */}
          {errors.client && <p className="text-danger"><strong>{errors.client?.message}</strong></p>}
        </div>

        {/* client account manager */}
        <div className="mb-4">
          <label htmlFor="clientAccountManager" className="form-label fw-bold">Client Account Manager</label>
          <input type="text" {...register('clientAccountManager', {required:"*client account manager required"})} className="form-control"></input>
          {/* validation error msg */}
          {errors.clientAccountManager && <p className="text-danger"><strong>{errors.clientAccountManager?.message}</strong></p>}
        </div>

        {/* status of project */}
        <div className="mb-4">
          <label htmlFor="statusOfProject" className="form-label fw-bold">Status of project</label>
          <input type="text" {...register('statusOfProject', {required:"*status of project required"})} className="form-control"></input>
          {/* validation error msg */}
          {errors.statusOfProject && <p className="text-danger"><strong>{errors.statusOfProject?.message}</strong></p>}
        </div>

        {/* start date */}
        <div className="mb-4">
          <label htmlFor="startDate" className="form-label fw-bold">Start Date</label>
          <input type="date" {...register('startDate', {required:"*start date required"})} className="form-control"></input>
          {/* validation error msg */}
          {errors.startDate && <p className="text-danger"><strong>{errors.startDate?.message}</strong></p>}
        </div>

        {/* overall project fitness indicator */}
        <div className="mb-4">
          <label htmlFor="overallProjectFitnessIndicator" className="form-label fw-bold">overall project fitness indicator</label>
          <input type="text" {...register('overallProjectFitnessIndicator', {required:"*project fitness indicator required"})} className="form-control"></input>
          {/* validation error msg */}
          {errors.overallProjectFitnessIndicator && <p className="text-danger"><strong>{errors.client?.overallProjectFitnessIndicator}</strong></p>}
        </div>

        {/* domain */}
        <div className="mb-4">
          <label htmlFor="domain" className="form-label fw-bold">Domain</label>
          <input type="text" {...register('domain', {required:"*domain required"})} className="form-control"></input>
          {/* validation error msg */}
          {errors.domain && <p className="text-danger"><strong>{errors.domain?.message}</strong></p>}
        </div>

        {/* type of project */}
        <div className="mb-4">
          <label htmlFor="typeOfProject" className="form-label fw-bold">Type of project</label>
          <input type="text" {...register('typeOfProject', {required:"*type of project required"})} className="form-control"></input>
          {/* validation error msg */}
          {errors.typeOfPoject && <p className="text-danger"><strong>{errors.typeOfPoject?.message}</strong></p>}
        </div>

        {/* team size */}
        <div className="mb-4">
          <label htmlFor="teamSize" className="form-label fw-bold">Team Size</label>
          <input type="number" {...register('teamSize', {required:"*team size required"})} className="form-control"></input>
          {/* validation error msg */}
          {errors.teamSize && <p className="text-danger"><strong>{errors.teamSize?.message}</strong></p>}
        </div>

        {/* gdo head email */}
        <div className="mb-4">
          <label htmlFor="gdoHeadEmail" className="form-label fw-bold">GDO Head Email</label>
          <input type="text" {...register('gdoHeadEmail', {required:"*GDO head email required"})} className="form-control"></input>
          {/* validation error msg */}
          {errors.gdoHeadEmail && <p className="text-danger"><strong>{errors.gdoHeadEmail?.message}</strong></p>}
        </div>

        {/* project manager email */}
        <div className="mb-4">
          <label htmlFor="projectManagerEmail" className="form-label fw-bold">Project Manager Email</label>
          <input type="text" {...register('projectManagerEmail', {required:"*project manager email required"})} className="form-control"></input>
          {/* validation error msg */}
          {errors.projectManagerEmail && <p className="text-danger"><strong>{errors.projectManagerEmail?.message}</strong></p>}
        </div>

        {/* submit button */}
        <div>
          <button type="submit" className="btn d-block mx-auto register-submit text-white fw-bold">submit</button>
        </div>
      </form>
    </div>
  )
}

export default CreateProject