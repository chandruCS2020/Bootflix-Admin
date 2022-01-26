import React, { useEffect, useMemo, useState } from 'react'
import Chart from '../../components/chart/Chart'
import './home.css'
import FeatureInfo from '../../components/featureInfo/FeatureInfo'
import WidgetSm from '../../components/widgetSm/WidgetSm'
import WidgetLg from '../../components/widgetLg/WidgetLg'
import axios from 'axios'
export default function Home() {
    const MONTH = useMemo(
        () => [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ],
        []
    )
    const [stats, setstats] = useState([]);
    useEffect(() => {
        const getData = async ()=>{
            try{
                const response = await axios.get('https://apibootflix.herokuapp.com/getMonthlyusers',{withCredentials:true});
                response.data.map(item=> setstats(prev=>[...prev,{name:MONTH[item.month-1] , "New User" : item.count}]))
            }catch(err){
                console.log(err.message)
            }
        }
        getData();
    }, [MONTH])
    console.log(stats)
    return (
        <div className='home'>
            <FeatureInfo />
            <Chart data={stats} title="User Analytics" grid dataKey="New User"/>
            <div className="homeWidgets">
                <WidgetSm />
                <WidgetLg />
            </div>
        </div>
    )
}
