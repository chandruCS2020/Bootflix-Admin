import React, { useEffect, useState } from 'react'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import './featureInfo.css'
import axios from 'axios'
export default function FeatureInfo() {
    const [data, setdata] = useState([]);
    useEffect(() => {
        async function getData(){
            try{
                const res= await axios.get('https://apibootflix.herokuapp.com/userDivisons',{withCredentials:true});
                setdata(res.data);
            }catch(err){
                console.log(err.message);
            }
        }
        getData();
    }, [])
    console.log(data)

    return (
        <div className='featured'>
            <div className="featuredItem">
                <span className="featuredTitle">Users</span>
                <div className="featuredConatinerInfo">
                    <span className="featuredCount">{data.curMonthUsers}</span>
                    <span className="featuredCountRate">
                        {data.userComparision}  {data.userComparision>0 ?  <ArrowUpwardIcon  className="featuredIcon positive"/> : <ArrowDownwardIcon  className="featuredIcon negative"/>}
                    </span>
                </div>
                <span className="featuredSub">Compared to last month</span>
            </div>
            <div className="featuredItem">
                <span className="featuredTitle">Revenue</span>
                <div className="featuredConatinerInfo">
                    <span className="featuredCount">₹ {data.curMonthRevenue}</span>
                    <span className="featuredCountRate">
                        {data.revenueComparision} {data.revenueComparision>0 ?  <ArrowUpwardIcon  className="featuredIcon positive"/> : <ArrowDownwardIcon  className="featuredIcon negative"/>}
                    </span>
                </div>
                <span className="featuredSub">Compared to last month</span>
            </div>
            <div className="featuredItem">
                <span className="featuredTitle">Subscriber</span>
                <div className="featuredConatinerInfo">
                    <span className="featuredCount">{data.totalSubcribers}</span>
                    <span className="featuredCountRate">
                        Subscriber
                    </span>
                </div>
            </div>
            
            
        </div>
    )
}
