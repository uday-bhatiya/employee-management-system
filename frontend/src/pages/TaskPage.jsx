import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const TaskPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [formData, setFormData] = useState({ taskTitle: '', taskDescription: '', category: ''});

  const fetchTask = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/task/get-task/${id}`, {withCredentials: true});
      if (response.data.success) {
        setTask(response.data.task);
        setFormData({
          taskTitle: response.data.task.taskTitle,
          taskDescription: response.data.task.taskDescription,
          category: response.data.task.category
        })
      }

      console.log(task)
      console.log(formData)

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTask();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/api/task/update-task/${id}`, formData, {withCredentials: true});
      navigate('/adm-dash');
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/task/delete-task/${id}`, {withCredentials:true});
      navigate('/adm-dash');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='p-5 bg-gray-800 text-white flex flex-col gap-3'>
      {task ? (
        <>
          <h2 className='text-2xl mb-4'>Edit Task</h2>
          <div className='flex flex-col gap-2 text-black'>
          <label >Title</label>
          <input className='mb-2 p-2' name='taskTitle' value={formData.taskTitle} onChange={handleChange} />
          </div>
          <div className='flex flex-col gap-2 text-black'>
         <label >Category</label>
         <input className='mb-2 p-2' name='category' value={formData.category} onChange={handleChange} />
         </div>
          <div className='flex flex-col gap-2 text-black'>
         <label >Asigned To</label>
         <input disabled className='mb-2 p-2' value={task.asignedTo.name}  />
         </div>
         <div className='flex flex-col gap-2 text-black'>
        <label >Description</label>
        <textarea className='mb-2 p-2' name='taskDescription' value={formData.taskDescription} onChange={handleChange} />
        </div>
        <div className='flex gap-2 text-black'>
          <button onClick={handleUpdate} className='bg-green-500 px-4 py-2'>Update</button>
          <button onClick={handleDelete} className='bg-red-500 px-4 py-2 ml-2'>Delete</button>
          </div>
        </>
      ) : (
        <div className=' p-5 bg-gray-800 text-white'>
            <p>Loading....</p>
        </div>
      )}
    </div>
  );
};

export default TaskPage;
