import { createSlice } from "@reduxjs/toolkit";
import { auth } from '../firebase'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "firebase/auth";

const initialState = {
  currentUser: null,
  authToken: null
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
            uid: userCredential.user.uid,
            email: userCredential.user.email,
          }
          state.authToken = userCredential.user.accessToken
          localStorage.setItem('authToken', userCredential.user.accessToken)
          localStorage.setItem('currentUser', JSON.stringify({ email: state.currentUser.email, uid: state.currentUser.uid }))
          console.log(state.authToken)
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error(error)
        });
    },
    logout: (state) => {
      state.user = null;
    },
    register: async (state, action) => {
      const { email, password } = action.payload
      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          state.user = {
            uid: userCredential.user.uid,
            email: userCredential.user.email,
          }
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error(error)
        });
    }
  }
})

export const { login, logout, register } = userSlice.actions

export default userSlice.reducer