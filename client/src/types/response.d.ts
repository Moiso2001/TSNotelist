import { Task } from "./task"

export type axiosResponse = {
    data: Task |  AxiosError<any, any>
    status: number | boolean
}