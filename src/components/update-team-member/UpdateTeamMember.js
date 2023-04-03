import React,{useEffect,useState} from 'react'
import { Modal, Button } from 'react-bootstrap'
import {useForm} from "react-hook-form"
import axios from 'axios'

const UpdateTeamMember = ({showUpdate, setShowUpdate, member}) => {

  // console.log("team member",member)

  let {register,formState:{errors},setValue,getValues}=useForm()

  //function to close
  const closeUpdate=()=>setShowUpdate(false)

  //get token from session storage
  let token=sessionStorage.getItem("token")

  //state for error
  let [error,setError]=useState("")

  //state for response
  let [response,setResponse]=useState("")

  //set values for modal
  useEffect(()=>{
    setValue("empId",member.empId)
    setValue("empName",member.empName)
    setValue("role",member.role)
    setValue("startDate",member.startDate.slice(0,10))
    setValue("status",member.status)
    setValue("billingStatus",member.billingStatus)
    setValue("exposedToCustomer",member.exposedToCustomer)
    setValue("allocationType",member.allocationType)
  },[])

  //on saving
  const saveMember=async()=>{
    //get values from edited form
    let modified=getValues()
    //add project id to object
    modified.projectId=member.projectId
    //close modal
    closeUpdate()
    console.log("modified",modified)
    //make http put request
    try{
      let res=await axios.put(`http://localhost:4000/gdoHead-api/update-team`,modified,{
        headers:{Authorization: `Bearer ${token}`}
      })
      console.log("response in update team",res)
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
          {/* edit team member details details */}
          <form className="p-5 mt-5 mb-5 bg-light" style={{width:"90%"}}>
        {/* empId */}
        <div className="mb-4">
          <label htmlFor="empId" className="form-label fw-bold">Employee Id</label>
          <input type="number" {...register('empId', {required:"*employee id required"})} className="form-control" disabled></input>
          {/* validation error msg */}
          {errors.empId && <p className="text-danger"><strong>{errors.empId?.message}</strong></p>}
        </div>

        {/* employee name */}
        <div className="mb-4">
          <label htmlFor="empName" className="form-label fw-bold">Employee name</label>
          <input type="text" {...register('empName', {required:"*employee name required"})} className="form-control" disabled></input>
          {/* validation error msg */}
          {errors.empName && <p className="text-danger"><strong>{errors.empName?.message}</strong></p>}
        </div>

        {/* role */}
        <div className="mb-4">
          <label htmlFor="role" className="form-label fw-bold">Role</label>
          <input type="text" {...register('role', {required:"*role required"})} className="form-control"></input>
          {/* validation error msg */}
          {errors.role && <p className="text-danger"><strong>{errors.role?.message}</strong></p>}
        </div>

        {/* start date */}
        <div className="mb-4">
          <label htmlFor="startDate" className="form-label fw-bold">Start Date</label>
          <input type="date" {...register('startDate', {required:"*start date required"})} className="form-control" ></input>
          {/* validation error msg */}
          {errors.startDate && <p className="text-danger"><strong>{errors.startDate?.message}</strong></p>}
        </div>

        {/* status */}
        <div className="mb-4">
          <label htmlFor="status" className="form-label fw-bold">status</label>
          <input type="text" {...register('status', {required:"*status required"})} className="form-control"></input>
          {/* validation error msg */}
          {errors.status && <p className="text-danger"><strong>{errors.status?.overallProjectFitnessIndicator}</strong></p>}
        </div>

        {/* billing status */}
        <div className="mb-4">
          <label htmlFor="billingStatus" className="form-label fw-bold">billing status</label>
          <input type="text" {...register('billingStatus', {required:"*billing status required"})} className="form-control"></input>
          {/* validation error msg */}
          {errors.billingStatus && <p className="text-danger"><strong>{errors.billingStatus?.message}</strong></p>}
        </div>

        {/* exposed to customer */}
        <div className="mb-4">
          <label htmlFor="exposedToCustomer" className="form-label fw-bold">Exposed To Customer</label>
          <input type="text" {...register('exposedToCustomer', {required:"*exposed to customer required"})} className="form-control"></input>
          {/* validation error msg */}
          {errors.exposedToCustomer && <p className="text-danger"><strong>{errors.exposedToCustomer?.message}</strong></p>}
        </div>

        {/* allocation type */}
        <div className="mb-4">
          <label htmlFor="allocationType" className="form-label fw-bold">Allocation Type</label>
          <input type="text" {...register('allocationType', {required:"*allocation type required"})} className="form-control"></input>
          {/* validation error msg */}
          {errors.allocationType && <p className="text-danger"><strong>{errors.allocationType?.message}</strong></p>}
        </div>
      </form>
        </Modal.Body>
        <Modal.Footer >
          <Button variant="success" className='mx-auto' onClick={saveMember}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default UpdateTeamMember