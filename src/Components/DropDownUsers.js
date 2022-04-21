import React, {useEffect, useState} from "react";
import axios from "axios";
import DropDown from "./DropDown";

const DropDownUsers = (props) =>{
    const [users, setUsers] = useState([])
    const [selectedUser,setSelectedUser] = useState('Users')
    function handleClick(e){
        e.preventDefault();
        const user = users.find(user => user.id === e.target.name)
        setSelectedUser(user.name)
        props.setFormState({
            ...props.formState,
            ['assigneeId']: e.target.name
        })
    }

    const jwtToken = localStorage.getItem('jwtToken')
    function fetchUsers(){
        axios.get("http://localhost:3000/api/users",{ headers: { "Authorization": `Bearer ${jwtToken}`} })
            .then((res)=>{
                console.log(res)
                const received_users = res.data.users.data
                received_users.map((user)=>{
                    setUsers((users) => [
                        ...users,
                        {
                            id: user.id,
                            name: user.attributes.first_name + ' ' + user.attributes.last_name
                        }
                    ]);
                })
            })
            .catch((err)=>{
                console.log(err)
            })
    }

    useEffect(()=>{
        fetchUsers()
    },[])

    return(
        <DropDown options={users} selectedOption={selectedUser} handleClick={handleClick}/>
    )
}
export default DropDownUsers