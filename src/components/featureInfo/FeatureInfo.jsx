import React from 'react'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import './featureInfo.css'
export default function FeatureInfo() {
    return (
        <div className='featured'>
            <div className="featuredItem">
                <span className="featuredTitle">Users</span>
                <div className="featuredConatinerInfo">
                    <span className="featuredCount">23</span>
                    <span className="featuredCountRate">
                        +0.1 <ArrowUpwardIcon  className="featuredIcon positive"/>
                    </span>
                </div>
                <span className="featuredSub">Compared to last month</span>
            </div>
            <div className="featuredItem">
                <span className="featuredTitle">Subcriber</span>
                <div className="featuredConatinerInfo">
                    <span className="featuredCount">10</span>
                    <span className="featuredCountRate">
                        -0.1 <ArrowDownwardIcon  className="featuredIcon negative"/>
                    </span>
                </div>
                <span className="featuredSub">Compared to last month</span>
            </div>
            <div className="featuredItem">
                <span className="featuredTitle">Views</span>
                <div className="featuredConatinerInfo">
                    <span className="featuredCount">1050</span>
                    <span className="featuredCountRate">
                        +0.1 <ArrowUpwardIcon  className="featuredIcon positive"/>
                    </span>
                </div>
                <span className="featuredSub">Compared to last month</span>
            </div>
            
        </div>
    )
}
