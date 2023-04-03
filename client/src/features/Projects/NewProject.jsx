import React, { useState, useRef, Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Dialog, Transition } from '@headlessui/react'
import { auth } from '../../firebase'
import { addProjectToDB } from '../../../db'
import { addProject } from '../../store/projectSlice'


const NewProject = () => {
  const projects = useSelector((state) => state.projects.projects)
  const projectOptions = [
    { id: 0, title: "None" },
    ...projects
  ]

  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const cancelButtonRef = useRef(null)


  const handleSubmit = (e) => {
    e.preventDefault();
    const body = {
      title: title,
      description: description,

    }
    if (auth.currentUser) {
      addProjectToDB(auth.currentUser.uid, body)
    }
    dispatch(addProject(body))
    setOpen(false)
    setTitle("");
    setDescription("");
  };

  return (
    <div className="p-5">
      <button className="bg-slate-600 text-white hover:bg-slate-500 rounded-md w-full py-0.5" onClick={() => setOpen(true)}>
        New Project
      </button>
      <Transition.Root show={open} as={Fragment} onClose={setOpen}>
        <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-md">
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="flex flex-col w-full mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                          New Project
                        </Dialog.Title>
                        <form id="new-todo" onSubmit={handleSubmit} className="w-full mx-auto flex flex-col">
                          <div className="mb-3">
                            <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
                              Title
                            </label>
                            <input
                              id="title"
                              type="text"
                              value={title}
                              onChange={(e) => setTitle(e.target.value)}
                              onBlur={(e) => setTitle(e.target.value.trim())}
                              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                              required
                            />
                          </div>
                          <div className="mb-4">
                            <label
                              htmlFor="description"
                              className="block text-gray-700 font-bold mb-2"
                            >
                              Description
                            </label>
                            <textarea
                              id="description"
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                              onBlur={(e) => setDescription(e.target.value.trim())}
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
                      Create
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => setOpen(false)}
                      ref={cancelButtonRef}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root >
    </div>
  )
}


export default NewProject
