import React, {useEffect, useState} from 'react'
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

  //state for gdo heads
  let [gdos,setGdos]=useState([])

  //state for project managers
  let [managers,setManagers]=useState([])

  // console.log(response)

  //get all gdos and project managers
  const getUsers=async()=>{
    let res=await axios.get("http://localhost:4000/user-api/managers")
    // console.log(res)
    setGdos(res.data.payload.gdos)
    setManagers(res.data.payload.projectManagers)
  }

  //useEffect
  useEffect(()=>{
    getUsers()
  },[])

  //on submission of form
  const onSubmit=async(projectObj)=>{
    reset()
    // console.log(projectObj)
    if(projectObj.endDate===""){
      delete projectObj["endDate"]
    }
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
          <select {...register('statusOfProject', {required:"* status of project required"})} defaultValue="--status of project--" className='form-control'>
            <option disabled>--status of project--</option>
            <option value="sales">sales</option>
            <option value="pre-sales">pre-sales</option>
            <option value="client sign off">client sign off</option>
            <option value="In progress">In progress</option>
            <option value="completed">completed</option>
            <option value="paused">paused</option>
            <option value="deferred">deferred</option>
          </select>
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

        {/* end date - optional */}
        <div className='mb-4'>
          <label htmlFor='endDate' className='from-label fw-bold'>End date</label>
          <input type='date' {...register('endDate')} className='form-control'></input>
        </div>

        {/* overall project fitness indicator */}
        <div className="mb-4">
          <label htmlFor="overallProjectFitnessIndicator" className="form-label fw-bold">overall project fitness indicator</label>
          <select {...register('overallProjectFitnessIndicator', {required:"* overall project fitness indicator required"})} defaultValue="--overall project fitness indicator--" className='form-control'>
            <option disabled value="--overall project fitness indicator--">--overall project fitness indicator--</option>
            <option value="red">red</option>
            <option value="amber">amber</option>
            <option value="green">green</option>
          </select>
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
          <select {...register('typeOfProject', {required:"* type of project required"})} defaultValue="--type of project--" className='form-control'>
            <option disabled value="--type of project--">--type of project--</option>
            <option value="Development">Development</option>
            <option value="Devops">Devops</option>
            <option value="Test Automation">Test Automation</option>
            <option value="Performance Testing">Performance Testing</option>
            <option value="Security">Security</option>
            <option value="Sustenance Engineering">Sustenance Engineering</option>
            <option value="Mobility">Mobility</option>
            <option value="Storage">Storage</option>
          </select>
          {/* validation error msg */}
          {errors.typeOfPoject && <p className="text-danger"><strong>{errors.typeOfPoject?.message}</strong></p>}
        </div>

        {/* gdo head email */}
        <div className="mb-4">
          <label htmlFor="gdoHeadEmail" className="form-label fw-bold">GDO Head</label>
          <select {...register('gdoHeadEmail', {required:"*GDO head email required"})} className="form-control" defaultValue="--gdo head--">
            <option value="--gdo head--" disabled>--GDO Head--</option>
            {
              gdos.map((gdo,index)=><option key={index} value={gdo.email}>{gdo.username}</option>)
            }
          </select>
          {/* validation error msg */}
          {errors.gdoHeadEmail && <p className="text-danger"><strong>{errors.gdoHeadEmail?.message}</strong></p>}
        </div>

        {/* project manager email */}
        <div className="mb-4">
          <label htmlFor="projectManagerEmail" className="form-label fw-bold">Project Manager</label>
          <select {...register('projectManagerEmail', {required:"*project manager email required"})} className="form-control" defaultValue="--project manager--">
            <option value="--project manager--" disabled>--project manager--</option>
            {
              managers.map((manager,index)=><option value={manager.email}>{manager.username}</option>)
            }
          </select>
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