import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {BadgeCheckIcon, CalendarIcon, ClockIcon, ExclamationCircleIcon, TruckIcon} from "@heroicons/react/solid";
import axios from "axios";
import {TrashIcon} from "@heroicons/react/outline";

const TaskCard = (props) =>{
    const navigate = useNavigate()
    const { title, body, taskId, status, assignee_id, creator_id, due_date } = props;
    const [taskStatus, setTaskStatus] = useState(status)
    const userId = localStorage.getItem('userId')
    const jwtToken = localStorage.getItem('jwtToken')
    const [dueDate, setDueDate] = useState(false)
    const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];

    function formattedDate(date){
        const dueDate = new Date(date)
        const createdMonth = month[dueDate.getMonth()]
        const createdDate = dueDate.getDate()
        const createdYear = dueDate.getFullYear()
        return createdDate + ' ' + createdMonth + ' ' + createdYear
    }

    function checkDueDate(){
        const today_date = formattedDate(new Date())
        const parsed_today_date = Date.parse(today_date);
        const parsed_due_date = Date.parse(due_date)

        if(parsed_today_date < parsed_due_date)
            setDueDate(false)
        else
            setDueDate(true)
    }

    function handleStatus(e) {
        e.preventDefault();
        if (userId == assignee_id) {
            axios.post(`https://tasks.gaussb.io/api/tasks/${taskId}/edit`, {status: !taskStatus}, {headers: {"Authorization": `Bearer ${jwtToken}`}})
                .then((res) => {
                    //console.log('Done')
                })
                .catch((err) => {
                    console.log(err)
                })
            setTaskStatus(!taskStatus)
        }
    }

    useEffect(()=>{
        checkDueDate()
    },[])

    function handleDelete(e){
        e.preventDefault()
        axios.delete(`https://tasks.gaussb.io/api/users/${userId}/tasks/${taskId}`, { headers: { "Authorization": `Bearer ${jwtToken}`} })
            .then((res)=>{

            })
            .catch((err)=>{
                console.log(err)
            })
        window.location.reload()
    }
    return(
        <>
            <card className="w-full mb-3 bg-slate-50 rounded-2xl border shadow py-4 px-4 hover:-translate-y-1 hover:shadow-2xl delay-75 duration-100">
                <p className="text-2xl text-gray-700 font-semibold"> {title}</p>
                <p className="truncate text-sm text-gray-700 font-light mt-3 leading-7">{body}</p>
                <div className="flex flex-row w-full">
                    {
                        dueDate ?
                            <>
                                <ExclamationCircleIcon className="w-8 h-8" color="red" onClick={handleStatus}/>
                                <label htmlFor="A3-yes" className="ml-2 mt-1 select-none">Due date is over!</label>
                            </>
                            :
                            <>
                                <CalendarIcon className="w-8 h-8" color="orange" onClick={handleStatus}/>
                                <label htmlFor="A3-yes" className="ml-2 mt-1 select-none">Due Date: {formattedDate(due_date)}</label>
                            </>
                    }
                </div>
                <div className="flex flex-row w-full justify-between">
                    <div className="mt-5">
                        {
                            taskStatus ?
                                <>
                                    <BadgeCheckIcon className="w-10 h-10" color="green" onClick={handleStatus}/>
                                    <label htmlFor="A3-yes" className="select-none">Completed</label>
                                </>
                            :
                                <>
                                    <ClockIcon className="w-10 h-10" color="grey" onClick={handleStatus}/>
                                    <label htmlFor="A3-yes" className="select-none">Pending</label>
                                </>
                        }
                    </div>
                    <div className="mt-6">
                        {
                            userId == creator_id &&
                            <>
                                <TrashIcon className="w-10 h-10 text-red-600" onClick={handleDelete}/>
                            </>
                        }
                    </div>
                    <button onClick={()=>navigate(`/task/${taskId}`)} className="mt-8 w-28 h-auto float-right rounded-xl border border-indigo-600 text-indigo-600 hover:bg-indigo-500 hover:text-white">
                        Show Task
                    </button>
                </div>

            </card>
        </>
    )
}
export default TaskCard