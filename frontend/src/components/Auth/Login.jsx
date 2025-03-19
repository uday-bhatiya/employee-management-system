import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { AuthContext } from '../../context/AuthProvider';
import toast from 'react-hot-toast';
import { toastDark } from '../../utils/toast.js';


const Login = () => {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const {setUser} = useContext(AuthContext);

    const navigate = useNavigate();

    const loginUser = async () => {

        if (!email || !password) {
            toast.error("All fields are required", toastDark);
            return;
        }

        if (password.length < 6) {
            toast.error("Password must be atleast 6 character long", toastDark);
            return;
        }

        try {
            const response = await axios.post(`${API_BASE_URL}/user/login`, { email, password }, { withCredentials: true });

            const { token } = response.data; // Extract token from response

            if (token) {
                localStorage.setItem("token", token); // Store token in localStorage
           
            } else {
                console.error("No token received");
                toast.error("No token received", toastDark);
            }

            if (!response.data.success) {
                navigate('/');
                toast.error("Login failed", toastDark);
            }
            if (response.data.user.role === 'employee') {
                setUser(response.data.user);
                navigate('/emp-dash');
                toast.success("Logged in successfully!", toastDark);
                
            } else {
                setUser(response.data.user);
                navigate('/adm-dash');
                toast.success("Logged in successfully!", toastDark);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const submitHandler = (e) => {
        e.preventDefault()
        loginUser();
        setEmail("");
        setPassword("");
    }


  return (
    <div className='flex h-screen w-screen items-center justify-center'>
        <div className='border-2 rounded-xl border-emerald-600 p-20'>
            <form 
            onSubmit={(e)=>{
                submitHandler(e)
            }}
            className='flex flex-col items-center justify-center'
            >
                <input 
                value={email}
                onChange={(e)=>{
                    setEmail(e.target.value)
                }}
                required 
                className='outline-none bg-transparent border-2 border-emerald-600 font-medium text-lg py-2 px-6 rounded-full placeholder:text-gray-400' type="email" placeholder='Enter your email' 
                />
                <input
                value={password}
                onChange={(e)=>{
                    setPassword(e.target.value)
                }}
                required 
                className='outline-none bg-transparent border-2 border-emerald-600 font-medium text-lg py-2 px-6 rounded-full mt-3 placeholder:text-gray-400' type="password" placeholder='Enter password' />
                <button className='mt-7 text-white border-none outline-none hover:bg-emerald-700 font-semibold bg-emerald-600 text-lg py-2 px-8 w-full rounded-full placeholder:text-white'>Log in</button>
            </form>
         <div className='flex items-center justify-center mt-5'>
            <p>New here ? <Link to={'/register'} className='text-blue-500'>click here</Link> </p>
         </div>
        </div>

    </div>
  )
}

export default Login