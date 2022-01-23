import axios from 'axios';
import React, { useEffect, useState } from 'react';
import logo from '../../images/logo.png'
import Userpayments from '../userPayments/Userpayments';
import './userdetails.css'
export default function UserDetails(id) {
    console.log(id.userId);
    const [user, setuser] = useState([]);
    const [loading, setloading] = useState(false);
    useEffect(() => {
        const getData = async ()=>{
            try{
                const response = await axios.get('https://apibootflix.herokuapp.com/users/'+id.userId);
                setuser(response.data);
                setloading(true);
            }catch(err){
                console.log(err.message);
            }
        }
        getData();
    }, []);
    console.log(user);
    
    return(
        <>
            { 
                loading && 
                <>
                    <div className='userDetails'>
                    <div className="userDetails_Box">
                        <div className="userDetailsProfile">
                            <img src={user.profilePic} alt="Profile Img" />
                        </div>
                        <div className="userDetailsBody">
                            <div className="userDetailsItem">
                                <span className="userDetailsItemLabel">ID</span>
                                <span className="userDetailsItemOutput">{user._id}</span>
                            </div>
                            <div className="userDetailsItem">
                                <span className="userDetailsItemLabel">Name</span>
                                <span className="userDetailsItemOutput">{user.firstName} {user.lastName}</span>
                            </div>
                            <div className="userDetailsItem">
                                <span className="userDetailsItemLabel">Linked Account</span>
                                <span className="userDetailsItemOutput">{user.tid ? "Twitter" : "Google"}</span>
                            </div>
                            <div className="userDetailsItem">
                                <span className="userDetailsItemLabel">{user.tid ? "twitter Uname" : "email"}</span>
                                <span className="userDetailsItemOutput">{user.handle}</span>
                            </div>
                            <div className="userDetailsItem">
                                <span className="userDetailsItemLabel">Plan</span>
                                <span className="userDetailsItemOutput">{user.plan.plan}</span>
                            </div>
                            {user.plan.plan!=='Free' && <div className="userDetailsItem">
                                <span className="userDetailsItemLabel">Plan expires At</span>
                                <span className="userDetailsItemOutput">{user.plan.days+'d'}</span>
                            </div>}
                        </div>
                    </div>
                </div>
                {user.payments.length>0 &&  <Userpayments user={user}/>}
                </>
            }
        
        </>
    ) ;
}
