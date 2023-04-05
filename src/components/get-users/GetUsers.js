import React from 'react'
import axios from 'axios'
import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const GetUsers = () => {

  //state for users
  let [users,setUsers]=useState([])
  //state for errors
  let [error,setError]=useState("")
  //state for loading
  let [loading,setLoading]=useState(false)

  //get token from session storage
  let token=sessionStorage.getItem("token")

  let navigate=useNavigate()

  //get users from users table
  const getUsers=async()=>{
    try{
      //make http request
   let res = await axios.get("http://localhost:4000/super-admin-api/users",{
      headers:{Authorization: `Bearer ${token}`}
    });
   setUsers(res.data.payload)
   setLoading(true)
    }catch(err){
      console.log(err)
      setError(err.response.data.message)
    }
  }

  useEffect(()=>{
    getUsers()
  },[])

  //navigate to assign role
  const editUser=(email,role)=>{
    // navigate("/super-admin-dashboard/assign-role", {state:email})
    console.log(role)
    if(role===null){
      navigate("/super-admin-dashboard/assign-role", {state:{email:email}})
    }
    else{
      navigate("/super-admin-dashboard/assign-role",{state:{email:email,role:role}})
    }
  }

  return (
    <div className='container-fluid mt-5 text-center ms-5'>
      <p className='text-secondary display-6 text-center fw-bold'>Users data</p>
      <hr></hr>
      {error ? <p className='text-center fw-bold text-danger'>{error}</p>:
      loading===false ? <div class="spinner-border text-center" role="status"></div> :
      users.length === 0 ? <p className="text-danger fw-bold fs-3 text-center">No projects to display</p> :
      <table className='text-center mx-auto table table-striped table-hover table-bordered '>
        <thead>
          <tr className='bg-success'>
            <th>Email</th>
            <th>Username</th>
            <th>role</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {
            users.map((user,index)=><tr key={index}>
              <td>{user.email}</td>
              <td>{user.username}</td>
              <td>{user.role}</td>
              <td>
                {
                  user.role ? <button className='btn btn-success' onClick={()=>editUser(user.email,user.role)}>Change role</button>:
                  <button className='btn btn-success' onClick={()=>editUser(user.email,user.role)}>Assign role</button>
                }
              </td>
            </tr>)
          }
        </tbody>
      </table>
    }
      </div>
  )
}

export default GetUsers