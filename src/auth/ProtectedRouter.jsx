import React from 'react'
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { CartContext } from '../context/Cart';

function ProtectedRouter({ children }) {
    const token = localStorage.getItem('userToken');
    const count = useContext(CartContext);
    if (!token && !(children.type.name === 'Login' || children.type.name === 'Register')) {
        return <Navigate to='/login' />
    }
    else if ( token && (children.type.name === 'Login' || children.type.name === 'Register')) {
        return <Navigate to='/' />
    }

    return children
}

export default ProtectedRouter
