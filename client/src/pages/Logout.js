import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../components/UserContext'
import axios from 'axios'

function Logout() {
  const { user, setUser } = useContext(UserContext)
  const navigate = useNavigate()

  setUser({ loggedIn: false })
  async function logUserOut() {
    navigate('/')
  }

  logUserOut()

  return <div>Logging out...</div>
}

export default Logout
