import axios from "axios";
import { useEffect , useState } from "react";
import "./widgetLg.css";

export default function WidgetLg() {
const [data, setdata] = useState([]);
useEffect(() => {
    const getData = async ()=>{
        try{
            const response = await axios.get('https://apibootflix.herokuapp.com/paymentssTop5',{withCredentials:true});
            setdata(response.data);
        }catch(err){
            console.log(err.message);
        }
    }
    getData();
}, [])
console.log(data);
return (
    <div className="widgetLg">
    <h3 className="widgetLgTitle">Latest transactions</h3>
    <table className="widgetLgTable">
    <tbody>
        <tr className="widgetLgTr">
        <th className="widgetLgTh">Customer</th>
        <th className="widgetLgTh">Date</th>
        <th className="widgetLgTh">Plan</th>
        <th className="widgetLgTh">Amount</th>
        </tr>
        
        {data.map((item,index)=>(
            <tr className="widgetLgTr" key={index}>
                <td className="widgetLgUser">
                    <img
                    src={item.profilePic}
                    alt=""
                    className="widgetLgImg"
                    />
                    <span className="widgetLgName">{item.firstName} {item.lastName}</span>
                </td>
                <td className="widgetLgDate">{item.date}</td>
                <td className="widgetLgPlan">{item.toPlan}</td>
                <td className="widgetLgAmount">₹ {item.toPlan==='Standard' ? 399 : 799}</td>
            </tr>
        ))}
        
        </tbody>
    </table>
    </div>
);
}