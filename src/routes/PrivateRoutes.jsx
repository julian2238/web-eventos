import React from 'react'
import { Navigate } from 'react-router'

const PrivateRoutes = ({children, user, redirectPath = "/"}) => {
    console.log(children, user)
    if(!user){
        return <Navigate to={redirectPath} replace/>
    }  
    return children
}

export default PrivateRoutes