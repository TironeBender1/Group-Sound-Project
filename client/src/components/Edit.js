import React, {useState, useEffect} from 'react';
import axios from 'axios'
import {useNavigate, Link, useParams} from 'react-router-dom'


const UpdatePlaylist = (props) => {
    const { id } = useParams();

    const [songName, setSongName] = useState("");
    const [artistName, setArtistName] = useState("");
    const [playListName, setPlayListName] = useState("");
    const [errors,setErrors] = useState("");

    const navigate = useNavigate();


    useEffect(() => {
        console.log(id)
        axios.get(`http://localhost:8000/api/selectOneSound/${id}`)
            .then(res => {
                setSongName(res.data.songName);
                setArtistName(res.data.artistName);
                setPlayListName(res.data.playListName);



            })
            .catch(err => console.log(err))
    }, [id])

    const updatePlaylist = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8000/api/updateSound/${id}`, {
            artistName,
            songName,
            playListName

        })
            .then(res => {
                console.log(res);
                navigate("/")
            })
            .catch(err => {
                console.log(err);
                setErrors(err.response.data.errors);
            })
    }

    return (
        <div className='d-block justify-content-evenly '> 
            <h2 className='p-3 text-light w-50 text-bg-secondary border-5 border-light rounded-3'>Edit Playlist:</h2>

            <form className='border-5 m-auto w-50 row g-2 text-light rounded-3' onSubmit={updatePlaylist}>

                <label className='form-label text-bg-secondary text-light w-50'>Song Name:</label>
                <input className='form-control' type='text' value={songName} name='songName' onChange={(e) => 
                    setSongName(e.target.value)}/>

                {
                    errors.songName?
                    <p className='text-warning'>{errors.songName.message}</p>:
                    null
                }
                
                <label className='form-label text-bg-secondary text-light w-50'>Artist Name:</label>
                <input className='form-control' type='text' value={artistName} name='artistName' onChange={(e) => 
                    setArtistName(e.target.value)} />

                {
                    errors.artistName?
                    <p className='text-warning'>{errors.artistName.message}</p>:
                    null
                }
                
                <label className='form-label text-bg-secondary text-light w-50'>Playlist Name:</label>
                <input className='form-control' type='text' value={playListName} name='playListName' onChange={(e) => 
                    setPlayListName(e.target.value)}/>

                {
                    errors.playListName?
                    <p className='text-warning'>{errors.playListName.message}</p>:
                    null
                }

                <div>
                    <button className='btn btn-primary'>Edit Playlist</button>
                    <Link to={'/'} className='btn btn-primary'>Home</Link>
                </div>

            </form>
        </div>
    )
}


export default UpdatePlaylist;