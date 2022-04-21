import React, {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
import ShowComment from "./ShowComment";
import CreateComment from "./CreateComment";

const Task = () =>{
    const [taskDetails, setTaskDetails] = useState({
        title: '',
        body: '',
        assignee: '',
        creator: '',
        status: '',
        due_date: ''
    })
    const [comments, setComments] = useState([])
    const params = useParams()
    const taskId = params.id
    const userId = localStorage.getItem('userId')
    const jwtToken = localStorage.getItem('jwtToken')
    const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const [repeatMessage, setRepeatMessage] = useState('Don\'t Repeat')

    function repeatFrequency(createdAt, recurringCode){
        const createdOn = new Date(createdAt)
        const createdMonth = month[createdOn.getMonth()]
        const createdDate = createdOn.getDate()

        if(recurringCode == 1)
            setRepeatMessage("Every day")
        else if(recurringCode == 2)
            setRepeatMessage("Every week")
        else if(recurringCode == 3)
            setRepeatMessage("Every other week")
        else if(recurringCode == 4)
            setRepeatMessage("Every month on " + createdDate)
        else if(recurringCode == 5)
            setRepeatMessage("Every year on " + createdDate + ' ' + createdMonth)
        else
            setRepeatMessage('Don\'t Repeat')
    }
    function dueDateFormatting(due_date){
        const dueDate = new Date(due_date)
        const createdMonth = month[dueDate.getMonth()]
        const createdDate = dueDate.getDate()
        const createdYear = dueDate.getFullYear()
        return createdDate + ' ' + createdMonth + ' ' + createdYear
    }

    useEffect(()=>{
        window.scrollTo(0, 0);
        axios.get(`https://tasks.gaussb.io/api/users/${userId}/tasks/${taskId}`, { headers: { "Authorization": `Bearer ${jwtToken}`} })
            .then((res)=>{
                const { title, body, assignee, creator, status, due_date, created_at, recurring_code } = res.data.task.data.attributes
                repeatFrequency(created_at, recurring_code)
                const formattedDueDate = dueDateFormatting(due_date)
                setTaskDetails({
                    title: title,
                    body: body,
                    assignee: assignee,
                    creator: creator,
                    status: status ? 'Completed' : 'Pending',
                    due_date: formattedDueDate,
                })
            })
            .catch((err)=>{
                console.log(err)
            })


        axios.get(`https://tasks.gaussb.io/api/users/${userId}/tasks/${taskId}/comments`, { headers: { "Authorization": `Bearer ${jwtToken}`} })
            .then((res)=>{
                const comments = res.data.comments.data
                //console.log(res.data.comments)
                setComments(comments)
            })
            .catch((err)=>{
                console.log(err)
            })
    },[])

    return(
        <>
            <div className="grid grid-cols-1 pt-28 pb-8 h-auto bg-indigo-100 overflown-h lg:grid-cols-3 h-auto gap-2">
                <div className="">

                </div>

                <div className="flex flex-col h-auto mb-20">
                    <card className="w-full h-auto mb-3 bg-slate-50 rounded-2xl border shadow py-4 px-8 delay-75 duration-100">
                       <div>
                           <h2 className="text-center border-b-4 text-3xl font-bold text-gray-900">📝Task</h2>
                       </div>
                        <div className="bg-indigo-100 rounded-md px-2 mt-2 py-2">
                            <div className="">
                                <label className="font-bold">Title: </label>
                                <text>{taskDetails.title}</text><br/>
                            </div>
                            <div className="mt-8">
                                <label className="font-bold">Description: </label>
                                <text>{taskDetails.body}</text><br/>
                            </div>
                            <div className="mt-8">
                                <label className="font-bold">Assigned to: </label>
                                <text>{taskDetails.assignee.first_name + ' ' + taskDetails.assignee.last_name}</text><br/>
                            </div>
                            <div className="mt-8">
                                <label className="font-bold">Created by: </label>
                                <text>{taskDetails.creator.first_name + ' ' + taskDetails.creator.last_name}</text><br/>
                            </div>
                            <div className="mt-8">
                                <label className="font-bold">Status: </label>
                                <text>{taskDetails.status}</text><br/>
                            </div>
                            <div className="mt-8">
                                <label className="font-bold">Due date: </label>
                                <text>{taskDetails.due_date}</text><br/>
                            </div>
                            <div className="mt-8">
                                <label className="font-bold">Repeat: </label>
                                <text>{repeatMessage}</text><br/>
                            </div>
                        </div>
                        <div className="mt-8">
                            <div className="mb-2 border-b-4">
                                <label className="font-bold text-lg">Comments </label>
                            </div>
                            <div className="ml-4">
                                {
                                    comments.map((comment)=>{
                                        return(
                                            <ShowComment commentId={comment.id} taskId={taskId} userId={userId} body={comment.attributes.body} user={comment.attributes.user} use/>
                                        )
                                    })
                                }
                            </div>
                            <CreateComment taskId={taskId} userId={userId}/>
                        </div>
                    </card>
                </div>

                <div className="">

                </div>
            </div>
        </>
    )
}
export default Task
