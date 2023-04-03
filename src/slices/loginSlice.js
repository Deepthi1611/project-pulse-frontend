import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//middleware
export const userLogin=createAsyncThunk('login/userLogin',async(userCredObj, {rejectWithValue})=>{

  try{
    //make http request
  let res=await axios.post("http://localhost:4000/user-api/login",userCredObj)

  console.log(res)

  //store token in session/local storage
  if(res.data.message==="Login successful")
  {
    sessionStorage.setItem("token",res.data.token)
    //store user in local storage
    localStorage.setItem("userObj", JSON.stringify(res.data.user));
    localStorage.setItem("status", "success");
    return res.data;
  }
  else{
    console.log("error",res.data.message)
    throw new Error(res.data.message)
  }
  //returned to action in extra reducers
  }catch(err){
    return rejectWithValue(err)
    //retunred to rejected state
  }
})

// logic for initializing the userObj with data from local storage because of state loss during refresh
let user = localStorage.getItem("userObj");
if (!user) {
  user = {};
} else {
  user = JSON.parse(user);
}
// status from localstorage
let status = localStorage.getItem("status");
//if not exist in local storage set idle
if (!status) {
  status = "idle";
}

//create slice
export const loginSlice=createSlice({
  name:"login",
  initialState:{
    userObj:user,
    errorMessage:"",
    status:status
  },
  reducers:{
    //to clear state after logout
    clearState:(state)=>{
      state.userObj={};
      state.errorMessage="";  
      state.status="idle"
      //clear token from session storage
      sessionStorage.clear()
      //clear token from local storage
      localStorage.clear()
    }
  },
  extraReducers:(builder)=>{
    builder.addCase(userLogin.pending,(state,action)=>{
      state.status='pending'
    });
    builder.addCase(userLogin.fulfilled,(state,action)=>{
      console.log("action object",action)
      console.log(action.payload.user)
      state.status='success'
      state.userObj=action.payload.user
      state.errorMessage=""
    });
    builder.addCase(userLogin.rejected,(state,action)=>{
      console.log(action)
      state.status='failed'
      state.errorMessage=action.payload.response.data.message
    })
  }
})

//export action creators
export const {clearState} = loginSlice.actions

//export reducers
export default loginSlice.reducer