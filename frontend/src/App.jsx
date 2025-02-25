import React, { useContext, useEffect, useState } from 'react'
import Login from './components/Auth/Login'
import EmployeeDashboard from './components/Dashboard/EmployeeDashboard'
import AdminDashboard from './components/Dashboard/AdminDashboard'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './components/Auth/Register'

const App = () => {
  return (
    <>
     <BrowserRouter>
     <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/emp-dash' element={<EmployeeDashboard />} />
      <Route path='/adm-dash' element={<AdminDashboard />} />
     </Routes>
     </BrowserRouter>
    </>
  )
}

export default App