import React, { createContext, useReducer } from 'react'
import { authReducer } from "../reducers/AuthReducer";

export const AuthContext = createContext()

const initialState = {};

function AuthContextProvider({children}) {
    const [state, dispatch] = useReducer(authReducer, initialState,()=>{
      const localDataState = {}
      const localData = localStorage.getItem('user');
      const isAuth = localStorage.getItem('isAuthenticated');
      isAuth && JSON.parse(isAuth)
      localDataState.isAuthenticated = isAuth
      localDataState.user=JSON.parse(localData)
      return localDataState.user ? localDataState : {}
    })
  return (
    <AuthContext.Provider value={{state, dispatch}}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider