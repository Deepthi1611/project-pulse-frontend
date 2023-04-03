import { configureStore } from "@reduxjs/toolkit";
import loginReducer from './slices/loginSlice'

//create store
export const store=configureStore({
  reducer:{
    login:loginReducer
  }
})