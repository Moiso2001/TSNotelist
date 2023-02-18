import {useState} from "react";
import { v4 as uuidv4 } from "uuid";

import { Task } from "../../types/task";

import {MdOutlineAddCircle} from "react-icons/md";

import styles from "./Create.module.css"

type Props = {
    createTask: Function
}

type Error = {
    title: string | boolean
    text: string | boolean
}

const CreateTask = ({createTask}: Props) => {
    const [dayInput, setDayInput] = useState<string>('0000-00-00')
    const [error, setError] = useState<Error>({title: false, text: false});
    const [isOpen, setIsOpen] = useState<Boolean>(false);
    const [task, setTask] = useState<Task>({
        id: uuidv4(),
        title: "",
        text: "",
        hour: "",
        completed: false,
        day: new Date()
    })

    const validation = function(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>){
        const error: Error = {title: false, text: false};
        const {target: {name, value}} = e;

        if(name === 'text' && value.length > 139){
            error.text= 'Text is up to 140 characters'
        }
        else if(name === 'title' && value.length > 50){
            error.title = 'Title is up to 50 characters'
        }

        return error
    }

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        setError(validation(e));
        

        if(error.text || error.title){
            return
        }
        setTask({
            ...task,
            [e.target.name]: e.target.value
        })
    }
    
    const handleDate = (e: React.ChangeEvent<HTMLInputElement>) => {
        const date = e.target.value.split('-');
        setDayInput(date.join('-'))
        
        const newDate = new Date()
        newDate.setDate(Number(date[2]))
        newDate.setMonth(Number(date[1]))
        newDate.setFullYear(Number(date[0]))
        
        setTask({
            ...task,
            [e.target.name]: newDate
        })
    };
    
    const handleOnSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(task.title.length > 0){
            createTask(task);
            setTask({
                id: uuidv4(),
                title: "",
                text: "",
                hour: "",
                completed: false,
                day: new Date()
            });
            setDayInput('0000-00-00')
        } else {
            alert('Is missing information about the task')
        }
    };

    return (
        <div>
            <div>
                <MdOutlineAddCircle/>
            </div>
            <form onSubmit={handleOnSubmit}>
                <div>
                    <label>Title</label>
                    <input className={error.title ? styles.error : styles.inputTitle} required name="title" value={task.title} onChange={handleOnChange}/>
                    <span>{error.title}</span>
                </div>
                <div>
                    <label>Hour</label>
                    <input type="time" name="hour" value={task.hour} onChange={handleOnChange}/>
                    <label>Day</label>
                    <input required type="date" name="day" onChange={handleDate} value={dayInput}/>
                </div>
                <div>
                    <label>Description</label>
                    <textarea className={error.text ? styles.error : styles.inputText} name="text" value={task.text} onChange={handleOnChange}/>
                    <span>Length: {task.text?.length}/140</span>
                </div>
                <div>
                    <button onClick={handleOnSubmit} type="submit">Create</button>
                </div>
            </form>
        </div>
    )
}

export default CreateTask;