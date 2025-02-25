import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios';

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {

    const [ user, setUser ] = useState(null);

    const getUserData = async () => {
        const response = await axios.get('http://localhost:5000/api/user/profile', { withCredentials: true});
        if (response.data.success) {
          setUser(response.data.user)
        }
      }
    
      useEffect(() => {
        getUserData()
      },[])

    return (
        <div>
            <AuthContext.Provider value={{ user, setUser }}>
                {children}
            </AuthContext.Provider>
        </div>
    )
}

export default AuthProvider