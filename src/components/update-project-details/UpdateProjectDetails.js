import React, { useEffect, useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import {useForm} from "react-hook-form"
import axios from 'axios'

const UpdateProjectDetails = ({showUpdate,setShowUpdate,project}) => {

  let {register,formState:{errors},setValue,getValues}=useForm()

  //function to close modal
  const closeUpdate=()=>setShowUpdate(false)

  //get token from session storage
  let token=sessionStorage.getItem("token")

  //state for error
  let [error,setError]=useState("")

  //state fro response
  let [response,setResponse]=useState("")

  //set values for modal
  useEffect(()=>{
    setValue("projectName",project.projectName)
    setValue("client",project.client)
    setValue("clientAccountManager",project.clientAccountManager)
    setValue("statusOfProject",project.statusOfProject)
    setValue("startDate",project.startDate.slice(0,10))
    setValue("overallProjectFitnessIndicator",project.overallProjectFitnessIndicator)
    setValue("gdoHeadEmail",project.gdoHeadEmail)
    setValue("projectManagerEmail",project.projectManagerEmail)
  },[])

  //save project
  const saveProject=async()=>{
    //get values from edited form
    let modified=getValues()
    //close modal
    closeUpdate()
    console.log(modified)
    //add Id from state to modified user
    modified.projectId=project.projectId
    //make http put request
    try{
      let res=await axios.put(`http://localhost:4000/admin-api/projectId/${project.projectId}`,modified,{
        headers:{Authorization: `Bearer ${token}`}
      })
      console.log(res)
      setResponse(res.data.message)
      setError("")      
    }
    catch(err){
      console.log(err)
      setError(err.response.data.message)
      setResponse("")
    }
  }

  return (
    <div>
      {/* error */}
    {
      error ? <p className='text-center fw-bold text-danger fs-3'>{error}</p> : response && <p className='text-center text-success fw-bold fs-3'>{response}</p> 
    }
      {/* Modal */}
     <Modal show={showUpdate} onHide={closeUpdate} backdrop="static" className='bg-light' size='lg'>
        <Modal.Header closeButton>
          <Modal.Title style={{color:"#6C63FF"}}>Update project details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* edit project details */}
          <form className="p-5 mt-5 mb-5 bg-light" style={{width:"90%"}}>

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
    </form>
        </Modal.Body>
        <Modal.Footer >
          <Button variant="success" className='mx-auto' onClick={saveProject}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default UpdateProjectDetails