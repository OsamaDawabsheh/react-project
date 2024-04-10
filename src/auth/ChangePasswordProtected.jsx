import React from 'react'
import { Navigate } from 'react-router-dom';


function ChangePasswordProtected({children}) {
    const changePassword = localStorage.getItem('changePassword');
    if (!changePassword) {
        return <Navigate to='/login' />
    }
    
    return children
}

export default ChangePasswordProtected
