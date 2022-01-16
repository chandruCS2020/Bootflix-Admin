import React, { useContext } from 'react';
import logo from '../../images/logo.png';
import './topbar.css'
import {Link} from 'react-router-dom';
import { Settings } from "@material-ui/icons";
import { AuthContext } from '../../context/authContext/AuthContext';
import { logouts } from '../../context/authContext/ApiCalls';
export default function Topbar() {
    const {dispatch} = useContext(AuthContext);
    const handleLogout = (e)=>{
        e.preventDefault();
        logouts(dispatch);
    }
    return (
        <div className="topbar">
            <div className="topbarwrapper">
                <div className="topLeft">
                    <span className="logo"><img src={logo} alt="" /></span>
                </div>
                <div className="topRight">
                    <div className="topbarIconContainer">
                        <Settings />
                        <div className="dropdownBar">
                            <div onClick={handleLogout}>Log Out</div>
                        </div>
                    </div>
                    <img src="https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" className="topAvatar" />
                </div>
            </div>
        </div>
    )
}
