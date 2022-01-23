import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import './movieview.css';
export default function Movieview() {
    const location = useLocation();
    console.log(location.pathname.split('/')[2]);
    const [movie, setmovie] = useState([]);
    const [loading, setloading] = useState(false);
    const movieId=location.pathname.split('/')[2];
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
    console.log(movie);
    return( 
        <>
        <div className='movieView'>
            { 
                loading && 
                <>
                    <div className="product">
                        <div className="productTitleContainer">
                            <h1 className="productTitle">Movie</h1>
                            <Link to={'/movies/edit/'+movieId} className="editBtn">Edit</Link>
                        </div>
                        <div className="productTopList">
                        <div className="productTop">
                            <div className="productInfoTop">
                                <img src={"https://apibootflix.herokuapp.com/get-images/"+movie.image} alt="" className="productInfoImg" />
                            </div>
                            <div className="productInfoBottom">
                                <div className="productInfoItem">
                                <span className="productInfoKey">id</span>
                                <span className="productInfoValue">{movie._id}</span>
                                </div>
                                <div className="productInfoItem">
                                <span className="productInfoKey">Movie</span>
                                <span className="productInfoValue">{movie.movieName}</span>
                                </div>
                                
                                <div className="productInfoItem">
                                <span className="productInfoKey">genre</span>
                                <span className="productInfoValue">{movie.genre.map((item,i)=>(<span key={i}>{item}{i!==movie.genre.length-1 ? ',' : ""}</span>))}</span>
                                </div>
                                <div className="productInfoItem">
                                <span className="productInfoKey">year</span>
                                <span className="productInfoValue">{movie.year}</span>
                                </div>
                                <div className="productInfoItem">
                                <span className="productInfoKey">Duration</span>
                                <span className="productInfoValue">{movie.duration}</span>
                                </div>
                                <div className="productInfoItem">
                                <span className="productInfoKey">limit</span>
                                <span className="productInfoValue">{movie.limit} +</span>
                                </div>
                                <div className="productInfoItem">
                                <span className="productInfoKey">Plan</span>
                                <span className="productInfoValue">{movie.plan}</span>
                                </div>
                                <div className="productInfoItem">
                                <span className="productInfoKey">Language</span>
                                <span className="productInfoValue">{movie.language}</span>
                                </div>
                            </div>
                            
                        </div>
                            <div className="productInfoBottoms">
                                <span>{movie.movieDesc}</span>
                            </div>
                        </div>
                        <div className="Preview">
                            <div className="moviePreview">
                                <h1>Movie Preview</h1>
                                <video  src={`https://apibootflix.herokuapp.com/movie/${movieId}/watch`} controls></video>
                            </div>
                            <div className="trailerPreview">
                                <h1>Trailer Preview</h1>
                                <video  src={`https://apibootflix.herokuapp.com/trailer/${movieId}/watch`} controls></video>
                            </div>
                        </div>
                        </div>
                </>
            }
        </div>
        
        </>
    );
}
