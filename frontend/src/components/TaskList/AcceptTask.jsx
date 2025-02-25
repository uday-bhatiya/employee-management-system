import React, { useState } from 'react'
import axios from 'axios';

const AcceptTask = ({ data }) => {

    const [task, setTask] = useState(data);

    const handleTaskCompleted = async () => {
        try {

            const token = localStorage.getItem("token");
            const response = await axios.patch(
                `http://localhost:5000/api/task/complete-task/${task._id}`,
                {}, // No request body needed
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    withCredentials: true 
                }
            );

            setTask(response.data);
            console.log('Task updated:', response.data);
        } catch (error) {
            console.error(error);
        }
    };
    const handleTaskFailed = async () => {
        try {

            const token = localStorage.getItem("token");
            const response = await axios.patch(
                `http://localhost:5000/api/task/fail-task/${task._id}`,
                {}, 
                {
                    headers: {
                        "Authorization": `Bearer ${token}`, 
                        "Content-Type": "application/json"
                    },
                    withCredentials: true //
                }
            );

            setTask(response.data);
            console.log('Task updated:', response.data);
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div className='flex-shrink-0 h-full w-[300px] p-5 bg-gray-800 rounded-xl'>
            <div className='flex justify-between items-center'>
                <h3 className='bg-red-600 text-sm px-3 py-1 rounded'>{data.category}</h3>
                <h4 className='text-sm'>{data.taskDate}</h4>
            </div>
            <h2 className='mt-5 text-2xl font-semibold'>{data.taskTitle}</h2>
            <p className='text-sm mt-2'>
                {data.taskDescription}
            </p>
            <div className='flex justify-between mt-6 '>
                <button onClick={handleTaskCompleted} className='bg-green-500 rounded font-medium py-1 px-2 text-xs'>{task.completed ? 'Completed' : 'Mark as completed'}</button>
                <button onClick={handleTaskFailed} className='bg-red-500 rounded font-medium py-1 px-2 text-xs'>{task.failed ? 'Failed' : 'Mark as failed'}</button>
            </div>
        </div>
    )
}

export default AcceptTask