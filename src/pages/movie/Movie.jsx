import axios from 'axios'
import React ,{useEffect, useState}from 'react'
import './movie.css';
import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

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

CircularProgressWithLabel.propTypes = {
    value: PropTypes.number.isRequired,
};

export default function Movie() {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    const [movie, setMovie] = useState(null)
    const handleChange = (e) => {
        const value = e.target.value;
        setMovie({ ...movie, [e.target.name]: value });
    };
    const [movieId, setmovieId] = useState('');
    const [video, setvideo] = useState('');
    const [percentage, setpercentage] = useState(0);
    const handleMovieDetailsUpload = (e)=>{
        e.preventDefault();
        
        const sendData = async ()=>{
            try{
                const res = await axios.post("https://apibootflix.herokuapp.com/movie", movie,{withCredentials:true});
                setmovieId(res.data._id);
            }catch(err){
                console.log(err)
            }
        };
        sendData();
        
    }
    const [buttonClick, setbuttonClick] = useState(true);
    const handleMovieUpload = (e)=>{
        e.preventDefault();
        setbuttonClick(!buttonClick);
        const formData = new FormData();
            formData.append("movie",video[0]);
            console.log(formData)
            const sendVideo = async ()=>{
                try{
                    const res = await axios.post("https://apibootflix.herokuapp.com/upload/movie/61e3ef2ced1a1f8bc88d7d51", formData,{withCredentials:true,headers:{'Content-Type': 'multipart/form-data'},onUploadProgress: function(progressEvent) {
                        var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                        setpercentage(percentCompleted)
                    }});
                    console.log(res);
                }catch(err){
                    console.log(err.message)
                    
                }
            };
            sendVideo();
    }
    console.log(percentage)
    // console.log(movieId)
    // console.log(video)
    return (
        <div className='newMovie'>
            <div className="newMovieTitle">New Movie</div>
            <div className="newMovieList">
                <div className="newMovieItems">
                    <label htmlFor="movieName">Title</label>
                    <input type="text" name="movieName" id="movieName" placeholder='John Wick' onChange={handleChange} />
                </div>
                <div className="newMovieItems">
                    <label htmlFor="movieDecription">Description</label>
                    <input type="text" name="movieDesc" id="movieDecription" placeholder='Description'  onChange={handleChange} />
                </div>
                <div className="newMovieItems">
                    <label htmlFor="movieYear">Year</label>
                    <input type="text" name="year" id="movieYear" placeholder='Year'  onChange={handleChange}/>
                </div>
                <div className="newMovieItems">
                    <label htmlFor="movieGenre">Genre</label>
                    <input type="text" name="genre" id="movieGenre" placeholder='Genre'  onChange={handleChange}/>
                </div>
                <div className="newMovieItems">
                    <label htmlFor="movieDuration">Durations</label>
                    <input type="text" name="duration" id="movieDuration" placeholder='Duration'  onChange={handleChange}/>
                </div>
                <div className="newMovieItems">
                    <label htmlFor="movieLimit">Limit</label>
                    <input type="Number" name="limit" id="movieLimit" placeholder='Limit'  onChange={handleChange} />
                </div>
                <div className="newMovieItems">
                    <label htmlFor="movieLanguage">Language</label>
                    <input type="text" name="language" id="movieLanguage" placeholder='Language'  onChange={handleChange}/>
                </div>
                <div className="newMovieItems">
                    <label htmlFor="moviePlan">Plan</label>
                    <input type="text" name="plan" id="moviePlan" placeholder='Plan'  onChange={handleChange}/>
                </div>
                
            </div>
            <button className="uploadDetails" onClick={handleMovieDetailsUpload}>Upload</button>
            
            <div className="newMovieBlob">
                <div className="newMovieBlobTitle">Movie Documents</div>
                <div className="newMovieBlobList">
                    <div className="newMovieBlobItem">
                        <label htmlFor="newMovieVideo">Video</label>
                        <input type="file" name="movie" id="newMovieVideo" onChange={(e)=>{setvideo(e.target.files)}}/>
                    </div>
                </div>
            </div>
            {buttonClick?<button className="uploadDetails" onClick={handleMovieUpload}>Upload</button>:percentage===100 ? <CheckCircleOutlineIcon sx={{height:'2em',width:'2em'}} color='success' /> : <CircularProgressWithLabel value={percentage} />}
            <div className="newMovieBlob">
                <div className="newMovieBlobTitle">Trailer Documents</div>
                <div className="newMovieBlobList">
                    <div className="newMovieBlobItem">
                        <label htmlFor="newMovieTrailer">Trailer</label>
                        <input type="file" name="MovieTrailer" id="newMovieTrailer" />
                    </div>
                </div>
            </div>
            <button className="uploadDetails" onClick={handleMovieDetailsUpload}>Upload</button>
            <div className="newMovieBlob">
                <div className="newMovieBlobTitle">Image Documents</div>
                <div className="newMovieBlobList">
                    <div className="newMovieBlobItem">
                        <label htmlFor="newMovieImage">Image</label>
                        <input type="file" name="MovieImage" id="newMovieImage" />
                    </div>
                    <div className="newMovieBlobItem">
                        <label htmlFor="newMovieTitleImage">Title Image</label>
                        <input type="file" name="MovieTitleImage" id="newMovieTitleImage"  />
                    </div>
                    <div className="newMovieBlobItem">
                        <label htmlFor="newMovieThumbnailImage">Thumnail Image</label>
                        <input type="file" name="MovieThumbnailImage" id="newMovieThumbnailImage"  />
                    </div>
                    <div className="newMovieBlobItem">
                        <label htmlFor="newMovieSubtitle">Subtitle</label>
                        <input type="file" name="MovieSubtitle" id="newMovieSubtitle" />
                    </div>
                </div>
            </div>
            <button className="uploadDetails" onClick={handleMovieDetailsUpload}>Upload</button>
            {/* <button className='createButton'>Create</button> */}
        </div>
    )
}
