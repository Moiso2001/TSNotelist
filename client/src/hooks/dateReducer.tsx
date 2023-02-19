import { useReducer } from "react";

const INITIAL_STATE = {
    date: new Date(),
    day: 'Today'
};

type DateInitialState = {
    date: Date
    day: string
}

type DateReducerAction = 
{
    type: "update_day",
    payload: string
} | {
    type: "set_day",
    payload: Date
};


const dateReducer = (state: DateInitialState , action: DateReducerAction) => {
    switch(action.type){
        case "update_day":
            const newDay = action.payload
            return {
                ...state,
                day: action.payload
            }
        case "set_day":
            return {
                ...state,
                date: action.payload
            }
    }
};

const useDateReducer = () => {
    return useReducer(dateReducer, INITIAL_STATE)
};

export default useDateReducer;