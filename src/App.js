import React, { useState, useEffect } from 'react';
import { Container } from 'reactstrap';
import './App.css';
import axios from "axios";
import Loading from './components/loading';
import Homepage from './pages/homepage';
import UserProfilePage from './pages/UserProfilePage'
import { Route, useHistory, Redirect } from "react-router-dom";
import NavBar from "./components/Navbar"
import MyProfilePage from "./pages/MyProfilePage"
import UploadPage from "./pages/UploadPage"


function App() {

  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true)

  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem('jwt') !== null
  )

  // const [currentUser, setCurrentUser] = useState( //Trying to output in navbar the current user name thats logged in
  //   localStorage.getItem('name') !== null
  // )

  // const handleNavName = () => {
  //   setCurrentUser(localStorage.getItem('name'))

  // }

  //<<<<-----------HANDLES LOGGING OUT, REMOVES JWT -->>>>>
  const handleLogOut = () => {
    // console.log(loggedIn)
    if (loggedIn === true) {
      setLoggedIn(false)
      localStorage.removeItem("jwt")
      localStorage.removeItem("name")
    }
  }


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
    < Container  >
      {isLoading ? <Loading /> :

        < Container >
          < NavBar loggedIn={loggedIn} setLoggedIn={setLoggedIn} handleLogOut={handleLogOut} />
          <Route
            exact
            path="/"
            component={props => { return <Homepage users={users} /> }}
          />
          <Route path="/user/:id"><UserProfilePage /></Route>
          <Route exact path="/profile" component={MyProfilePage} />
          <Route exact path="/upload" component={UploadPage} />
        </Container >}




    </Container>
  )
};


export default App;



// return (
//   < Container>
//     {isLoading ? <Loading style={{ top: "50%" }} /> :
//       < Container >
//         < NavBar />
//         <Route
//           exact
//           path="/"
//           component={props => { return <Homepage users={users} /> }}
//         />
//         <Route path="/user/:id"><UserProfilePage /></Route>
//       </Container >}
//   </Container>
// )
// };