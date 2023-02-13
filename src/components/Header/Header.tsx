import React, { useEffect } from "react";

import {BsSearch} from "react-icons/bs";
import useDateReducer from "../../hooks/dateReducer";

import Day from "./Day";

import { TaskReducerAction, TaskInitialState } from "../../hooks/taskReducer";


type Props = {
    taskReducer: {
        state: TaskInitialState
        dispatch: React.Dispatch<TaskReducerAction>;
    }
}

export default function Header({taskReducer} : Props) {
    const [stateDate, dispatchDate] = useDateReducer()
    const {state, dispatch} = taskReducer

    const addDays = () => {
        let newDate = new Date()
        newDate.setDate(newDate.getDate())

        dispatchDate({
            type: 'set_day',
            payload: newDate
        })
    };

    const updateDay = (day: string) => {
        dispatchDate({
            type: "update_day",
            payload: day
        })
    }

    const handleUpdateDayTask = (d: Date) => {
        dispatch({
            type: "update_day",
            payload: d
        })
    }

    useEffect(() => {
        addDays()
    },[]);

    if(stateDate.date){
        return (
            <div>
                <div>
                    <span>{stateDate.date.toLocaleString('en-us', {  weekday: 'long' })}, {stateDate.date.toLocaleString('en-us', { month: 'short'})}, {stateDate.date.toDateString().split(' ')[2]}</span>
                </div>
                <div>
                    <div>
                        <h1>{stateDate.day}</h1>
                    </div>
                    <div>
                        <BsSearch/>
                    </div>
                </div>
                <div>
                    <Day handleUpdateDayTask={handleUpdateDayTask} updateDay={updateDay} date={Number(stateDate.date.toDateString().split(' ')[2])}/>
                </div>
            </div>
        )
    } else {
        return (
            <div>
                <span>
                    Loading...
                </span>
            </div>
        )
    }
};