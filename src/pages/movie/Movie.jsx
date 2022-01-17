import axios from 'axios'
import React ,{useEffect, useState}from 'react'
import './movie.css';
import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel';

function CircularProgressWithLabel(props) {
    return (
    <Box sx={{ position: 'relative', display: 'inline-flex',color:'#fff' }}>
        <CircularProgress variant="determinate" {...props} />
        <Box
        sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}
        >
        <Typography variant="caption" component="div" color="#fff">
            {`${Math.round(props.value)}%`}
        </Typography>
        </Box>
    </Box>
    );
}
function SuccessMessage(props){
    return(
        <Box sx={{ position: 'relative', display: 'inline-flex',color:'#fff' ,alignItems:'center'}}>
            <CheckCircleOutlineIcon 
                sx={{height:'2em',width:'2em'}} 
                color='success' 
            />
            <Typography variant="h6" component="div" color="#fff" sx={{marginLeft:'20px'}}>
            {props.message}
        </Typography>
        </Box>
    )
}
function ErrorButton(props){
    console.log(props.error)
    return(
        <Box sx={{ position: 'relative', display: 'inline-flex',color:'#fff' ,alignItems:'center'}}>
            <button 
                className="uploadDetails" 
                onClick={props.function}
            >
                Upload
            </button> 
            {props.error && 
                <>
                    <CancelIcon color='error' sx={{marginLeft:'20px'}}/>
                    
                    <Typography variant="h6" component="div" color="red" sx={{marginLeft:'20px'}}>
                        {props.message}
                    </Typography>
                </>
            }
            
        </Box>
    )
}
CircularProgressWithLabel.propTypes = {
    value: PropTypes.number.isRequired,
};
SuccessMessage.propTypes = {
    message: PropTypes.string.isRequired,
};

