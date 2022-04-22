import React, {useEffect, useState} from "react";
import {LockClosedIcon, MenuIcon, UserAddIcon, XCircleIcon} from '@heroicons/react/solid'
import axios from "axios";
import {PencilAltIcon} from "@heroicons/react/solid";

const Profile = () => {
    const userId = localStorage.getItem('userId')
    const [user,setUser] = useState({
        first_name: '',
        last_name: '',
        email: '',
    })
    const [editStatus, setEditStatus] = useState(false )
    const jwtToken = localStorage.getItem('jwtToken')
    const [error, setError] = useState('')

    useEffect(()=>{
        window.scrollTo(0, 0);
        axios.get(`https://tasks.gaussb.io/api/users/${userId}`,{ headers: { "Authorization": `Bearer ${jwtToken}`} })
            .then((res)=>{
                const user = res.data.user.data.attributes
                setUser({...user, user})
            })
            .catch((err)=>{
                console.log(err)
            })
    },[])

    function handleUpdate(e){
        e.preventDefault()
        if(user.first_name === ""){
            setError( 'First Name Can\'t Be Empty')
            setTimeout(()=>{
                setError('')
            },3000)
            return;
        }
        axios.put(`https://tasks.gaussb.io/api/users/${userId}`, { user: { first_name: user.first_name, last_name: user.last_name, email: user.email}},
            { headers: { "Authorization": `Bearer ${jwtToken}`} })
            .then((res)=>{
                const user = res.data.user.data.attributes
                setUser({...user, user})
            })
            .catch((err)=>{
                console.log(err)
            })
        setEditStatus(false)
    }
    function handleChange(e){
        e.preventDefault()
        setUser({...user,
            [e.target.name]: e.target.value
        })
    }
    return(
        <>
            {
                editStatus ?
                    <>
                        <div
                            className="grid grid-cols-1 pt-28 pb-8 h-auto bg-indigo-100 overflown-h lg:grid-cols-3 h-auto gap-2">
                            <div className="">

                            </div>

                            <div className="flex flex-col h-screen">
                                {
                                    error.length > 0 &&
                                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mb-8 rounded relative" role="alert">
                                        <strong className="font-bold ml-50%">{error}</strong>
                                        <span className="absolute top-0 right-5 px-4 py-3">
                                            <div onClick={()=>setError('')} className='text-2xl absolute text-red-400 cursor-pointer h-7 w-7'>
                                                <XCircleIcon />
                                            </div>
                                        </span>
                                    </div>
                                }
                                <card
                                    className="w-full h-auto mb-3 bg-slate-50 rounded-2xl border shadow py-4 px-8 delay-75 duration-100">
                                    <div className="w-full flex flex-rows items-center justify-center">
                                        <img
                                            className="inline-block h-24 w-24 rounded-full ring-2 ring-white"
                                            src="https://cdn3.iconfinder.com/data/icons/avatars-round-flat/33/man5-1024.png"
                                            alt=""
                                        />
                                    </div>
                                    <div>
                                        <h2 className="text-center border-b-4 text-3xl font-bold text-gray-900">Profile</h2>
                                    </div>
                                    <div className="bg-indigo-100 rounded-md px-2 mt-2 py-2">
                                        <div className="">
                                            <label className="font-bold">First Name: </label>
                                            <input
                                                id="first-name"
                                                name="first_name"
                                                type="text"
                                                required
                                                placeholder="First Name"
                                                value={user.first_name}
                                                onChange={handleChange}
                                                className="appearance-none mb-2 rounded-t-md rounded-b-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                            />
                                        </div>
                                        <div className="mt-8">
                                            <label className="font-bold">Last Name: </label>
                                            <input
                                                id="last-name"
                                                name="last_name"
                                                type="text"
                                                required
                                                placeholder="Last Name"
                                                value={user.last_name}
                                                onChange={handleChange}
                                                className="appearance-none mb-2 rounded-t-md rounded-b-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                            />
                                        </div>
                                        <div className="mt-8">
                                            <label className="font-bold">Email: </label>
                                            <input
                                                id="email-address"
                                                name="email"
                                                type="email"
                                                autoComplete="email"
                                                value={user.email}
                                                onChange={handleChange}
                                                placeholder="Email"
                                                className="appearance-none mb-2 rounded-t-md rounded-b-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                            />
                                        </div>
                                        <button onClick={handleUpdate} className='bg-indigo-600 text-white float-right mt-4 font-bold py-2 px-6 rounded md:ml-8 hover:bg-indigo-400 duration-500'>
                                            Update
                                        </button>
                                    </div>
                                </card>
                            </div>

                            <div className="">

                            </div>
                        </div>
                    </>
                    :
                    <>
                        <div
                            className="grid grid-cols-1 pt-28 pb-8 h-auto bg-indigo-100 overflown-h lg:grid-cols-3 h-auto gap-2">
                            <div className="">

                            </div>

                            <div className="flex flex-col h-screen">
                                <card
                                    className="w-full h-auto mb-3 bg-slate-50 rounded-2xl border shadow py-4 px-8 delay-75 duration-100">
                                    <div className="w-full flex flex-rows items-center justify-center">
                                        <img
                                            className="inline-block h-24 w-24 rounded-full ring-2 ring-white"
                                            src="https://cdn3.iconfinder.com/data/icons/avatars-round-flat/33/man5-1024.png"
                                            alt=""
                                        />
                                    </div>
                                    <div>
                                        <h2 className="text-center border-b-4 text-3xl font-bold text-gray-900">Profile</h2>
                                    </div>
                                    <div className="bg-indigo-100 rounded-md px-2 mt-2 py-2">
                                        <div className="">
                                            <label className="font-bold">First Name: </label>
                                            <text>{user.first_name}</text>
                                            <br/>
                                        </div>
                                        <div className="mt-8">
                                            <label className="font-bold">Last Name: </label>
                                            <text>{user.last_name}</text>
                                            <br/>
                                        </div>
                                        <div className="mt-8">
                                            <label className="font-bold">Email: </label>
                                            <text></text>
                                            {user.email}<br/>
                                        </div>
                                        <div className="float-right mt-4">
                                            <PencilAltIcon onClick={()=>setEditStatus(true)} color="indigo" className='h-5 w-5 cursor-pointer'/>
                                        </div>
                                    </div>
                                </card>
                            </div>

                            <div className="">

                            </div>
                        </div>
                    </>
            }
        </>
    )
}

export default Profile