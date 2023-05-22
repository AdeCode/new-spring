import React, { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContexts'
import {Navigate, useLocation} from 'react-router-dom'


function ProtectedRoute({children}) {
    const {state:user} = useContext(AuthContext)

    const location = useLocation()

    const isAuth = JSON.parse(localStorage.getItem('isAuthenticated'))

    if (!isAuth) {
        return <Navigate to="/" replace state={{from:location}}/>;
    }

  return children
}

export default ProtectedRoute