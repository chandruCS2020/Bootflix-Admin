import React, { useContext, useState } from 'react'
import { login } from '../../context/authContext/ApiCalls';
import { AuthContext } from '../../context/authContext/AuthContext';
import './login.css';
export default function Login() {
    const {dispatch} = useContext(AuthContext);
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const handleClick = (e)=>{
        e.preventDefault();
        login({email,password},dispatch);
    }
    return (
        
        <div className='login'>
            <div className="loginForm">
            <h1 className="loginTitle">SIGN IN</h1>
                <div className="inputContainer">
                    <label htmlFor="email">Email</label>
                    <input 
                        type="text"
                        name="email" 
                        id="email" 
                        placeholder='admin@gmail.com' 
                        onChange={(e) => setemail(e.target.value)}
                    />
                </div>
                <div className="inputContainer">
                    <label htmlFor="Password">Password</label>
                    <input 
                        type="password" 
                        name="password" 
                        id="Password" 
                        placeholder='Password'
                        onChange={(e) => setpassword(e.target.value)}
                    />
                </div>
                <input type="submit" value="Login" onClick={handleClick} />
            </div>
        </div>
    )
}
