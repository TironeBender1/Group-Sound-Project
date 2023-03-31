import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';
// import { deleteSound } from '../../../server/controllers/sound.controller';



const DisplayAll = (props) => {
    
    const [list, setList] = useState([])
    
    
    const deleteSound = (item) => {
        console.log("HERE!!")
        axios.delete('http://localhost:8000/api/deleteSound/' + item)
            .then(res => {
                removeFromDom(item)
            })
            .catch(err => console.log(err))
    }
    
    const removeFromDom = (id) => {
        setList(list.filter(item => item._id !== id)); //We could also write this in our PersonList component
    }
    
    useEffect(() => {
        axios.get('http://localhost:8000/api/getAll')
            .then((res) => {
                console.log(res.data);
                setList(res.data)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    return (
        <div className='p-4'>
            <h2 className='mb-5'>All Playlist</h2>
            <div className='d-flex flex-wrap justify-content-around'>
            
            {
                list.map((item) => (
                    
                    <div className='p-3 m-3 w-25 item' key={item._id}>
                        {/* {console.log("item-->",item)} */}
                        
                        <p className="text-primary">Song Name: {item.songName}</p>
                                            
                        <p>Artist Name: {item.artistName}</p>
                        
                        <p>Play List Name: {item.playListName}</p>
                        
                    
                    <Link to={`/oneitem/${item._id}`} className='btn border'>Details</Link>
                    <Link to={`/edititem/:id`} className='btn border'>Edit</Link>
                    <button onClick={(e)=>{deleteSound(item._id)}}>Delete</button>
                    </div>

                ))
                   
            }
    <Link to={'/new'} className="btn btn-primary">Home</Link>
   
            </div>
        </div>
    )
}

export default DisplayAll;