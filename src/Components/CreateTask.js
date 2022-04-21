import React, {useEffect, useState} from "react";
import DropDown from "./DropDown";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {XCircleIcon} from "@heroicons/react/solid";
import Footer from "./Footer";
import DropDownUsers from "./DropDownUsers";
import DropDownRecurringFrequency from "./DropDownRecurringFrequency";


const CreateTask = (props) =>{
    const userId = localStorage.getItem('userId')
    const [formState, setFormState] = useState({ title:'', body: '', assigneeId: null, recurring_code: 0, due_date: null })
    const navigate = useNavigate()
    const [error, setError] = useState('')
    const jwtToken = localStorage.getItem('jwtToken')

    function handleSubmit(e){
        e.preventDefault()
        if(formState.assigneeId){
            axios.post(`https://tasks.gaussb.io/api/users/${userId}/tasks`, { task: {title: formState.title, body: formState.body, assignee_id: formState.assigneeId, creator_id: userId, due_date: formState.due_date, recurring_code: formState.recurring_code}},
                { headers: { "Authorization": `Bearer ${jwtToken}`} })
                .then((res)=>{
                    navigate('/dashboard')
                })
                .catch((err)=>{
                    console.log(err)
            })
        }else{
            setError('Please Select Assignee')
            setTimeout(()=>{
                setError('')
            }, 5000)
        }
    }
    function handleChange(e){
        e.preventDefault()
        //console.log(e.target.value)
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        })
    }
    return(
        <>
            <div className="grid grid-cols-1 pt-28 pb-8 bg-indigo-100 overflown-h lg:grid-cols-3 h-auto gap-2">
                <div className="">

                </div>

                <div className="flex flex-col h-screen">
                    <card className="w-full h-auto py-8 bg-slate-50 rounded-2xl border shadow px-16 delay-75 duration-100">
                            <div className="max-w-md w-full space-y-8">
                                {
                                    error.length > 0 &&
                                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                                        <strong className="font-bold">{error}</strong>
                                        <span className="absolute top-0 right-5 px-4 py-3">
                                            <div onClick={()=>setError('')} className='text-2xl absolute text-red-400 cursor-pointer h-7 w-7'>
                                                <XCircleIcon />
                                            </div>
                                        </span>
                                    </div>
                                }
                                <div>
                                    <h2 className="text-center border-b-4 text-3xl font-extrabold text-gray-900">Create Task✍️</h2>
                                    <p className="mt-2 text-center text-sm text-gray-600">
                                    </p>
                                </div>
                                <form className="mt-8 space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
                                    <input type="hidden" name="remember" defaultValue="true" />
                                    <div className="rounded-md shadow-sm">
                                        <div>
                                            <label htmlFor="title" className="font-bold">
                                                Title
                                            </label>
                                            <input
                                                id="title"
                                                name="title"
                                                type="text"
                                                required
                                                placeholder="Title"
                                                value={formState.title}
                                                onChange={handleChange}
                                                className="appearance-none mb-2 relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="body" className="font-bold">
                                                Body
                                            </label>
                                            <textarea
                                                id="body"
                                                name="body"
                                                type="text"
                                                required
                                                placeholder="Body"
                                                value={formState.body}
                                                onChange={handleChange}
                                                className="h-20 appearance-none mb-2 relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                            />
                                        </div>
                                        <div className="flex flex-row">
                                            <label htmlFor="due_date" className="font-bold">
                                                Due Date
                                            </label>
                                            <input
                                                id="due_date"
                                                name="due_date"
                                                type="date"
                                                required
                                                value={formState.due_date}
                                                onChange={handleChange}
                                                className="appearance-none ml-4 mb-2 w-auto relative block px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                            />
                                        </div>
                                        <div className="flex flex-row">
                                            <label htmlFor="recurring_code" className="font-bold mt-1">
                                                Repeat
                                            </label>
                                            <div className="ml-8">
                                                <DropDownRecurringFrequency formState={formState} setFormState={setFormState}/>
                                            </div>
                                        </div>
                                        <div className="flex flex-row mt-2">
                                            <label htmlFor="assignee" className="font-bold mt-1">
                                                Assignee
                                            </label>
                                            <div className="ml-4">
                                                <DropDownUsers formState={formState} setFormState={setFormState}/>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <button
                                            type="submit"
                                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                            Create
                                        </button>
                                    </div>
                                </form>
                            </div>
                    </card>
                </div>

                <div className="">

                </div>
            </div>
            <Footer />
        </>
    )
}

export default CreateTask