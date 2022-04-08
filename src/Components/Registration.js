import {LockClosedIcon, MenuIcon, XCircleIcon} from '@heroicons/react/solid'
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import AuthLogin from "../Services/authLogin";

const Registration = () => {
    const [registrationState, setRegistrationState] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    })
    const navigate = useNavigate();
    const [error, setError] = useState('')

    function handleSubmit(e){
        e.preventDefault();
        axios.post('http://35.193.87.83:3000/users', { user: { first_name: registrationState.firstName, last_name: registrationState.lastName,
                email: registrationState.email, password: registrationState.password } }, { withCredentials: true } )
            .then((res)=>{
                navigate('/')
            })
            .catch((err)=>{
                setError( 'Email has already been taken!')
                setTimeout(()=>{
                    setError('')
                },3000)
            })
    }

    function handleStateChange(e){
        setRegistrationState({
            ...registrationState,
            [e.target.name]: e.target.value
        })
    }

    useEffect(()=>{
        const isLoggedIn = AuthLogin();
        if(isLoggedIn)
            navigate('/dashboard')
    },[])

    return (
        <>
            <div className="min-h-full flex items-center justify-center py-28 px-4 sm:px-6 lg:px-8">
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
                        {/*<img*/}
                        {/*    className="mx-auto h-12 w-auto"*/}
                        {/*    src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"*/}
                        {/*    alt="GaussB"*/}
                        {/*/>*/}
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Register</h2>
                        <p className="mt-2 text-center text-sm text-gray-600">
                        </p>
                    </div>
                    <form className="mt-8 space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
                        <input type="hidden" name="remember" defaultValue="true" />
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label htmlFor="first-name" className="sr-only">
                                    First Name
                                </label>
                                <input
                                    id="first-name"
                                    name="firstName"
                                    type="text"
                                    required
                                    value={registrationState.firstName}
                                    onChange={handleStateChange}
                                    className="appearance-none mb-2 relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="First name"
                                />
                            </div>
                            <div>
                                <label htmlFor="last-name" className="sr-only">
                                    Last Name
                                </label>
                                <input
                                    id="last-name"
                                    name="lastName"
                                    type="text"
                                    required

                                    value={registrationState.lastName}
                                    onChange={handleStateChange}
                                    className="appearance-none mb-2 relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Last name"
                                />
                            </div>
                            <div>
                                <label htmlFor="email-address" className="sr-only">
                                    Email address
                                </label>
                                <input
                                    id="email-address"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={registrationState.email}
                                    onChange={handleStateChange}
                                    className="appearance-none mb-2 rounded-t-md rounded-b-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Email address"
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="sr-only">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    value={registrationState.password}
                                    onChange={handleStateChange}
                                    className="appearance-none mb-2 rounded-t-md rounded-b-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Password"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                  <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                                </span>
                                Sign Up
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Registration