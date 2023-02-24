import axios from "axios"
import { Task } from "../constants/types/task"
import { BACK_URL } from "../constants/variables"
import { TaskReducerAction, TaskInitialState } from "../hooks/taskReducer";

import { axiosClient } from "../network/apiClient";


/* This postTask service will work as action conecting the dispatch with the promise to the server */
export function postTask (task: Task, dispatch: React.Dispatch<TaskReducerAction>){ // Requering the task and the dispatch brought from the taskReducer invoked on Body.tsx


    /* We import our axios instance and pass our route and task to create*/
        axiosClient.post('task',task)
    
    /* Once posted the task we receive the response */
        .then((res) => {

            /* Unfortunately the JSON converts the day format to string, our logic accepts just Date type so we convert again the string into a Date */
            const newDate = new Date()
            const arrayDate: String[] = res.data.day.split('-')
            
            newDate.setDate(Number(arrayDate[2][0] + arrayDate[2][1]))
            newDate.setMonth(Number(arrayDate[1]))
            newDate.setFullYear(Number(arrayDate[0]))
            
            /* We dispatch the action including the task object to be added into the array of tasks */
            dispatch({
                type: "add_task",
                payload: {...res.data, day: newDate}
            })
        })

        /* Error handler */
        .catch(error => {

            /* We verify if is a know error, if not we handle it as unexpected error */
            if (axios.isAxiosError(error)) {

            console.log('error message: ', error.message);
            dispatch({
                type: "error",
                payload: error.message
            })

            } else {

            console.log('unexpected error: ', error);
            dispatch({
                type: "error",
                payload: error.message
            })
            }
        })
}

export function getTasks (dispatch: React.Dispatch<TaskReducerAction>){
    axios(BACK_URL)
}