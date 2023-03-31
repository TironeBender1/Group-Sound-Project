import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useParams, useNavigate } from 'react-router-dom'



const OnePlaylist = (props) => {
    const [item, setItem] = useState([])
        
    const navigate = useNavigate()
  
    const {id} = useParams()
   
    useEffect(() => {
        axios.get(`http://localhost:8000/api/selectOneSound/${id}`)
            .then((res) => {
                // console.log(res.data);
                setItem(res.data)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    const deleteHandler = (e) => {
        e.preventDefault();
    
        axios.delete(`http://localhost:8000/api/deleteSong/${id}`)
        .then((res) => {
            // console.log(res);
            navigate('/')
        })
        .catch((err) => {
            console.log("finding me", )
            console.log("found me", err);   
        })
      }
      console.log("HEY YOU***", item)
    
      return (
        <div className='p-4'>
            <h2 className='mb-5'>{item.playListName}</h2>
            <div className='d-flex flex-wrap justify-content-around'>
            <Link to={'/'}>Go Back Home</Link>
                    <div className='p-3 m-3 w-25 item' key={item._id}>
                        <p>Playlist Name: {item.playListName}</p>
                        <p>Song Name: {item.songName}</p>                      
                    </div>
                    <Link to={`/edititem/${item._id}`} className='me-3 btn border'>EDIT</Link>
            </div>
        </div>
    )
}

export default OnePlaylist;