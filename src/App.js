import React, { useState, useEffect } from 'react';
import { Container, Row, Card, CardImg, CardBody, CardTitle } from 'reactstrap';
import './App.css';
import axios from "axios";
import Loading from './components/loading';
import Homepage from './components/homepage';


function App() {

  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // performing a GET request
    axios.get('https://insta.nextacademy.com/api/v1/users')
      .then(result => {
        // console.log(result.data)
        const usersCopy = [...users, ...result.data]
        setUsers(usersCopy)
        // console.log(usersCopy)
        setIsLoading(false)
      })
      .catch(error => {
        // If unsuccessful, we notify users what went wrong
        console.log('ERROR: ', error)
      })
  }, [])

  return (
    <Container>
      {isLoading ? <Loading /> : <Homepage users={users} />}
    </Container>
  )
};


export default App;

/* <ul>
  {users.map(user => (
    <li>
      {user.id}: {user.username}
    </li>
    <
      ))}
</ul>  */