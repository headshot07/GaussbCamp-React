import React, {useState} from "react";
import axios from "axios";

const CreateComment = (props) => {
    const {taskId, userId} = props
    const [comment, setComment] = useState('')
    const jwtToken = localStorage.getItem('jwtToken')

    function handleSubmit(e){
        e.preventDefault();
        axios.post(`https://tasks.gaussb.io/api/users/${userId}/tasks/${taskId}/comments`, { comment:{ body: comment, task_id:taskId, user_id: userId }},
            { headers: { "Authorization": `Bearer ${jwtToken}`} } )
            .then((res)=>{
                //console.log('Success')
            })
            .catch((err)=>{
                console.log(err)
            })
        setComment('')
        window.location.reload();
    }
    return(
        <div className="pl-4">
            <form method="POST" onSubmit={handleSubmit}>
                <input className="w-full mt-4 pl-2 h-12 mb-2  rounded-sm border border-indigo-800" type="text" id="comment" name="comment" value={comment} onChange={(e)=>setComment(e.target.value)} placeholder="Create Comment"/>
                <div className="float-right">
                    <button className='bg-indigo-600 text-white font-bold py-2 px-6 rounded md:ml-8 hover:bg-indigo-400 duration-500'>
                        Comment
                    </button>
                </div>
            </form>
        </div>
    )
}

export default CreateComment