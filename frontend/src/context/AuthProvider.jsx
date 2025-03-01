import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);

  const getUserData = async () => {
    if (!user === null) {
      const response = await axios.get(`${API_BASE_URL}user/profile`, { withCredentials: true });
      if (response.data.success) {
        setUser(response.data.user);
      }
    }
  }

  useEffect(() => {
    getUserData()
  }, [])

  return (
    <div>
      <AuthContext.Provider value={{ user, setUser }}>
        {children}
      </AuthContext.Provider>
    </div>
  )
}

export default AuthProvider