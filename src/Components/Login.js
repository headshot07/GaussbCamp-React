import {LockClosedIcon, MenuIcon, UserAddIcon, XCircleIcon} from '@heroicons/react/solid'
import React, {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import AuthLogin from "../Services/authLogin";

const Login = () => {
    const navigate = useNavigate();
    const [error, setError] = useState('')
    const [loginState, setLoginState] = useState({email:'', password: ''})
    const emailFocus = useRef(null)

    function handleSubmit(e){
        e.preventDefault();
        axios.post('http://tasks.gaussb.io/api/sessions', { user: { email: loginState.email, password: loginState.password } }, { withCredentials: true } )
            .then((res)=>{
                const userId = res.data.user.data.id
                localStorage.setItem('userId', userId)
                const jwtToken = res.data.token
                localStorage.setItem('jwtToken', jwtToken)
                navigate('/dashboard')
            })
            .catch((err)=>{
                setError( 'Email or password is wrong!')
                setTimeout(()=>{
                    setError('')
                },3000)
            })
    }

    function handleStateChange(e){
        setLoginState({
            ...loginState,
            [e.target.name]: e.target.value
        })
    }

    useEffect(()=>{
        emailFocus.current.focus()
        const isLoggedIn = AuthLogin();
        if(isLoggedIn == true)
            navigate('/dashboard', { state: { message: "Login Successful" } })
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
                        <h2 id="heading" className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
                        <p className="mt-2 text-center text-sm text-gray-600">
                        </p>
                    </div>
                    <form className="mt-8 space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
                        <input type="hidden" name="remember" defaultValue="true" />
                        <div className="rounded-md shadow-sm -space-y-px">
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
                                    ref={emailFocus}
                                    value={loginState.email}
                                    onChange={handleStateChange}
                                    className="appearance-none rounded-t-md rounded-b-md mb-2 relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
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
                                    value={loginState.password}
                                    onChange={handleStateChange}
                                    className="appearance-none rounded-t-md rounded-b-md mb-2 relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Password"
                                />
                            </div>
                        </div>

                        <div className="flex items-end justify-between">
                            <div className="text-sm">
                                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                    Forgot your password?
                                </a>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                  <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                                </span>
                                Sign In
                            </button>
                        </div>
                    </form>
                    <div>
                        <button
                            onClick={()=> navigate('/register')}
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                  <UserAddIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                                </span>
                            Register
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login