import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AllTask = () => {
  const [tasks, setTasks] = useState([]);
  const [counts, setCounts] = useState({
    newTask: 0,
    active: 0,
    completed: 0,
    failed: 0,
  });

  const getAllTasks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/task/get-tasks');
      if (response.data.success) {
        setTasks(response.data.tasks);

        // Calculate counts
        const newTaskCount = response.data.tasks.filter(task => task.newTask).length;
        const activeCount = response.data.tasks.filter(task => task.active).length;
        const completedCount = response.data.tasks.filter(task => task.completed).length;
        const failedCount = response.data.tasks.filter(task => task.failed).length;

        setCounts({
          newTask: newTaskCount,
          active: activeCount,
          completed: completedCount,
          failed: failedCount,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllTasks();
  }, []);

  return (
    <div className='bg-[#1c1c1c] p-5 rounded mt-5'>
      <div className='bg-red-400 mb-2 py-2 px-4 flex justify-between rounded'>
        <h2 className='text-lg font-medium w-1/5'>Employee Name</h2>
        <h3 className='text-lg font-medium w-1/5'>New Task: {counts.newTask}</h3>
        <h5 className='text-lg font-medium w-1/5'>Active Task: {counts.active}</h5>
        <h5 className='text-lg font-medium w-1/5'>Completed: {counts.completed}</h5>
        <h5 className='text-lg font-medium w-1/5'>Failed: {counts.failed}</h5>
      </div>
      <div>
        {tasks.map((task, index) => (
          <div key={index} className='border-2 border-emerald-500 mb-2 py-2 px-4 flex justify-between rounded'>
            <h2 className='text-lg font-medium w-1/5'>{task.asignedTo.name}</h2>
            <h3 className='text-lg font-medium w-1/5 text-blue-400'>{task.newTask ? "Yes" : "No"}</h3>
            <h5 className='text-lg font-medium w-1/5 text-yellow-400'>{task.active ? "Yes" : "No"}</h5>
            <h5 className='text-lg font-medium w-1/5 text-white'>{task.completed ? "Yes" : "No"}</h5>
            <h5 className='text-lg font-medium w-1/5 text-red-600'>{task.failed ? "Yes" : "No"}</h5>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllTask;
