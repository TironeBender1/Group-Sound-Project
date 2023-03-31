import React, {useState} from 'react';
import axios from 'axios'
import {useNavigate, Link} from 'react-router-dom'

const PlayListForm = (props) => {
    const navigate = useNavigate()
    const {allPlaylists, setAllPlaylists} = props
    const [errors, setErrors] = useState({})

    const [playlist, setPlaylist] = useState({
        songName: '',
        artistName: '',
        playListName: ''

    })

    const handleInputChange = (e) => {
        console.log(e.target.value);
        console.log(e.target.name);
        setPlaylist({...playlist, [e.target.name]: e.target.value})
    }

    const submitHandler = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/Sounds', playlist)
            .then((res) => {
                setAllPlaylists([...allPlaylists, res.data])
                navigate('/')
            })
            .catch((err) => {
                console.log(err);
                setErrors(err.response.data.errors);
            })
    }
 
    return (
        <div className='d-flex justify-content-center'>
            <form className="w-25" onSubmit={submitHandler}>
            
            <label className="form-label">Song Name: </label>
            <input className="form-control" type='text' onChange={handleInputChange}  value={playlist.songName} name='songName'/>

            {
                errors.songName?
                <p className="text-danger">{errors.songName.message}</p>:
                null

            }
            <label className="form-label">Artist Name: </label>
            <input className="form-control" type='text' onChange={handleInputChange} value={playlist.artistName} name='artistName'/>

            {
                errors.artistName?
                <p className="text-danger">{errors.artistName.message}</p>:
                null

            }
            <label className="form-label">Playlist Name: </label>
            <input className="form-control" type='text' onChange={handleInputChange}  value={playlist.playListName} name='playListName'/>

            {
                errors.playListName?
                <p className="text-danger">{errors.playListName.message}</p>:
                null
            }

            <br />

            <div>
                <button className='btn btn-danger' type="submit">Create Playlist</button> 
                --
                <Link to={'/'} className='btn btn-danger'>Go Home</Link>
            
            </div>

            </form>            
        </div>
    )       
}
export default PlayListForm;
    
    