export default function Movie() {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    const [movie, setMovie] = useState(null);
    const [images, setimages] = useState([]);
    const [trailer, settrailer] = useState(null);
    const [movieId, setmovieId] = useState('');
    const [video, setvideo] = useState('');
    const [percentage, setpercentage] = useState(0);
    const [Imagepercentage, setImagepercentage] = useState(0);
    const [Trailerpercentage, setTrailerpercentage] = useState(0);
    const [buttonClick, setbuttonClick] = useState(true);
    const [TrailerbuttonClick, setTrailerbuttonClick] = useState(true);
    const [ImagebuttonClick, setImagebuttonClick] = useState(true);
    const [trailerResponse, settrailerResponse] = useState(false);
    const [trailerResponseMessage, settrailerResponseMessage] = useState('SuccessFully sent to server');
    const [trailerErrorMessage, settrailerErrorMessage] = useState('');
    const [movieErrorMessage, setmovieErrorMessage] = useState('');
    const [movieResponseMessage, setmovieResponseMessage] = useState('SuccessFully sent to server');
    const [movieResponse, setmovieResponse] = useState(false);
    const handleChange = (e) => {
        const value = e.target.value;
        setMovie({ ...movie, [e.target.name]: value });
    };
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setimages({ ...images, [e.target.name]: file });
    };
    const handleMovieDetailsUpload = (e)=>{
        e.preventDefault();
        const sendData = async ()=>{
            try{
                const res = await axios.post("https://apibootflix.herokuapp.com/movie",
                                                movie,
                                                {
                                                    withCredentials:true
                                                }
                                            );
                setmovieId(res.data._id);
            }catch(err){
                console.log(err)
            }
        };
        sendData();
    };
    const handleMovieUpload = (e)=>{
        e.preventDefault();
        
        const formData = new FormData();
            formData.append("movie",video[0]);
            console.log(formData)
            const sendVideo = async ()=>{
                try{
                    setbuttonClick(false);
                    setmovieResponse(true);
                    const res = await axios.post("https://apibootflix.herokuapp.com/upload/movie/"+movieId, 
                                                    formData,
                                                    {
                                                        withCredentials:true,
                                                        headers:{
                                                            'Content-Type': 'multipart/form-data'
                                                        },
                                                        onUploadProgress: function(progressEvent) {
                                                            var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                                                            setpercentage(percentCompleted);
                                                            setmovieResponse(true);
                                                        }
                                                    }
                                                );
                    console.log(res);
                    if(res.status===200){
                        setmovieResponse(true);
                        setmovieResponseMessage('Upload successfully');
                    }
                }catch(err){
                    setbuttonClick(true);
                    setmovieResponse(true);
                    setmovieErrorMessage('Failed to Upload');
                    setpercentage(0);
                    console.log(err.message);
                }
            };
            sendVideo();
    };
    const handleImageUpload = (e)=>{
        e.preventDefault();
        setImagebuttonClick(!ImagebuttonClick);
        const formData = new FormData();
        for (const [key, value] of Object.entries(images)) {
            formData.append(key,value);
        }
        console.log(formData);
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
                                                        setImagepercentage(percentCompleted)
                                                    }
                                                }
                                            );
                console.log(res);
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
                setTrailerbuttonClick(false);
                settrailerResponse(true);
                const res = await axios.post("https://apibootflix.herokuapp.com/upload/trailer/"+movieId, 
                                            formData,
                                            {
                                                withCredentials:true,
                                                headers:{
                                                    'Content-Type': 'multipart/form-data'
                                                },
                                                onUploadProgress: function(progressEvent) {
                                                    var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                                                    setTrailerpercentage(percentCompleted)
                                                    settrailerResponse(true);
                                                }
                                            }
                                        );
                console.log(res.status);
                if(res.status===200){
                    settrailerResponse(true);
                    settrailerResponseMessage('Upload successfully');
                }
            }catch(err){
                setTrailerbuttonClick(true);
                settrailerResponse(true);
                settrailerErrorMessage('Failed to Upload');
                setTrailerpercentage(0);
                console.log(err.message);
            }
        };
        sendVideo();
    };
    console.log(trailerResponse)
    return (
        <div className='newMovie'>
            <div className="newMovieTitle">New Movie</div>
            <div className="newMovieList">
                <div className="newMovieItems">
                    <label htmlFor="movieName">Title</label>
                    <input 
                        type="text" 
                        name="movieName" 
                        id="movieName" 
                        placeholder='John Wick' 
                        onChange={handleChange} 
                    />
                </div>
                <div className="newMovieItems">
                    <label htmlFor="movieDecription">Description</label>
                    <input 
                        type="text" 
                        name="movieDesc" 
                        id="movieDecription" 
                        placeholder='Description'  
                        onChange={handleChange} 
                    />
                </div>
                <div className="newMovieItems">
                    <label htmlFor="movieYear">Year</label>
                    <input
                        type="text" 
                        name="year" 
                        id="movieYear" 
                        placeholder='Year'  
                        onChange={handleChange}
                    />
                </div>
                <div className="newMovieItems">
                    <label htmlFor="movieGenre">Genre</label>
                    <input 
                        type="text" 
                        name="genre" 
                        id="movieGenre" 
                        placeholder='Genre'  
                        onChange={handleChange}
                    />
                </div>
                <div className="newMovieItems">
                    <label htmlFor="movieDuration">Durations</label>
                    <input 
                        type="text" 
                        name="duration" 
                        id="movieDuration" 
                        placeholder='Duration'  
                        onChange={handleChange}
                    />
                </div>
                <div className="newMovieItems">
                    <label htmlFor="movieLimit">Limit</label>
                    <input 
                        type="Number" 
                        name="limit" 
                        id="movieLimit" 
                        placeholder='Limit'  
                        onChange={handleChange} 
                    />
                </div>
                <div className="newMovieItems">
                    <label htmlFor="movieLanguage">Language</label>
                    <input
                        type="text" 
                        name="language" 
                        id="movieLanguage" 
                        placeholder='Language'  
                        onChange={handleChange}
                    />
                </div>
                <div className="newMovieItems">
                    <label htmlFor="moviePlan">Plan</label>
                    <input 
                        type="text" 
                        name="plan" 
                        id="moviePlan" 
                        placeholder='Plan'  
                        onChange={handleChange}
                    />
                </div>
                
            </div>
            <button 
                className="uploadDetails" 
                onClick={handleMovieDetailsUpload}
            >
                Upload
            </button>
            
            { movieId && 
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
                {
                    buttonClick ? 
                    <ErrorButton function={handleMovieUpload} error={movieResponse} message={movieErrorMessage}/> : 
                    percentage===100 && movieResponse ? 
                    <SuccessMessage message={movieResponseMessage}/>: 
                    movieResponse &&
                    <CircularProgressWithLabel 
                        value={percentage} 
                    /> 
                }
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
                {
                    TrailerbuttonClick ? 
                    <ErrorButton function={handleTrailerUpload} error={trailerResponse} message={trailerErrorMessage}/> : 
                    Trailerpercentage===100 && trailerResponse ? 
                    <SuccessMessage message={trailerResponseMessage}/>: 
                    trailerResponse &&
                    <CircularProgressWithLabel 
                        value={Trailerpercentage} 
                    /> 
                }
                
                
                <div className="newMovieBlob">
                    <div className="newMovieBlobTitle">Image Documents</div>
                    <div className="newMovieBlobList">
                        <div className="newMovieBlobItem">
                            <label htmlFor="newMovieImage">Image</label>
                            <input 
                                type="file" 
                                name="MovieImage" 
                                id="newMovieImage" 
                                onChange={handleImageChange}
                            />
                        </div>
                        <div className="newMovieBlobItem">
                            <label htmlFor="newMovieTitleImage">Title Image</label>
                            <input 
                                type="file" 
                                name="MovieTitleImage" 
                                id="newMovieTitleImage"  
                                onChange={handleImageChange}
                            />
                        </div>
                        <div className="newMovieBlobItem">
                            <label htmlFor="newMovieThumbnailImage">Thumnail Image</label>
                            <input 
                                type="file" 
                                name="MovieThumbnailImage" 
                                id="newMovieThumbnailImage" 
                                onChange={handleImageChange} 
                            />
                        </div>
                        <div className="newMovieBlobItem">
                            <label htmlFor="newMovieSubtitle">Subtitle</label>
                            <input 
                                type="file" 
                                name="MovieSubtitle" 
                                id="newMovieSubtitle" 
                                onChange={handleImageChange} 
                            />
                        </div>
                    </div>
                </div>
                {
                    ImagebuttonClick ? 
                    <button 
                        className="uploadDetails" 
                        onClick={handleImageUpload}
                    >
                        Upload
                    </button> : 
                    Imagepercentage===100 ? 
                    <CheckCircleOutlineIcon 
                        sx={{height:'2em',width:'2em'}} 
                        color='success'
                    /> : 
                    <CircularProgressWithLabel 
                        value={Imagepercentage} 
                    />
                }
                </>
            }
            {/* <button className='createButton'>Create</button> */}
        </div>
    )
}
