import React, { useContext, useRef, useEffect } from 'react'
import { UserContext } from '../components/UserContext'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import axios from 'axios'

function DeleteUser() {
  const firstRunOver = useRef(false)
  const { user, setUser } = useContext(UserContext)
  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    if (firstRunOver.current !== true) {
      const deleteUser = async () => {
        await axios
          .delete('http://localhost:8000/api/user/' + id)
          .then((res) => console.log(res.data.msg))
          .catch((err) => console.log(err.msg))
          .finally(setUser({ loggedIn: false }))
        navigate('/')
      }

      deleteUser()
    }
    return () => {
      firstRunOver.current = true
    }
  }, [])

  return <div>Deleting user...</div>
}

export default DeleteUser
