import React ,{useEffect, useState}from 'react'
import './songs.css'
export default function Songs() {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    const [song, setsong] = useState(null);
    const handleChange = (e) => {
        const value = e.target.value;
        setsong({ ...song, [e.target.name]: value });
    };
    console.log(song)
    return (
        <div className='newSong'>
            <div className="newSongTitle">New Song</div>
            <div className="newSongList">
                <div className="newSongItems">
                    <label htmlFor="songMovieName">Title</label>
                    <input type="text" name="SongMovieName" id="songMovieName" placeholder='Movie Name'  onChange={handleChange}/>
                </div>
                <div className="newSongItems">
                    <label htmlFor="songName">Song Name</label>
                    <input type="text" name="SongName" id="songName" placeholder='Song Name'  onChange={handleChange} />
                </div>
                <div className="newSongItems">
                    <label htmlFor="songYear">Year</label>
                    <input type="text" name="SongYear" id="songYear" placeholder='Year'  onChange={handleChange}/>
                </div>
                <div className="newSongItems">
                    <label htmlFor="songGenre">Genre</label>
                    <input type="text" name="SongGenre" id="songGenre" placeholder='Genre'  onChange={handleChange}/>
                </div>
                <div className="newSongItems">
                    <label htmlFor="songDuration">Durations</label>
                    <input type="text" name="SongDuration" id="songDuration" placeholder='Duration'  onChange={handleChange}/>
                </div>
                <div className="newSongItems">
                    <label htmlFor="songLimit">Limit</label>
                    <input type="Number" name="SongLimit" id="songLimit" placeholder='Limit'  onChange={handleChange}/>
                </div>
                <div className="newSongItems">
                    <label htmlFor="songLanguage">Language</label>
                    <input type="text" name="SongLanguage" id="songLanguage" placeholder='Language'  onChange={handleChange}/>
                </div>
                
            </div>
            <div className="newSongCast">
                <div className="newSongCastTitle">Cast</div>
                <div className="newSongCastList">
                    <div className="newSongItems">
                        <label htmlFor="movieMDirector">Music Director</label>
                        <input type="text" name="MovieMDirector" id="movieMDirector" placeholder='Music Director'  onChange={handleChange}/>
                    </div>
                    <div className="newSongItems">
                        <label htmlFor="movieHero">Movie Hero</label>
                        <input type="text" name="MovieHero" id="movieHero" placeholder='Hero'  onChange={handleChange}/>
                    </div>
                    <div className="newSongItems">
                        <label htmlFor="movieHeroine">Movie Heroine</label>
                        <input type="text" name="MovieHeroine" id="movieHeroine" placeholder='Heroine'  onChange={handleChange} />
                    </div>
                </div>
            </div>
            <div className="newSongBlob">
                <div className="newSongBlobTitle">Documents</div>
                <div className="newSongBlobList">
                    <div className="newSongBlobItem">
                        <label htmlFor="newSongAudio">Song</label>
                        <input type="file" name="SongAudio" id="newSongAudio" />
                    </div>
                    <div className="newSongBlobItem">
                        <label htmlFor="newSongLyrics">Lyrics</label>
                        <input type="file" name="SongLyrics" id="newSongLyrics"  />
                    </div>
                </div>
            </div>
            <button className='createButton'>Create</button>
        </div>
    )
}
