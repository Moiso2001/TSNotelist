import {useState} from "react";
import { v4 as uuidv4 } from "uuid";

import { Task } from "../../types/task";

import {MdOutlineAddCircle} from "react-icons/md"

type Props = {
    createTask: Function
}

const CreateTask = ({createTask}: Props) => {
    const [isOpen, setIsOpen] = useState<Boolean>(false);
    const [task, setTask] = useState<Task>({
        id: uuidv4(),
        title: "",
        text: "",
        hour: "",
        completed: false,
    })

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        setTask({
            ...task,
            [e.target.name]: e.target.value
        })
    }

    const handleOnSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(task.title.length > 0 ){
            createTask(task);
            setTask({
                id: uuidv4(),
                title: "",
                text: "",
                hour: "",
                completed: false,
            });
        } else {
            alert('Is missing information about the task')
        }
    }

    return (
        <div>
            <div>
                <MdOutlineAddCircle/>
            </div>
            <form onSubmit={handleOnSubmit}>
                <div>
                    <label>Title</label>
                    <input name="title" value={task.title} onChange={handleOnChange}/>
                    <label>Hour</label>
                    <input type="time" name="hour" value={task.hour} onChange={handleOnChange}/>
                </div>
                <div>
                    <label>Description</label>
                    <textarea name="text" value={task.text} onChange={handleOnChange}/>
                </div>
                <div>
                    <button onClick={handleOnSubmit} type="submit">Create</button>
                </div>
            </form>
        </div>
    )
}

export default CreateTask;