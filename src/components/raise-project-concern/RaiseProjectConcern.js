import React,{useState} from 'react'
import {useForm} from 'react-hook-form'
import axios from 'axios'
import { useSelector } from 'react-redux'

const RaiseProjectConcern = () => {
  let {register,handleSubmit,formState:{errors},reset}=useForm()

  //get state from store
  let {userObj}=useSelector(state=>state.login)

  //get token from storage
  let token=sessionStorage.getItem("token")

  //state for error
  let [error,setError]=useState()

  //state for response error
  let [responseError,setResponseError]=useState("")

  //state for response
  let [response, setResponse]=useState("")

  //on submission of form
  const onSubmit=async(concernObj)=>{
    reset()
    //add raised by to concern object
    concernObj.raisedBy=userObj.email
    //add raised on date
    concernObj.raisedOnDate=new Date()

    if(concernObj.mitigatedOn===""){
      delete concernObj["mitigatedOn"]
    }
    try{
      //make http request
    let res=await axios.post("http://localhost:4000/project-manager-api/raise-project-concern",concernObj,{
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
      <p className='display-6 text-center fw-bold register-text'>Raise project concern</p>
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

        {/* concern description */}
        <div className="mb-4">
          <label htmlFor="concern description" className="form-label fw-bold">Concern description</label>
          <textarea rows="4" {...register('concernDescription', {required:"*concern description required"})} className="form-control"></textarea>
          {/* validation error msg */}
          {errors.concernDescription && <p className="text-danger"><strong>{errors.concernDescription?.message}</strong></p>}
        </div>

        {/* severity */}
        <div className="mb-4">
          <label htmlFor="severity" className="form-label fw-bold">Severity</label>
          <select {...register('severity', {required:"*severity required"})} className="form-control" defaultValue="--severity--">
            <option value="--severity--" disabled>--severity--</option>
            <option value="high">high</option>
            <option value="medium">medium</option>
            <option value="low">low</option>
          </select>
          {/* validation error msg */}
          {errors.severity && <p className="text-danger"><strong>{errors.severity?.message}</strong></p>}
        </div>

        {/* concern raised internally or not */}
        <div className="mb-4">
          <label htmlFor="concernRaisedInternallyOrNot" className="form-label fw-bold">Concern Raised internally or not</label>
          <select {...register('concernRaisedInternallyOrNot', {required:"*concernRaisedInternallyOrNot required"})} className="form-control" defaultValue="--concern raised internally--">
            <option disabled value="--concern raised internally--">--concern raised internally--</option>
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
          {/* validation error msg */}
          {errors.concernRaisedInternallyOrNot && <p className="text-danger"><strong>{errors.concernRaisedInternallyOrNot?.overallProjectFitnessIndicator}</strong></p>}
        </div>

        {/* status */}
        <div className="mb-4">
          <label htmlFor="status" className="form-label fw-bold">Status</label>
          <select {...register('status', {required:"*status required"})} className="form-control" defaultValue="raised">
            <option disabled value="--status--">--status--</option>
            <option value="raised">raised</option>
            <option value="remediation suggested">remediation suggested</option>
            <option value="mitigated">mitigated</option>
          </select>
          {/* validation error msg */}
          {errors.status && <p className="text-danger"><strong>{errors.status?.message}</strong></p>}
        </div>

        {/* mitigated on */}
        <div className="mb-4">
          <label htmlFor="mitigatedOn" className="form-label fw-bold">Mitigated On</label>
          <input type="date" {...register('mitigatedOn')} className="form-control"></input>
        </div>

        {/* submit button */}
        <div>
          <button type="submit" className="btn d-block mx-auto register-submit text-white fw-bold">submit</button>
        </div>
      </form>
    </div>
  )
}

export default RaiseProjectConcern