import React, { useState, useEffect } from "react";
import useTaskReducer from "../../hooks/taskReducer";

import { Task as typeTask } from "../../types/task";

import Task from "./Task"
import CreateTask from "./CreateTask";

import { TaskReducerAction, TaskInitialState } from "../../hooks/taskReducer";

import styles from "./Body.module.css";

type Props = {
    taskReducer: {
        state: TaskInitialState
        dispatch: React.Dispatch<TaskReducerAction>;
    }
}

const Body = ({taskReducer} : Props) => {
    const {state, dispatch} = taskReducer

    const numberDay = Number(state.actualDay.toDateString().split(' ')[2])

    const handleCompleteTask = (id: string, status: boolean) => {
        dispatch({
            type: "completed",
            payload: {status , id}
        })
    }

    const handleDeleteTask = (id: string) => {
        dispatch({
            type: "delete_task",
            payload: id
        })

    }

    const handleCreateTask = (task: typeTask) => {
        dispatch({
            type: "add_task",
            payload: task
        })
    }
    
    return(
        <div className={styles.divGlobal}>
            <div className={styles.divTask}>
                {
                    state.tasks.map((t: typeTask) => {
                        const taskDay = Number(t.day.toDateString().split(' ')[2])
                        if(numberDay === taskDay) {
                            return (<Task 
                            key={t.id}
                            id={t.id}
                            title={t.title}
                            text={t.text}
                            completed={t.completed}
                            hour={t.hour}
                            completeTask={handleCompleteTask}
                            deleteTask={handleDeleteTask}
                            />)}
                        }
                    )
                }
            </div>
            <div>
                <CreateTask createTask={handleCreateTask}/>
            </div>
        </div>
    )
}

export default Body;