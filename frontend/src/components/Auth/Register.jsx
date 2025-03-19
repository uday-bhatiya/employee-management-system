import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { toastDark } from '../../utils/toast.js';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('employee'); // Default role is Employee

    const navigate = useNavigate();

    const registerUser = async () => {
        if (!name || !email || !password) {
            toast.error("All fields are required", toastDark);
            return;
        }

        if (password.length < 6) {
            toast.error("Password must be at least 6 characters long", toastDark);
            return;
        }

        try {
            const response = await axios.post(`${API_BASE_URL}/user/register`, {
                name,
                email,
                password,
                role,
            });

            if (response.data.success) {
                navigate('/');
                toast.success("Registered successfully!", toastDark);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Registration failed", toastDark);
        }
    };

    const submitHandler = (e) => {
        e.preventDefault();
        registerUser();
        setName("");
        setEmail("");
        setPassword("");
        setRole("employee");
    };

    return (
        <div className='flex h-screen w-screen items-center justify-center'>
            <div className='border-2 rounded-xl border-emerald-600 p-10 sm:p-20'>
                <form onSubmit={submitHandler} className='flex flex-col items-center justify-center'>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className='outline-none bg-transparent border-2 border-emerald-600 font-medium text-lg mb-3 py-2 px-6 rounded-full placeholder:text-gray-400'
                        type="text"
                        placeholder='Enter your name'
                    />
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className='outline-none bg-transparent border-2 border-emerald-600 font-medium text-lg py-2 px-6 rounded-full placeholder:text-gray-400'
                        type="email"
                        placeholder='Enter your email'
                    />
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className='outline-none bg-transparent border-2 border-emerald-600 font-medium text-lg py-2 px-6 rounded-full mt-3 placeholder:text-gray-400'
                        type="password"
                        placeholder='Enter password'
                    />

                    <div className='flex items-center justify-center gap-3 w-full mt-5'>
                        <span className={`font-semibold text-lg ${role === "employee" ? "text-emerald-600" : "text-gray-400"}`}>
                            Employee
                        </span>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={role === "admin"}
                                onChange={() => setRole(role === "employee" ? "admin" : "employee")}
                            />
                            <div className="w-14 h-7 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-emerald-500 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-7 peer-checked:bg-emerald-600 after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600"></div>
                        </label>
                        <span className={`font-semibold text-lg ${role === "admin" ? "text-emerald-600" : "text-gray-400"}`}>
                            Admin
                        </span>
                    </div>

                    <button className='mt-7 text-white border-none outline-none hover:bg-emerald-700 font-semibold bg-emerald-600 text-lg py-2 px-8 w-full rounded-full'>
                        Register
                    </button>
                </form>

                <div className='flex items-center justify-center mt-5'>
                    <p>Already have an account? <Link to={'/'} className='text-blue-500'>Click here</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Register;
