import { createSlice } from "@reduxjs/toolkit";
import { auth } from '../firebase'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "firebase/auth";
import { registerUser } from "../../db";

const initialState = {
  currentUser: null
}


export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state) => {
      return state = action.payload
    },
    clearUser: () => initialState
  }
})

export const { setUser, clearUser } = userSlice.actions

export default userSlice.reducer