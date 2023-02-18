import React, {useEffect, useState} from "react";

import {TbTrash} from "react-icons/tb";
import {MdDriveFileMoveOutline} from "react-icons/md";
import {AiOutlineEdit} from "react-icons/ai"

import styles from "./Task.module.css"

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
    const [isOpen, setIsOpen] = useState<Boolean>(false);
    
    return(
        <div className={styles.divExtra}>
            <div className={styles.divGlobal}>
                <div className={styles.divContent}>
                    <div className={styles.divContentFirst}>
                        <div>
                            <input checked={completed} type="checkbox" name="completed" onChange={() => completeTask(id, !completed)}/>
                        </div>
                        <div onClick={() => setIsOpen(!isOpen)}>
                            <h5>{title}</h5>
                        </div>
                    </div>
                    <div className={styles.divContentSecond}>
                        <div>
                            <span>{hour}</span>
                        </div>
                    </div>
                </div>
                <div className={styles.divTaskActions}>
                    <div className={styles.divIcons}>
                        <AiOutlineEdit className={styles.icon}/>
                        <span className={styles.span}>Edit</span>
                    </div>
                    <div className={styles.divIcons}>
                        <MdDriveFileMoveOutline className={styles.icon}/>
                        <span className={styles.span}>Move</span>
                    </div>
                    <div className={styles.divIcons}>
                        <TbTrash className={styles.icon} onClick={() => deleteTask(id)}/>
                        <span className={styles.span}>Delete</span>
                    </div>
                </div>
            </div>
            <div className={isOpen? styles.isOpen : styles.isNoOpen}>
                <span>Description: </span>
                <p>{text || 'There is no description'}</p>
            </div>
        </div>
    )
}

export default Task;