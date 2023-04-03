import axios from 'axios'
import React,{useEffect, useState} from 'react'

const ViewResourceRequests = () => {

  //get token from session storage
  let token=sessionStorage.getItem("token")

  //state for resourcing requests
  let [resourcingRequests,setResourcingRequests]=useState([])

  //state for error
  let [error,setError]=useState("")

  //function to get resourcing  requests
  const getResourcingRequests=async()=>{
    try{
      // make http request
      let res=await axios.get("http://localhost:4000/admin-api/resource-requests",{
        headers:{Authorization: `Bearer ${token}`}
      })
      console.log(res)
      setResourcingRequests(res.data.payload)
      setError("")
    }catch(err){
      setError(err.response.data.message)
    }
  }

  useEffect(()=>{
    getResourcingRequests()
  },[])

  return (
    <div className='container-fluid mt-5 text-center ms-5'>
      <p className='text-secondary display-6 text-center fw-bold'>Resourcing Requests</p>
      <hr></hr>
      {/* error */}
      {error ? <p className='text-center fw-bold text-danger fs-3'>{error}</p>: 
      <table className='text-center mx-auto table table-striped table-hover table-bordered'>
        <thead>
          <tr className='bg-success'>
            <th>Project Id</th>
            <th>Request Description</th>
            <th>GDO Head Email</th>
          </tr>
        </thead>
        <tbody>
          {
            resourcingRequests.map((request,index)=><tr key={index}>
              <td>{request.projectId}</td>
              <td>{request.requestDesc}</td>
              <td>{request.GdoEmail}</td>
            </tr>)
          }
        </tbody>
      </table>
    }
    </div>
  )
}

export default ViewResourceRequests