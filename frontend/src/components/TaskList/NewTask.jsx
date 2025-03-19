import React, { useState } from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';
import { toastDark } from '../../utils/toast';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const NewTask = ({data}) => {
   
    const [task, setTask] = useState(data); 

    const handleAcceptTask = async () => {
        try {

            const token = localStorage.getItem("token");
            const response = await axios.patch(
                `${API_BASE_URL}/task/accept-task/${task._id}`, 
                {}, // No request body needed
                {
                    headers: {
                        "Authorization": `Bearer ${token}`, // Include token in request
                        "Content-Type": "application/json"
                    },
                    withCredentials: true // Ensure cookies are sent if using sessions
                }
            );
    
            setTask(response.data); 
            toast.success("Task accepted!", toastDark);
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <div className='flex-shrink-0 h-full w-[300px] p-5 bg-[#000] rounded-xl'>
            <div className='flex justify-center gap-2 items-center'>
                <h3 className='bg-red-600 text-sm px-3 py-1 rounded'>{data.category}</h3>
                <h4 className='text-sm'>{data.taskDate}</h4>
            </div>
            <h2 className='mt-5 text-2xl font-semibold'>{data.taskTitle}</h2>
            <p className='text-sm mt-2'>
                {data.taskDescription}
            </p>
            <div className='mt-6'>
            <button
                    onClick={handleAcceptTask}
                    className={`rounded font-medium py-1 px-2 text-xs ${
                        task.active ? 'bg-green-500' : 'bg-blue-500'
                    }`}
                >
                    {task.active ? 'Accepted' : 'Accept Task'}
                </button>
            </div>
        </div>
    )
}

export default NewTask