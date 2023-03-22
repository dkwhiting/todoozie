import React from 'react'
import { useDispatch } from 'react-redux';
import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { login, logout, register } from './userSlice'
import { auth } from '../firebase'
import {
  getAuth,
  createUserWithEmailAndPassword
} from "firebase/auth";

const Login = () => {
  const emailRef = useRef()
  const passwordRef = useRef()
  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch(login({ email: emailRef.current.value, password: passwordRef.current.value }))
  }

  return (
    <div className="p-5">


      <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <div className="sm:flex sm:items-start">
          <div className="flex flex-col w-full mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">

            <form id="new-todo" onSubmit={(e) => handleSubmit(e)} className="w-full mx-auto flex flex-col">
              <div className="mb-3">
                <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  ref={emailRef}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  ref={passwordRef}
                  autoComplete="current-password"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>

            </form>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
        <button
          className="inline-flex w-full justify-center rounded-md bg-violet-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
          type="submit"
          form="new-todo"
        >
          Login
        </button>

      </div>

    </div>

  )
}

export default Login
