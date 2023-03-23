import { createSlice } from "@reduxjs/toolkit";
import { auth } from '../firebase'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "firebase/auth";
import { writeUserData } from "../../db";

const initialState = {
  currentUser: null
}


export const userSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    login: async (state, action) => {
      const { email, password } = action.payload
      await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          state.currentUser = {
            uid: userCredential.user.uid
          }
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error(error)
        });
    },
    logout: (state) => {
      state.currentUser = null;

    },
    register: async (state, action) => {
      const { email, password } = action.payload
      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          writeUserData(userCredential.user.uid, userCredential.user.email)
          state.currentUser = {
            uid: userCredential.user.uid
          }
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error(error)
        });
    },
  }
})

export const { login, logout, register, setUser } = userSlice.actions

export default userSlice.reducer