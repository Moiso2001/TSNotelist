import React, {useState} from "react";

import {TbTrash} from "react-icons/tb";
import {GrFavorite} from "react-icons/gr";

type Props = {
    id: string
    title: string
    text?: string
    hour?: string 
    completed: boolean
    completeTask: Function
    deleteTask: Function
};

const Task = ({id, title, text, hour, completed, completeTask, deleteTask}: Props) => {
    const [isOpen, setIsOpen] = useState<Boolean>(false)

    return(
        <div>
            <div>
                <div>
                    <input checked={completed} type="checkbox" name="completed" onClick={() => completeTask(id, !completed)}/>
                </div>
                <div>
                    <h5>{title}</h5>
                </div>
                <div>
                    <span>{text}</span>
                </div>
                <div>
                    <span>{hour}</span>
                </div>
            </div>
            <div>
                <TbTrash onClick={() => deleteTask(id)}/>
                <GrFavorite/>
            </div>
        </div>
    )
}

export default Task;