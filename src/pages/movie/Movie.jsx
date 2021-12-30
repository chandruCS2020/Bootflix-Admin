import React ,{useEffect, useState}from 'react'
import './movie.css'
export default function Movie() {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    const [movie, setMovie] = useState(null)
    const handleChange = (e) => {
        const value = e.target.value;
        setMovie({ ...movie, [e.target.name]: value });
    };
    console.log(movie)
    return (
        <div className='newMovie'>
            <div className="newMovieTitle">New Movie</div>
            <div className="newMovieList">
                <div className="newMovieItems">
                    <label htmlFor="movieName">Title</label>
                    <input type="text" name="MovieName" id="movieName" placeholder='John Wick' onChange={handleChange} />
                </div>
                <div className="newMovieItems">
                    <label htmlFor="movieDecription">Description</label>
                    <input type="text" name="MovieDescription" id="movieDecription" placeholder='Description'  onChange={handleChange} />
                </div>
                <div className="newMovieItems">
                    <label htmlFor="movieYear">Year</label>
                    <input type="text" name="MovieYear" id="movieYear" placeholder='Year'  onChange={handleChange}/>
                </div>
                <div className="newMovieItems">
                    <label htmlFor="movieGenre">Genre</label>
                    <input type="text" name="MovieGenre" id="movieGenre" placeholder='Genre'  onChange={handleChange}/>
                </div>
                <div className="newMovieItems">
                    <label htmlFor="movieDuration">Durations</label>
                    <input type="text" name="MovieDuration" id="movieDuration" placeholder='Duration'  onChange={handleChange}/>
                </div>
                <div className="newMovieItems">
                    <label htmlFor="movieLimit">Limit</label>
                    <input type="Number" name="MovieLimit" id="movieLimit" placeholder='Limit'  onChange={handleChange} />
                </div>
                <div className="newMovieItems">
                    <label htmlFor="movieLanguage">Language</label>
                    <input type="text" name="MovieLanguage" id="movieLanguage" placeholder='Language'  onChange={handleChange}/>
                </div>
                
            </div>
            <div className="newMovieCast">
                <div className="newMovieCastTitle">Cast</div>
                <div className="newMovieCastList">
                    <div className="newMovieItems">
                        <label htmlFor="movieDirector">Director</label>
                        <input type="text" name="MovieDirector" id="movieDirector" placeholder='Director'  onChange={handleChange}/>
                    </div>
                    <div className="newMovieItems">
                        <label htmlFor="movieMDirector">Music Director</label>
                        <input type="text" name="MovieMDirector" id="movieMDirector" placeholder='Music Director'  onChange={handleChange}/>
                    </div>
                    <div className="newMovieItems">
                        <label htmlFor="movieHero">Movie Hero</label>
                        <input type="text" name="MovieHero" id="movieHero" placeholder='Hero'  onChange={handleChange}/>
                    </div>
                    <div className="newMovieItems">
                        <label htmlFor="movieHeroine">Movie Heroine</label>
                        <input type="text" name="MovieHeroine" id="movieHeroine" placeholder='Heroine'  onChange={handleChange}/>
                    </div>
                </div>
            </div>
            <div className="newMovieBlob">
                <div className="newMovieBlobTitle">Documents</div>
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
                        <label htmlFor="newMovieVideo">Video</label>
                        <input type="file" name="MovieVideo" id="newMovieVideo" />
                    </div>
                    <div className="newMovieBlobItem">
                        <label htmlFor="newMovieTrailer">Trailer</label>
                        <input type="file" name="MovieTrailer" id="newMovieTrailer" />
                    </div>
                    <div className="newMovieBlobItem">
                        <label htmlFor="newMovieSubtitle">Subtitle</label>
                        <input type="file" name="MovieSubtitle" id="newMovieSubtitle" />
                    </div>
                </div>
            </div>
            <button className='createButton'>Create</button>
        </div>
    )
}
