import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { initializeTodos, newTodo } from '../../store/todoSlice';
import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { getDatabase, ref, push, set, child, get } from "firebase/database";
import { auth } from '../../firebase';
import { addTodoToDB } from '../../../db';


const priorityOptions = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
];

const categoryOptions = [
  { value: "work", label: "Work" },
  { value: "personal", label: "Personal" },
  { value: "other", label: "Other" },
];


const NewTodo = () => {
  const projects = useSelector((state) => state.projects.projects)
  const projectOptions = [
    { id: 0, title: "None" },
    ...projects
  ]

  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState(priorityOptions[0].value);
  const [category, setCategory] = useState(categoryOptions[0].value);
  const [projectId, setProjectId] = useState(projectOptions[0].id);
  const [dueDate, setDueDate] = useState('')
  const cancelButtonRef = useRef(null)

  const formatDueDate = (date) => {
    const splitDate = date.split('-')
    const formattedDate = `${splitDate[1]}/${splitDate[2]}/${splitDate[0]}`
    return formattedDate
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = {
      title: title,
      description: description,
      priority: priority,
      category: category,
      dueDate: formatDueDate(dueDate),
      status: 'To do',
      projectId: projectId
    }
    if (auth.currentUser) {
      addTodoToDB(auth.currentUser.uid, body)
    }
    dispatch(newTodo(body))
    setOpen(false)
    setTitle("");
    setDescription("");
    setPriority(priorityOptions[0].value);
    setCategory(categoryOptions[0].value);
    setProjectId(projectOptions[0].id)
    setDueDate('')
  };

  return (
    <div className="p-5">
      <button className="bg-slate-600 text-white hover:bg-slate-500 rounded-md w-full py-0.5" onClick={() => setOpen(true)}>New Task</button>
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
                          New Todo
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
                          <div className="flex flex-row w-full gap-5">
                            <div className="mb-4 w-full">
                              <label
                                htmlFor="priority"
                                className="block text-gray-700 font-bold mb-2"
                              >
                                Priority
                              </label>
                              <select
                                id="priority"
                                value={priority}
                                onChange={(e) => setPriority(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                              >
                                {priorityOptions.map((option) => (
                                  <option key={option.value} value={option.value}>
                                    {option.label}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div className="mb-4 w-full">
                              <label
                                htmlFor="category"
                                className="block text-gray-700 font-bold mb-2"
                              >
                                Category
                              </label>
                              <select
                                id="category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                              >
                                {categoryOptions.map((option) => (
                                  <option key={option.value} value={option.value}>
                                    {option.label}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div className="mb-4 w-full">
                              <label
                                htmlFor="project"
                                className="block text-gray-700 font-bold mb-2"
                              >
                                Project
                              </label>
                              <select
                                id="project"
                                value={projectId}
                                onChange={(e) => setProjectId(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                              >
                                {projectOptions.map((option) => (
                                  <option key={option.id} value={option.id}>
                                    {option.title}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <input
                              type="date"
                              format="mm/dd/yyyy"
                              value={dueDate}
                              onChange={(e) => setDueDate(e.target.value)}>
                            </input>
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

export default NewTodo