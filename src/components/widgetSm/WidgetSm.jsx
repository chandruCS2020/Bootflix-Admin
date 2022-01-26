import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

export default function WidgetSm() {
    const [data, setdata] = useState([]);
    useEffect(() => {
        const getData = async ()=>{
            const response = await axios.get('https://apibootflix.herokuapp.com/userstop5',{withCredentials:true});
            setdata(response.data);
        }
        getData();
    }, [])
    console.log(data);
return (
    <div className="widgetSm">
    <span className="widgetSmTitle">New Join Members</span>
    <ul className="widgetSmList">
        {data.map((item,index)=>(
            <li className="widgetSmListItem" key={index}>
                <img
                    src={item.profilePic}
                    alt=""
                    className="widgetSmImg"
                />
                <div className="widgetSmUser">
                    <span className="widgetSmUsername">{item.firstName} {item.lastName}</span>
                </div>
                <NavLink to={'user/'+item._id} className="widgetSmButton">
                    <Visibility className="widgetSmIcon" />
                    Display
                </NavLink>
            </li>
        ))}
        
    </ul>
    </div>
);
}