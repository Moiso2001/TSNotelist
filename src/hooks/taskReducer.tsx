import { useReducer } from "react";

import { Task } from "../types/task"; 

const INITIAL_STATE = {
    tasks: [{id: "1", title: "My first task :)", completed: false}],
    error: false
}

type TaskInitialState = {
    tasks: Task[],
    error: boolean | string
};

type TaskReducerAction = {
    type: "add_task"
    payload: Task
} | {
    type: "completed"
    payload: {status: boolean, id: string}
} | {
    type: "delete_task"
    payload: string
};

const taskReducer = (state: TaskInitialState, action: TaskReducerAction) => {
    switch(action.type){
        case "add_task":
            return{
                ...state,
                tasks: [...state.tasks, action.payload]
            };

        case "completed":
            const taskToUpdate = state.tasks.find((t: Task) => t.id === action.payload.id);
            if(taskToUpdate){
                taskToUpdate.completed = action.payload.status
                return{
                    ...state
                }
            } else {
                return {
                    ...state,
                    error: "The task doesn't exist"
                }
            };

        case "delete_task":
            const taskToDelete = state.tasks.find((t: Task) => t.id === action.payload)
            if(taskToDelete){
                return {
                    ...state,
                    tasks: state.tasks.filter((t: Task) => t.id !== action.payload)
                }
            } else {
                return{
                    ...state,
                    error: "The task doesn't exist"
                }
            };
    }
};

const useTaskReducer = () => {
    return useReducer(taskReducer, INITIAL_STATE)
};

export default useTaskReducer;
