import React,{useState} from 'react'
import {useForm} from 'react-hook-form'
import axios from 'axios'

const AddTeamMember = () => {

  let {register,handleSubmit,formState:{errors},reset}=useForm()

  //get token from storage
  let token=sessionStorage.getItem("token")

  //state for error
  let [error,setError]=useState()

  //state for response error
  let [responseError,setResponseError]=useState("")

  //state for response
  let [response, setResponse]=useState("")

  //on submission of the form
  const onSubmit=async(member)=>{
    console.log(member)
    reset()
    try{
      //make request
      let res=await axios.post("http://localhost:4000/gdoHead-api/team",member,{
        headers:{Authorization: `Bearer ${token}`}
      })
      console.log(res)
      if(res.status===201){
        //if there is no error
        setResponse(res.data.message)
        setError("")
        setResponseError("")
      }
    }catch(err){
      //if there is error
    console.log(err)
    setError(err.response.data.message)
    }
  }

  return (
    <div className='container-fluid'>
      <p className='display-6 text-center fw-bold register-text'>Add team member to a project</p>
      <hr></hr>
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
          <input type="number" {...register('projectId', {required:"*project id required"})} className="form-control"></input>
          {/* validation error msg */}
          {errors.projectId && <p className="text-danger"><strong>{errors.projectId?.message}</strong></p>}
        </div>

        {/* empId */}
        <div className="mb-4">
          <label htmlFor="empId" className="form-label fw-bold">Employee Id</label>
          <input type="number" {...register('empId', {required:"*employee id required"})} className="form-control"></input>
          {/* validation error msg */}
          {errors.empId && <p className="text-danger"><strong>{errors.empId?.message}</strong></p>}
        </div>

        {/* employee name */}
        <div className="mb-4">
          <label htmlFor="empName" className="form-label fw-bold">Employee name</label>
          <input type="text" {...register('empName', {required:"*employee name required"})} className="form-control"></input>
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
          <input type="date" {...register('startDate', {required:"*start date required"})} className="form-control"></input>
          {/* validation error msg */}
          {errors.startDate && <p className="text-danger"><strong>{errors.startDate?.message}</strong></p>}
        </div>

        {/* end date */}
        <div className="mb-4">
          <label htmlFor="endDate" className="form-label fw-bold">End Date</label>
          <input type="date" {...register('endDate')} className="form-control"></input>
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

        {/* submit button */}
        <div>
          <button type="submit" className="btn d-block mx-auto register-submit text-white fw-bold">submit</button>
        </div>
      </form>
    </div>
  )
}

export default AddTeamMember