import { createSlice } from "@reduxjs/toolkit";
import { auth } from '../firebase'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "firebase/auth";
import { registerUser } from "../../db";

const initialState = {
  currentUser: JSON.parse(localStorage.getItem('currentUser')) || null
}


export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      console.log('this is payload',action.payload)
      return state = action.payload
    },
    clearUser: () => initialState
  }
})

export const { setUser, clearUser } = authSlice.actions

export default authSlice.reducer