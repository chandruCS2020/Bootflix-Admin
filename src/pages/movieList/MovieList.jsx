import React, { useContext, useEffect, useState } from 'react'
import './movielist.css'
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { DeleteOutline } from "@material-ui/icons";
import axios from 'axios';
import { deleteMovie, getMovies } from '../../context/movieContext/apicalls';
import { MovieContext } from '../../context/movieContext/MovieContext';
export default function MovieList() {
    const { movies,dispatch } = useContext(MovieContext);
    const handleDelete = (_id) => {
        console.log(_id);
        deleteMovie(_id,dispatch);
    };
    useEffect(() => {
        getMovies(dispatch);
    }, [dispatch])
    console.log(movies);
    const columns = [
        { field: "_id", headerName: "ID", width: 250 },
        {
        field: "user",
        headerName: "User",
        width: 300,
        renderCell: (params) => {
            return (
            <div className="userListUser">
                <img className="userListImg" src={"https://apibootflix.herokuapp.com/get-images/"+params.row.image} alt="" />
                {params.row.movieName}
            </div>
            );
        },
        },
        {
            field: "year",
            headerName: "year",
            width: 250,
        },
        {
        field: "action",
        headerName: "Action",
        width: 150,
        renderCell: (params) => {
            return (
            <>
                <Link to={{pathname:"/movie/" + params.row._id , movie:params.row}}>
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
        <div className="movieList">
            <DataGrid
            rows={movies}
            disableSelectionOnClick
            columns={columns}
            pageSize={20}
            checkboxSelection
            getRowId={r=>r._id}
            />
        </div>
    )
}
