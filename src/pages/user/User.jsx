import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import UserDetails from '../../components/userDetails/UserDetails';
import './user.css'
export default function User() {
    const location = useLocation();
    const userId=location.pathname.split('/')[2];
    console.log(userId);
    
    
    return (
        <div className='user'>
            
            <div className="userBox">
                <div className="userDetailsHead">
                    <h1 className="userDetailsTitle">USER</h1>
                </div>
                <UserDetails userId={userId}/>
            </div>
        </div>
    )
}
