import React, { useState, useEffect } from 'react';
import { Container } from 'reactstrap';
import './App.css';
import axios from "axios";
import Loading from './components/loading';
import Homepage from './pages/homepage';
import UserProfilePage from './pages/UserProfilePage'
import { Route } from "react-router-dom";
import NavBar from "./components/Navbar"



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
    <>
      {isLoading ? <Loading /> :
        < Container >
          < NavBar />
          <Route
            exact
            path="/"
            component={props => { return <Homepage users={users} /> }}
          />
          <Route path="/user/:id"><UserProfilePage /></Route>
        </Container >}
    </>
  )
};


export default App;



// {/* 
//       {isLoading ? <Loading /> : <Homepage users={users} />} */}
// {/* < Link to="/" > Home</Link > */ }
// {/* We temporarily hardcode this to user id 1
//       < Link to="/users/1" > My Profile</Link > */}

// {/* <Route
//          path="/"
//         component={props => { return <Homepage users={users} /> }}
//       // render={props => <Homepage users={users}{...props} />}
//       />
//       <Route exact path="/users/:id"><UserProfilePage /></Route> */}