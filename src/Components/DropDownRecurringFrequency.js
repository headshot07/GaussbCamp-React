import React, {useEffect, useState} from "react";
import DropDown from "./DropDown";
import * as Constants from '../constants'

function checkLastWeekDay(){
    const todayDate = new Date()
    const nextDate = new Date()
    nextDate.setDate(todayDate.getDate() + 7)
    if(todayDate.getMonth() !== nextDate.getMonth())
        return true
    return false
}

function getWeekCode(){
    const weekCode = Math.ceil((new Date().getDate()) / 7)
    return weekCode
}
function getWeekDay(weekDayCode){
    const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    return weekDays[weekDayCode]
}
function getRomanCode(weekCode){
    const romanCode = ["First", "Second", "Third", "Fourth", "Fifth"]
    return romanCode[weekCode-1]

}
const DropDownRecurringFrequency = (props) => {
    function recurringCodeCalculate(){
        let recurringCode = ''
        const lastWeekDay = checkLastWeekDay()
        const todayDate = new Date()

        if(lastWeekDay){
            recurringCode = parseInt('7' + (todayDate.getDay()).toString())
            setOptions((options) => [
                ...options,
                {
                    id: recurringCode,
                    name: "On Every Last " + getWeekDay(todayDate.getDay()) + " of the month"
                }
            ]);
            return
        }
        const weekCode = getWeekCode();
        const weekDayCode = todayDate.getDay()
        //console.log(weekCode + ' ' + weekDayCode)
        recurringCode = parseInt(weekCode.toString() + weekDayCode.toString())
        setOptions((options) => [
            ...options,
            {
                id: recurringCode,
                name: "On Every "+ getRomanCode(weekCode) + ' ' + getWeekDay(todayDate.getDay()) + " of the month"
            }
        ]);
    }
    const [options, setOptions] = useState([
        {
            id: 1,
            name: Constants.EVERY_DAY
        },
        {
            id: 2,
            name: Constants.EVERY_WEEK
        },
        {
            id: 3,
            name: Constants.EVERY_OTHER_WEEK
        },
        {
            id: 4,
            name: Constants.EVERY_MONTH
        },
        {
            id: 5,
            name: Constants.EVERY_YEAR
        }
    ])

    const [selectedOption,setSelectedOption] = useState('Don\'t Repeat')
    function handleClick(e){
        e.preventDefault();
        const option = options.find(option => option.id == e.target.name)
        setSelectedOption(option.name)
        props.setFormState({
            ...props.formState,
            ['recurring_code']: e.target.name
        })
    }
    useEffect(()=>{
        recurringCodeCalculate()
    },[])
    return <DropDown options={options} selectedOption={selectedOption} handleClick={handleClick} />
}
export default DropDownRecurringFrequency