import React, {useEffect, useState} from "react";
import {TrashIcon} from "@heroicons/react/outline";
import axios from "axios";

const ShowComment = (props) =>{
    const { body, user, userId, taskId, commentId } = props
    const [showDelete, setShowDelete] = useState(false)
    const jwtToken = localStorage.getItem('jwtToken')

    useEffect(()=>{
        if(userId == user.id){
            setShowDelete(true)
        }
    })
    function handleDelete(e){
        e.preventDefault();
        axios.delete(`http://35.193.87.83:3000/users/${userId}/tasks/${taskId}/comments/${commentId}`, {headers: {"Authorization": `Bearer ${jwtToken}`}})
            .then((res)=>{
                window.location.reload()
            })
            .catch((err)=>{
                console.log(err)
            })
    }
    return(
        <div className="break-words mt-2 rounded-md bg-indigo-100 px-2 py-2">
            <label className="font-bold">
                {user.first_name+ ' ' + user.last_name}:
            </label>
            <text>
                {' ' + body}
            </text>
            {
                showDelete &&
                <div className="w-5 h-5 float-right">
                    <TrashIcon color="red" onClick={handleDelete}/>
                </div>
            }
        </div>
    )
}

export default ShowComment