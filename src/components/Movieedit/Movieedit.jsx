import React, { useContext, useEffect, useState } from 'react';
import './Movieedit.css';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import {plan,genres} from '../../dummyData';
import { MovieContext } from '../../context/movieContext/MovieContext';
export default function Movieedit() {
    const location = useLocation();
    const movieId=location.pathname.split('/')[3];
    const [movie, setmovie] = useState([]);
    const [loading, setloading] = useState(false);
    const [movieItem, setmovieItem] = useState([]);
    const [genre, setgenre] = useState([]);
    const [imageDelete, setimageDelete] = useState(false);
    const [images, setimages] = useState([]);
    const [video, setvideo] = useState([]);
    const [trailer, settrailer] = useState([]);
    const handleGenre = (e) =>{
        
        if(e.target.checked){
            setgenre([ ...genre,e.target.value]);
        }else{
            let index = genre.indexOf(e.target.value);
            genre.splice(index,1);
        }   
    }
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setimages({ ...images, [e.target.name]: file });
    };
    useEffect(() => {
        const getData = async ()=>{
            try{
                const response = await axios.get('https://apibootflix.herokuapp.com/movie/'+movieId);
                setmovie(response.data);
                setloading(true);
                
            }catch(err){
                console.log(err.message);
            }
        }
        getData();
        
    }, []);
    const updateMovie = (e)=>{
        e.preventDefault();
        var formData = {};
        for (const [key, value] of Object.entries(movieItem)) {
            formData[key]=value;
        }
        formData["genre"]=genre;
        console.log(formData);
        const data = async ()=>{
            try{
                const res = await axios.put('https://apibootflix.herokuapp.com/movie/'+movieId,formData);
                console.log(res.data);
            }catch(err){
                console.log(err);
            }
        }
        data();
    }
    const deleteMovie = ()=>{
        const deleteVideo = async ()=>{
            try{
                const res = await axios.delete('https://apibootflix.herokuapp.com/movieVideo/'+movieId);
                console.log(res.data);
                if(res.status===200){
                    window.location.reload();
                }
            }catch(err){
                console.log(err.message);
            }
        }
        deleteVideo();
    }
    const deleteTrailer = ()=>{
        const deleteVideo = async ()=>{
            try{
                const res = await axios.delete('https://apibootflix.herokuapp.com/movieTrailer/'+movieId);
                console.log(res.data);
                if(res.status===200){
                    window.location.reload();
                }
            }catch(err){
                console.log(err.message);
            }
        }
        deleteVideo();
    }
    const deleteImage = ()=>{
        setimageDelete(true);
    }
    const handleMovieUpload = (e)=>{
        e.preventDefault();
        
        const formData = new FormData();
            formData.append("movie",video[0]);
            console.log(formData)
            const sendVideo = async ()=>{
                try{
                    const res = await axios.post("https://apibootflix.herokuapp.com/upload/movie/"+movieId, 
                                                    formData,
                                                    {
                                                        withCredentials:true,
                                                        headers:{
                                                            'Content-Type': 'multipart/form-data'
                                                        },
                                                        onUploadProgress: function(progressEvent) {
                                                            var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                                                            console.log(percentCompleted);
                                                        }
                                                    }
                                                );
                    console.log(res);
                    if(res.status===200){
                        window.location.reload();
                    }
                }catch(err){
                    console.log(err.message);
                }
            };
            sendVideo();
    };
    const handleImageUpload = (e)=>{
        e.preventDefault();
        const formData = new FormData();
        for (const [key, value] of Object.entries(images)) {
            formData.append(key,value);
        }
        console.log(formData);
        const sendVideo = async ()=>{
            try{
                const res = await axios.post("https://apibootflix.herokuapp.com/upload-movie-images/"+movieId, 
                                                formData,
                                                {
                                                    withCredentials:true,
                                                    headers:{
                                                        'Content-Type': 'multipart/form-data'
                                                    },
                                                    onUploadProgress: function(progressEvent) {
                                                        var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                                                        
                                                    }
                                                }
                                            );
                console.log(res);
                if(res.status===200){
                    setimageDelete(false);
                }
            }catch(err){
                console.log(err.message);
            }
        };
        sendVideo();
    };
    const handleTrailerUpload = (e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append('trailer',trailer[0]);
        const sendVideo = async ()=>{
            try{
                const res = await axios.post("https://apibootflix.herokuapp.com/upload/trailer/"+movieId, 
                                            formData,
                                            {
                                                withCredentials:true,
                                                headers:{
                                                    'Content-Type': 'multipart/form-data'
                                                },
                                                onUploadProgress: function(progressEvent) {
                                                    var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                                                }
                                            }
                                        );
                console.log(res.status);
                if(res.status===200){
                    window.location.reload();
                }
            }catch(err){
                console.log(err.message);
            }
        };
        sendVideo();
    };
    const handleChange = (e)=>{
        setmovieItem({...movieItem,[e.target.name]:e.target.value});
    }
    console.log(movie);
    return(
        <div className='movieEdit'>
            {
                loading &&
                <>
                    <div className="newMovieTitle">{movie.movieName}</div>
                        <div className="newMovieList">
                            <div className="newMovieItems">
                                <label htmlFor="movieName">Title</label>
                                <input 
                                    type="text" 
                                    name="movieName" 
                                    id="movieName" 
                                    placeholder={movie.movieName} 
                                    defaultValue={movie.movieName}
                                    onChange={handleChange} 
                                />
                            </div>
                            
                            <div className="newMovieItems">
                                <label htmlFor="movieYear">Year</label>
                                <input
                                    type="text" 
                                    name="year" 
                                    id="movieYear" 
                                    placeholder={movie.year}
                                    defaultValue={movie.year}
                                    onChange={handleChange}
                                />
                            </div>
                            
                            <div className="newMovieItems">
                                <label htmlFor="movieDuration">Durations</label>
                                <input 
                                    type="text" 
                                    name="duration" 
                                    id="movieDuration" 
                                    placeholder={movie.duration}
                                    defaultValue={movie.duration}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="newMovieItems">
                                <label htmlFor="movieLimit">Limit</label>
                                <input 
                                    type="Number" 
                                    name="limit" 
                                    id="movieLimit" 
                                    placeholder={movie.limit}
                                    defaultValue={movie.limit}
                                    onChange={handleChange} 
                                />
                            </div>
                            <div className="newMovieItems">
                                <label htmlFor="movieLanguage">Language</label>
                                <input
                                    type="text" 
                                    name="language" 
                                    id="movieLanguage" 
                                    placeholder={movie.language}
                                    defaultValue={movie.language}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="newMovieItems">
                                <label htmlFor="moviePlan">Plan</label>
                                
                                <select name="plan" id="plan" defaultValue={movie.plan}  onChange={handleChange}>
                                    {plan.map((item,i)=>(
                                        <option value={item.value} key={i} >{item.label}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="newMovieItems">
                                <label htmlFor="movieDecription">Description</label>
                                <textarea 
                                    type="text" 
                                    name="movieDesc" 
                                    id="movieDecription" 
                                    placeholder={movie.movieDesc}
                                    defaultValue={movie.movieDesc}
                                    rows={10}  
                                    onChange={handleChange} 
                                />
                            </div>
                        </div>
                        <div className="genreBox1">
                            <label className='genre'>Genre</label>
                            <div style={{margin: '20px 0'}}>
                            {movie.genre.map((item,i)=>(
                                <span key={i}>{item}{i!==movie.genre.length-1 ? ' , ' : ""}</span>
                            ))}
                            </div>
                            <div className="genreBox">
                                {genres.map((item,index)=>(
                                    <div className="genreItem" key={index}>
                                        <label>
                                            <input type="checkbox" name={item.name} id={item.id} value={item.value} onChange={handleGenre}/>  {item.name}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="Preview">
                            {movie.movieUploded ? 
                                <div className="moviePreview">
                                    <h1>Movie Preview</h1>
                                    <video  src={`https://apibootflix.herokuapp.com/movie/${movieId}/watch`} controls></video>
                                    <div className="Delbtn" onClick={deleteMovie}>Delete</div>
                                </div>
                            :
                                
                                <>
                                <div className="newMovieBlob">
                                    <div className="newMovieBlobTitle">Movie Documents</div>
                                    <div className="newMovieBlobList">
                                        <div className="newMovieBlobItem">
                                            <label htmlFor="newMovieVideo">Video</label>
                                            <input 
                                                type="file" 
                                                name="movie" 
                                                id="newMovieVideo" 
                                                onChange={(e)=>{setvideo(e.target.files)}}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <button 
                                    className="uploadDetails" 
                                    onClick={handleMovieUpload}
                                >
                                    Upload
                                </button>
                                </>
                            }
                            {movie.trailerUploded ? 
                                <div className="trailerPreview">
                                    <h1>Trailer Preview</h1>
                                    <video  src={`https://apibootflix.herokuapp.com/trailer/${movieId}/watch`} controls></video>
                                    <div className="Delbtn" onClick={deleteTrailer}>Delete</div>
                                </div>
                        :
                            
                            <>
                            <div className="newMovieBlob">
                                <div className="newMovieBlobTitle">Trailer Documents</div>
                                <div className="newMovieBlobList">
                                    <div className="newMovieBlobItem">
                                        <label htmlFor="newMovieTrailer">Trailer</label>
                                        <input 
                                            type="file" 
                                            name="trailer" 
                                            id="newMovieTrailer" 
                                            onChange={(e)=>{settrailer(e.target.files)}} 
                                        />
                                    </div>
                                </div>
                            </div>
                            <button 
                                className="uploadDetails" 
                                onClick={handleTrailerUpload}
                            >
                                Upload
                            </button>
                        </>    
                        }
                        </div>
                    
                        {
                            imageDelete ? 
                            <>
                                <div className="newMovieBlob" style={{padding:'20px'}}>
                                    <div className="newMovieBlobTitle">Image Documents</div>
                                    <div className="newMovieBlobList">
                                        <div className="newMovieBlobItem">
                                            <label htmlFor="newMovieImage">Image</label>
                                            <input 
                                                type="file" 
                                                name="image" 
                                                id="newMovieImage" 
                                                onChange={handleImageChange}
                                            />
                                        </div>
                                        <div className="newMovieBlobItem">
                                            <label htmlFor="newMovieTitleImage">Title Image</label>
                                            <input 
                                                type="file" 
                                                name="titleImage" 
                                                id="newMovieTitleImage"  
                                                onChange={handleImageChange}
                                            />
                                        </div>
                                        <div className="newMovieBlobItem">
                                            <label htmlFor="newMovieThumbnailImage">Thumnail Image</label>
                                            <input 
                                                type="file" 
                                                name="thumnailImage" 
                                                id="newMovieThumbnailImage" 
                                                onChange={handleImageChange} 
                                            />
                                        </div>
                                    </div>
                                </div>
                                <button 
                                    className="uploadDetails" 
                                    onClick={handleImageUpload}
                                >
                                    Upload
                                </button>
                            </>
                            :
                            <>
                                <div className="imagePreview">
                                    <h1>Image Preview</h1>
                                    <img src={"https://apibootflix.herokuapp.com/get-images/"+movie.image} alt="Image" />
                                    <h1>Thumbnail image Preview</h1>
                                    <img src={"https://apibootflix.herokuapp.com/get-images/"+movie.thumnailImage} alt=" Thumbnail Image" />
                                    <h1>Title image Preview</h1>
                                    <img src={"https://apibootflix.herokuapp.com/get-images/"+movie.titleImage} alt=" Title Image" />
                                    <div className="Delbtn" onClick={deleteImage}>Delete</div>
                                </div>
                            </>
                        }
                        <div>
                        <button className="uploadDetails" onClick={updateMovie}>Update</button>
                        </div>
                </>
            }
        </div>
    ) ;
}
