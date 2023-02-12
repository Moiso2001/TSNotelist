import React, { useEffect } from "react";

import {BsSearch} from "react-icons/bs";
import useDateReducer from "../../hooks/dateReducer";

import Day from "./Day";

export default function Header() {
    const [state, dispatch] = useDateReducer()

    const addDays = () => {
        let newDate = new Date()
        newDate.setDate(newDate.getDate())

        dispatch({
            type: 'set_day',
            payload: newDate
        })
    };

    const updateDay = (day: string) => {
        dispatch({
            type: "update_day",
            payload: day
        })
    }

    useEffect(() => {
        addDays()
    },[]);

    if(state.date){
        return (
            <div>
                <div>
                    <span>{state.date.toLocaleString('en-us', {  weekday: 'long' })}, {state.date.toLocaleString('en-us', { month: 'short'})}, {state.date.toDateString().split(' ')[2]}</span>
                </div>
                <div>
                    <div>
                        <h1>{state.day}</h1>
                    </div>
                    <div>
                        <BsSearch/>
                    </div>
                </div>
                <div>
                    <Day updateDay={updateDay} date={Number(state.date.toDateString().split(' ')[2])}/>
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