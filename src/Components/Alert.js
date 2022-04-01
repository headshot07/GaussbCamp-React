import React from "react";
import {CheckIcon, ClockIcon} from "@heroicons/react/solid";

const Alert = (props) =>{
    return(
        <div className="flex justify-center mt-20">
            <div className="flex flex-row items-center justify-center w-2/5 px-6 py-4 text-green-700 bg-green-100 rounded">
                <CheckIcon color="green" width="25" height="25" />
                <p className="ml-2 text-medium font-bold">{props.message}</p>
            </div>
        </div>
    )
}

export default Alert