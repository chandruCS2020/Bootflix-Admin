import React from 'react'
import { useLocation } from 'react-router-dom'
import './user.css'
export default function User() {
    const location = useLocation();
    console.log(location.user)
    return (
        <div className='user'>
            users
        </div>
    )
}
