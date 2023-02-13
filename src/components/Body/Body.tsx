import React from "react";
import useTaskReducer from "../../hooks/taskReducer";

import { Task as typeTask } from "../../types/task";

import Task from "./Task"
import CreateTask from "./CreateTask";

const Body = () => {
    const [state, dispatch] = useTaskReducer()

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
        <div>
            <div>
                <span>{state.tasks.length} Tasks</span>
            </div>
            <div>
                {
                    state.tasks.map((t: typeTask) => <Task 
                        key={t.id}
                        id={t.id}
                        title={t.title}
                        text={t.text}
                        completed={t.completed}
                        hour={t.hour}
                        completeTask={handleCompleteTask}
                        deleteTask={handleDeleteTask}
                    />)
                }
            </div>
            <div>
                <CreateTask createTask={handleCreateTask}/>
            </div>
        </div>
    )
}

export default Body;