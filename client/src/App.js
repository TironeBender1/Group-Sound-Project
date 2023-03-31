import React, { useState, useContext, useMemo, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container'
import './App.css';
import DisplayAll from './components/DisplayAll';
import OnePlaylist from './components/OnePlaylist';
import PlayListForm from './components/PlaylistForm';
import Edit from './components/Edit';

//pages
import Dashboard from './pages/Dashboard'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Registration from './pages/Registration'
import NavigationBar from './components/NavigationBar'
import Footer from './components/Footer'
import useStorage from './hooks/useStorage'
import UserContext from './components/UserContext'
import AllUsers from './pages/TestPages/AllUsers'
import UsersList from './pages/TestPages/UsersList'
import UsersItem from './pages/TestPages/UsersItem'
import EditUser from './pages/EditUser'
import Logout from './pages/Logout'
import DeleteUser from './pages/DeleteUser'
import Connect from './pages/TestPages/Connect'

function App() {
  const [user, setUser] = useStorage('loggedUser', {
    loggedIn: '',
    first: '',
    last: '',
    email: ''
  })
  const providerValue = useMemo(() => ({ user, setUser }), [user, setUser]) //Going through useMemo makes sure it only updates when value changes

  return (
    <UserContext.Provider value={providerValue}>
    <Container className='parent'>
      <NavigationBar className='child' />
        <div className="App">
          <BrowserRouter>
            <Routes>
              <Route path='/dashboard' element={<DisplayAll />} />
              <Route path='/new' element={<PlayListForm />} />
              <Route path='/oneitem/:id' element={<OnePlaylist />} />
              <Route path='/edititem/:id' element={<Edit />} />
              <Route path='/' element={<Navigate replace to='/landing' />} />
              <Route path='/landing' element={<Landing />} />
              {/* <Route path='/dashboard' element={<Dashboard />} /> */}
              <Route path='/login' element={<Login />} />
              <Route path='/registration' element={<Registration />} />
              <Route path='/allusers' element={<AllUsers />} />
              <Route path='/edituser/:id' element={<EditUser />} />
              <Route path='/logout' element={<Logout />} />
              <Route path='/deleteuser/:id' element={<DeleteUser />} />
              <Route path='/connect' element={<Connect />} />
            </Routes>
          </BrowserRouter>
        </div>
        <Footer className='child' />
      </Container>
    </UserContext.Provider>
  );
}

export default App;
