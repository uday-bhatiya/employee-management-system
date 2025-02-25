import React, { useEffect, useState } from 'react'
import Header from '../other/Header'
import TaskListNumbers from '../other/TaskListNumbers'
import TaskList from '../TaskList/TaskList'
import axios from 'axios'

const EmployeeDashboard = () => {

  const [tasks, setTasks] = useState([]);
    const [counts, setCounts] = useState({
      newTask: 0,
      active: 0,
      completed: 0,
      failed: 0,
    });

  const getTasks = async () => {
    const response = await axios.get('http://localhost:5000/api/task/get-emp-tasks', {withCredentials: true});
    // console.log(response)
    if (response.data.success) {
      setTasks(response.data.tasks)
    }

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

  useEffect(() => {
    getTasks()
  }, [tasks]);

  return (
    <div className='p-10 bg-[#1C1C1C] h-screen'>
        
        <Header />
        <TaskListNumbers data={counts} />
        <TaskList data={tasks} />
    </div>
  )
}

export default EmployeeDashboard