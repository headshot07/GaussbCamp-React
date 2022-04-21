import React, {useEffect, useState} from "react";
import TaskCard from "./TaskCard";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const Dashboard = () =>{
    const [createdTasks, setCreatedTasks] = useState([])
    const [assignedTasks, setAssignedTasks] = useState([])
    const userId = localStorage.getItem('userId')
    const navigate = useNavigate()

    function fetchTasks() {
        const jwtToken = localStorage.getItem('jwtToken')
        axios.get(`https://tasks.gaussb.io/api/users/${userId}/tasks`, { headers: { "Authorization": `Bearer ${jwtToken}`} } )
            .then((res)=>{
                const createdTasks = res.data.created_tasks.data
                const assignedTasks = res.data.assigned_tasks.data
                setCreatedTasks(createdTasks)
                setAssignedTasks(assignedTasks)
            })
            .catch((err)=>{
                console.log(err)
        })
    }
    function handleClick(){
        navigate('/tasks/addTask')
    }
    useEffect(async ()=>{
        window.scrollTo(0, 0);
        fetchTasks();
    },[])

    return(
        <div className="bg-indigo-100 h-screen mb-10 mt-20 px-8">
            <div className="flex flex-row items-center justify-center w-full">
                <button onClick={handleClick} className='mt-2 bg-green-600 h-10 w-40 text-white font-bold py-2 px-2 rounded-3xl md:ml-8 hover:bg-green-500 duration-500'>
                    + Assign Task
                </button>
            </div>
            <div className="overflow-auto bg-indigo-100 h-auto mx-auto pb-8">
                <div className="grid grid-cols-1 mb-20 md:grid-cols-2 lg:grid-cols-2 gap-28">
                    <card className="w-full shadow-md pb-4 px-4 bg-slate-100 h-auto rounded-xl mt-4">
                        <div className={"flex flex-col items-center h-auto"}>
                            <>
                                <div className="flex flex-row w-1/3 bg-indigo-500 mt-4 rounded-lg items-center justify-center py-2">
                                    <div>
                                        <h2 className="text-center text-xl font-bold text-white">To-Dos</h2>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 w-full gap-8 mt-4 px-4">
                                    {
                                        assignedTasks.map((task)=>{
                                            return(
                                                <TaskCard title={task.attributes.title} body={task.attributes.body} taskId={task.id} status={task.attributes.status} assignee_id={task.attributes.assignee.id} creator_id={task.attributes.creator.id} due_date={task.attributes.due_date}/>
                                            )
                                        })
                                    }
                                </div>
                            </>
                        </div>
                    </card>
                    <card className="w-full shadow-md pb-4 px-4 bg-slate-100 h-auto rounded-xl mt-4">
                        <div className={"flex flex-col items-center h-auto"}>
                            <>
                                <div className="flex flex-row w-1/3 bg-indigo-500 mt-4 rounded-lg items-center justify-center py-2">
                                    <div>
                                        <h2 className="text-center text-xl font-bold text-white">Created Tasks</h2>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 w-full gap-8 mt-4 px-4">
                                    {
                                        createdTasks.map((task)=>{
                                            if(task.attributes.assignee.id !== task.attributes.creator.id)
                                                return(
                                                    <TaskCard title={task.attributes.title} body={task.attributes.body} taskId={task.id} status={task.attributes.status} assignee_id={task.attributes.assignee.id} creator_id={task.attributes.creator.id}  due_date={task.attributes.due_date}/>
                                                )
                                        })
                                    }
                                </div>
                            </>
                        </div>
                    </card>
                </div>
            </div>
        </div>
    )
}

export default Dashboard