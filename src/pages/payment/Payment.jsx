
import './payment.css'
import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { DeleteOutline } from "@material-ui/icons";
import axios from 'axios';
export default function Payment() {
    const [data, setData] = useState([]);
    useEffect(() => {
        const getData = async ()=>{
            try{
                const response = await axios.get('https://apibootflix.herokuapp.com/getAllPayments');
                setData(response.data)
            }catch(err){
                console.log(err.message);
            }
        }
        getData();
    }, [])
    console.log(data);
    const columns = [
        {
            field: "user",
            headerName: "USER",
            width: 250,
            renderCell: (params) => {
                return (
                    <div className="userListUser">
                    <img className="userListImg" src={params.row.profilePic} alt="" />
                    {params.row.firstName} {params.row.lastName}
                </div>
                );
            },
            },
        { field: "orderId", headerName: "ORDER ID", width: 250 },
        { field: "paymentId", headerName: "PAYMENT ID", width: 250 },
        
        {
            field: "date",
            headerName: "DATE",
            width: 150,
        },
        {
            field: "toPlan",
            headerName: "PLAN",
            width: 150,
        },
        {
            field: "amount",
            headerName: "AMOUNT",
            width: 150,
            renderCell: (params) => {
                return (
                <div className="userListUser">
                    ₹ {params.row.toPlan==='Standard' ? 399 : 799}
                </div>
                );
            },
            },
    ];
    
    return (
        <div className="payment">
            <DataGrid
            rows={data}
            disableSelectionOnClick
            columns={columns}
            pageSize={8}
            checkboxSelection
            getRowId={r=>r._id}
            />
        </div>
    )
}
