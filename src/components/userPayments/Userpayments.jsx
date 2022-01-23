import React from 'react';
import User from '../../pages/user/User';
import './userpayments.css';
export default function Userpayments(user) {
    console.log(user.user);
    return( 
        <div className="widgetLg">
    <h3 className="widgetLgTitle">Latest transactions</h3>
    <table className="widgetLgTable">
    <tbody>
        <tr className="widgetLgTr">
        <th className="widgetLgTh">Order Id</th>
        <th className="widgetLgTh">Payemnt Id</th>
        <th className="widgetLgTh">Date</th>
        <th className="widgetLgTh">Plan</th>
        <th className="widgetLgTh">Amount</th>
        </tr>
        
        {user.user.payments.map((item,index)=>(
            <tr className="widgetLgTr" key={index}>
                <td className="widgetLgOrderId">
                    <span className="widgetLgName">{'# '+item.orderId}</span>
                </td>
                <td className="widgetLgPayemntId">{'# '+item.paymentId}</td>
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
