import React, { useEffect, useState } from "react";

import {BsSearch} from "react-icons/bs";
import useDateReducer from "../../hooks/dateReducer";

import Day from "./Day";

import { Task } from "../../types/task";

import { TaskReducerAction, TaskInitialState } from "../../hooks/taskReducer";

import styles from "./Header.module.css"


type Props = {
    taskReducer: {
        state: TaskInitialState
        dispatch: React.Dispatch<TaskReducerAction>;
    }
}

export default function Header({taskReducer} : Props) {
    const [stateDate, dispatchDate] = useDateReducer();
    const {state, dispatch} = taskReducer;

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
    };

    const handleUpdateDayTask = (d: Date) => {
        dispatch({
            type: "update_day",
            payload: d
        })
    };

    useEffect(() => {
        addDays();
    },[]);

    if(stateDate.date){
        return (
            <div className={styles.divGlobal}>
                <div className={styles.divDate}>
                    <span>{stateDate.date.toLocaleString('en-us', {  weekday: 'long' })}, {stateDate.date.toLocaleString('en-us', { month: 'short'})}, {stateDate.date.toDateString().split(' ')[2]}</span>
                </div>
                <div className={styles.divTitleAndSearch}>
                    <div className={styles.divTitle}>
                        <h1>{stateDate.day}</h1>
                    </div>
                    <div className={styles.divSearchIcon}>
                        <BsSearch className={styles.icon}/>
                    </div>
                </div>
                <div className={styles.divDay}>
                    <Day handleUpdateDayTask={handleUpdateDayTask} updateDay={updateDay} date={Number(stateDate.date.toDateString().split(' ')[2])}/>
                </div>
                <div className={styles.divSpanTotalTask}>
                    <span>{state.tasks.length} Tasks</span>
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