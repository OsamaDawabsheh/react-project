import React from 'react'
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { CartContext } from '../context/Cart';

function UserRouter({ children }) {
    const token = localStorage.getItem('userToken');
    if (!token ) {
        return <Navigate to='/login' />
    }

    return children
}

export default UserRouter
