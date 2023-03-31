import React, { useRef, useState } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Form from 'react-bootstrap/Form'
import Label from 'react-bootstrap/FormLabel'
import { FormControl } from 'react-bootstrap'
import axios from 'axios'

function Connect() {
  const [token, setToken] = useState({})
  const authResponse = useRef()
  const tokenResponse = useRef()

  const requestAuthURL = {
    method: 'GET',
    url: 'https://accounts.spotify.com/authorize',
    params: {
      client_id: '71e077838ac24e4cb1e6987a12a1e679',
      response_type: 'code',
      redirect_uri: 'http://localhost:8000/callback',
      scope:
        'playlist-modify-public playlist-read-private playlist-modify-private',
      show_dialog: 'false'
    }
  }

  const getAuth = async () => {
    await axios
      .get('http://localhost:8000/api/spotify/authorize')
      .then((res) => {
        authResponse.current.value = JSON.stringify(res)
        // authResponse.current.value = 'DATA/n'
        // authResponse.current.value += JSON.stringify(res.data)
        // authResponse.current.value += '/nSTATUS/n'
        // authResponse.current.value += JSON.stringify(res.status)
        // authResponse.current.value += '/nSTATUS TEXT/n'
        // authResponse.current.value += JSON.stringify(res.statusText)
        // authResponse.current.value += '/nHEADERS/n'
        // authResponse.current.value += JSON.stringify(res.headers)
        // authResponse.current.value += '/nCONFIG/n'
        // authResponse.current.value += JSON.stringify(res.config)
      })
      .catch((err) => {
        authResponse.current.value = JSON.stringify(err)
      })
      .finally()
  }

  function handleAuth() {
    getAuth()
  }

  const requestTokenURL = {
    method: 'post',
    url: 'https://accounts.spotify.com/api/token',
    params: {
      grant_type: 'authorization_code',
      code: '',
      redirect_uri: 'http://localhost:3000/callback'
    },
    headers: {
      Authorization:
        'Basic ' +
        window.btoa('71e077838ac24e4cb1e6987a12a1e679') +
        ':' +
        window.btoa('fd5ae4e4acfd471fad043532a7a93231'),
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }

  const getToken = () => {
    axios(requestTokenURL)
      .then((res) => {
        tokenResponse.current.value = 'DATA/n'
        tokenResponse.current.value += JSON.stringify(res.data)
        tokenResponse.current.value += '/nSTATUS/n'
        tokenResponse.current.value += JSON.stringify(res.status)
        tokenResponse.current.value += '/nSTATUS TEXT/n'
        tokenResponse.current.value += JSON.stringify(res.statusText)
        tokenResponse.current.value += '/nHEADERS/n'
        tokenResponse.current.value += JSON.stringify(res.headers)
        tokenResponse.current.value += '/nCONFIG/n'
        tokenResponse.current.value += JSON.stringify(res.config)
      })
      .catch((err) => {
        tokenResponse.current.value = JSON.stringify(err)
      })
      .finally()
  }

  async function handleToken() {
    // fetch('https://jsonplaceholder.typicode.com/todos/1')
    //   .then((response) => response.json())
    //   .then((json) => console.log(json))
  }

  return (
    <Container fluid>
      <Row>
        <Col>
          <Label>Get Authorization</Label>
          <button onClick={handleAuth}>GET</button>
        </Col>
        <Col>
          <Label>Response:</Label>
          <textarea
            ref={authResponse}
            name='auth'
            id=''
            cols='120'
            rows='10'
          ></textarea>
        </Col>
      </Row>
      <Row>
        <Col>
          <Label>Get oauth token</Label>
          <button onClick={handleToken}>GET</button>
        </Col>
        <Col>
          <Label>Response:</Label>
          <textarea
            ref={tokenResponse}
            name='oauth'
            id=''
            cols='120'
            rows='10'
          ></textarea>
        </Col>
      </Row>
      <Row>
        <Col>
          <FormControl type='text'></FormControl>
          <button>Search</button>
        </Col>
      </Row>
    </Container>
  )
}

export default Connect
