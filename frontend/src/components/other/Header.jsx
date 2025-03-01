import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { AuthContext } from '../../context/AuthProvider';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { toastDark } from '../../utils/toast.js';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Header = () => {

  const {user} = useContext(AuthContext);

  const navigate = useNavigate();

  const logOutUser = async ()=>{
    try {
      const response = await axios.get(`${API_BASE_URL}user/logout`, { withCredentials: true });
      if (response.data.success) {
        navigate('/');
        toast.success("Logged out successfully!", toastDark);
      }
    } catch (error) {
      console.error(error);
    }
  }


  return (
    <div className='flex items-end justify-between'>
        <h1 className='text-2xl font-medium'>Hello <br /> <span className='text-3xl font-semibold'>{user?.name} 👋</span></h1>
        <button onClick={logOutUser} className='bg-red-600 text-base font-medium text-white px-5 py-2 rounded-sm'>Log Out</button>
    </div>
  )
}

export default Header