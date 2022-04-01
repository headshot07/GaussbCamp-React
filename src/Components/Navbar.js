import React, {useState} from "react";
import { MenuIcon, XCircleIcon } from '@heroicons/react/solid'
import AuthLogin from "../Services/authLogin";
import {useNavigate} from "react-router-dom";

const Navbar = () => {
    let Links =[
        {name:"DASHBOARD", link:"/dashboard"},
        {name:"SERVICES", link:"/"},
        {name:"ABOUT", link:"/"},
        {name:"CONTACT", link:"/"},
    ];
    const navigate = useNavigate();
    const isLoggedIn = AuthLogin();
    const [open,setOpen]=useState(false);
    const userId = localStorage.getItem('userId')
    function logout(){
        localStorage.setItem('jwtToken', null)
        localStorage.setItem('userId', null)
        navigate('/')
    }
    function handleProfile(e){
        e.preventDefault()
        navigate(`/users/${userId}`)
    }
    return (
        <div className='shadow-md z-50 bg-indigo-500 h-18 fixed w-full fixed top-0 left-0'>
            <div className='md:flex items-center justify-between py-4 md:px-10 px-7'>
                <div className='font-serif font-bold text-3xl cursor-pointer flex items-center text-white'>
                    BaseCamp
                </div>

                <div onClick={()=>setOpen(!open)} className='text-2xl absolute text-white right-8 top-5 cursor-pointer h-7 w-7 md:hidden'>
                    { open ? <XCircleIcon />: <MenuIcon /> }
                </div>

                <ul className={`md:flex bg-indigo-500 md:items-center text-white md:pb-0 pb-12 absolute md:static md:z-auto z-50 left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? 'top-20 ':'top-[-490px]'}`}>
                    {
                        Links.map((link)=>(
                            <li key={link.name} className='md:ml-8 text-l md:my-0 my-7'>
                                <a href={link.link} className='text-white-800 font-bold hover:text-gray-400 duration-500'>{link.name}</a>
                            </li>
                        ))
                    }
                    {
                        isLoggedIn &&
                        <div className="ml=12">
                            <img
                                className="inline-block h-8 w-8 rounded-full ring-2 ring-white ml-4"
                                src="https://cdn3.iconfinder.com/data/icons/avatars-round-flat/33/man5-1024.png"
                                alt=""
                                onClick={handleProfile}
                            />
                        </div>
                    }
                    <br/>
                    {
                        isLoggedIn ?
                            <button onClick={logout} className='bg-indigo-700 text-white font-bold py-2 px-6 rounded md:ml-8 hover:bg-indigo-400 duration-500'>
                                Logout
                            </button>
                            :
                            <button onClick={()=>navigate('/')} className='bg-indigo-700 text-white font-bold py-2 px-6 rounded md:ml-8 hover:bg-indigo-400 duration-500'>
                                Sign In
                            </button>
                    }
                </ul>
            </div>
        </div>
    );
}

export default Navbar