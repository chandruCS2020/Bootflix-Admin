import React, { useEffect, useState } from 'react'
import './userList.css';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { DeleteOutline } from "@material-ui/icons";
import axios from 'axios';
export default function UserList() {
    const [data, setData] = useState([]);
    const handleDelete = (_id) => {
        setData(data.filter((item) => item._id !== _id));
    };
    useEffect(() => {
        const getData = async ()=>{
            try{
                const response = await axios.get('https://apibootflix.herokuapp.com/users',{withCredentials:true});
                setData(response.data)
            }catch(err){
                console.log(err.message);
            }
        }
        getData();
    }, [])
    console.log(data)
    const columns = [
        { field: "_id", headerName: "ID", width: 250 },
        {
        field: "user",
        headerName: "User",
        width: 300,
        renderCell: (params) => {
            return (
            <div className="userListUser">
                <img className="userListImg" src={params.row.profilePic} alt="" />
                {params.row.firstName} {params.row.lastName}
            </div>
            );
        },
        },
        {
        field: "email",
        headerName: "email",
        width: 250,
        },
        {
        field: "plan.plan",
        headerName: "Plan",
        width: 160,
        renderCell: (params) => {
            return (
            <div className="userListUser">
                {params.row.plan.plan}
            </div>
            );
        },
        },
        {
        field: "action",
        headerName: "Action",
        width: 150,
        renderCell: (params) => {
            return (
            <>
                <Link to={{pathname:"/user/" + params.row._id , user:params.row}}>
                <button className="userListEdit">View</button>
                </Link>
                <DeleteOutline
                className="userListDelete"
                onClick={() => handleDelete(params.row._id)}
                />
            </>
            );
        },
        },
    ];
    
    return (
        <div className="userList">
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
