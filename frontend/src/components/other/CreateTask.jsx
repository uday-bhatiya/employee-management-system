import React, { useContext, useEffect, useState } from 'react'
import {Loader2} from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { toastDark } from '../../utils/toast';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const CreateTask = () => {

   const [ loading , setLoading ] = useState(false);

    const [taskTitle, setTaskTitle] = useState('')
    const [taskDescription, setTaskDescription] = useState('')
    const [taskDate, setTaskDate] = useState('')
    const [asignedTo, setAsignedTo] = useState('')
    const [category, setCategory] = useState('')
    const [employees, setEmployees] = useState([]);

    const submitHandler = async (e) => {
        e.preventDefault()

        try {
            setLoading(true);
            const newTask = { taskTitle, taskDescription, taskDate, category, asignedTo: asignedTo || null }
            // console.log(newTask)
            const response = await axios.post(`${API_BASE_URL}task/create`, newTask, { headers: { 'Content-Type': 'application/json' } });
            // console.log(response)
            toast.success("Task created!", toastDark);

        } catch (error) {
            console.error(error)
        } finally {
            setTaskTitle('')
            setCategory('')
            setAsignedTo('')
            setTaskDate('')
            setTaskDescription('')
            setLoading(false);
        }

    }

    const getALlEmployees = async () => {
        const response = await axios.get('http://localhost:5000/api/user/getAllEmp', { withCredentials: true });
        // console.log(response)
        setEmployees(response.data.employees);
    }

    useEffect(() => {
        getALlEmployees();
    }, []);

    return (
        <div className='p-5 bg-[#1c1c1c] mt-5 rounded'>
            <form onSubmit={(e) => {
                submitHandler(e)
            }}
                className='flex flex-wrap w-full items-start justify-between'
            >
                <div className='w-1/2'>
                    <div>
                        <h3 className='text-sm text-gray-300 mb-0.5'>Task Title</h3>
                        <input
                            value={taskTitle}
                            onChange={(e) => {
                                setTaskTitle(e.target.value)
                            }}
                            className='text-sm py-1 px-2 w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4' type="text" placeholder='Make a UI design'
                        />
                    </div>
                    <div>
                        <h3 className='text-sm text-gray-300 mb-0.5'>Date</h3>
                        <input
                            value={taskDate}
                            onChange={(e) => {
                                setTaskDate(e.target.value)
                            }}
                            className='text-sm py-1 px-2 w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4' type="date" />
                    </div>
                    <div>
                        <h3 className='text-sm text-gray-300 mb-0.5'>Asign to</h3>
                        <select value={asignedTo}
                            onChange={(e) => setAsignedTo(e.target.value)} name="" className='text-sm py-1 px-2 w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4'>
                            <option className='bg-black' value="">Select Employee</option>
                            {employees.map((emp) => (
                                <option className='bg-black' key={emp._id} value={emp._id}>{emp.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <h3 className='text-sm text-gray-300 mb-0.5'>Category</h3>
                        <input
                            value={category}
                            onChange={(e) => {
                                setCategory(e.target.value)
                            }}
                            className='text-sm py-1 px-2 w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4' type="text" placeholder='design, dev, etc' />
                    </div>
                </div>

                <div className='w-2/5 flex flex-col items-start'>
                    <h3 className='text-sm text-gray-300 mb-0.5'>Description</h3>
                    <textarea value={taskDescription}
                        onChange={(e) => {
                            setTaskDescription(e.target.value)
                        }} className='w-full h-44 text-sm py-2 px-4 rounded outline-none bg-transparent border-[1px] border-gray-400' name="" id=""></textarea>
                    <button className='bg-emerald-500 flex items-center justify-center py-3 hover:bg-emerald-600 px-5 rounded text-sm mt-4 w-full'>{loading? <Loader2  className='animate-spin' /> : "Create Task"}</button>
                </div>

            </form>
        </div>
    )
}

export default CreateTask