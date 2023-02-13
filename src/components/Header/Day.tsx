import React, { useEffect } from 'react';
import { useState } from "react";
import useDateReducer from '../../hooks/dateReducer';
import useTaskReducer from '../../hooks/taskReducer';

type Props = {
    date: number
    updateDay: Function
    handleUpdateDayTask: Function
}

export default function Day({date, updateDay, handleUpdateDayTask}: Props) {
    const [days, setDays] = useState <Array<Date>>([]);
    const dayArrays: Date[] = []

    useEffect(() => {
        for (let i = 0; i < 7; i++) {
            const newDate = new Date()
            newDate.setDate(date + i)
            dayArrays.push(newDate);
        }
        
        setDays(dayArrays)
    }, [])

    return (
        <div>
        {days.map((d, i) => {
            return(
                <div key={i} onClick={() => {
                        Number(d.toDateString().split(' ')[2]) === date
                        ? updateDay('Today')
                        : updateDay(d.toDateString().split(' ')[0]);

                        handleUpdateDayTask(d)
                    }}>
                    <span>{d.toDateString().split(' ')[0]}</span>
                    <span>{Number(d.toDateString().split(' ')[2])}</span>
                </div>
            )
        })}
        </div>
    )
}