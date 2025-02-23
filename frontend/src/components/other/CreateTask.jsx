import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthProvider'
import axios from 'axios';

const CreateTask = () => {

    // const [userData, setUserData] = useContext(AuthContext)

    const [taskTitle, setTaskTitle] = useState('')
    const [taskDescription, setTaskDescription] = useState('')
    const [taskDate, setTaskDate] = useState('')
    const [asignedTo, setAsignedTo] = useState('')
    const [category, setCategory] = useState('')
    const [employees, setEmployees] = useState([]);

    const submitHandler = async (e) => {
        e.preventDefault()

        try {
            const newTask = { taskTitle, taskDescription, taskDate, category, asignedTo: asignedTo || null }
            // console.log(newTask)
            const response = await axios.post('http://localhost:5000/api/task/create', newTask, { headers: { 'Content-Type': 'application/json' } });
            // console.log(response)

        } catch (error) {
            console.error(error)
        } finally {
            setTaskTitle('')
            setCategory('')
            setAsignedTo('')
            setTaskDate('')
            setTaskDescription('')
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
                            <option value="">Select Employee</option>
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
                    <button className='bg-emerald-500 py-3 hover:bg-emerald-600 px-5 rounded text-sm mt-4 w-full'>Create Task</button>
                </div>

            </form>
        </div>
    )
}

export default CreateTask