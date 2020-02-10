import React, { useState, useEffect } from 'react'
import axios from "axios"
import { Col, Card, CardImg, CardBody } from 'reactstrap';
import Loading from "../components/loading"

function MyProfilePage() {
    const jwt = localStorage.getItem("jwt")
    const [usersImages, setUsersImages] = useState([]);
    const [profile, setProfile] = useState([]);
    const [isLoading, setIsLoading] = useState(true)




    useEffect(() => {
        // Gets Users own Images
        axios({
            method: 'get',
            url: 'https://insta.nextacademy.com/api/v1/images/me',
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        })
            .then(result => {
                console.log(result)
                setUsersImages(result.data)
                setIsLoading(false)

            })
            .catch(error => {
                // If unsuccessful, we notify users what went wrong
                console.log('ERROR: ', error)
                console.log(`No JWT`) // Error handling here when visiting My Profile but not logged in
            })
        // Gets Profile Image and User Name to display
        axios({
            method: 'get',
            url: 'https://insta.nextacademy.com/api/v1/users/me',
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        })
            .then(result => {
                console.log(result)
                setProfile(result.data)
                // setIsLoading(false)

            })
            .catch(error => {
                // If unsuccessful, we notify users what went wrong
                console.log('ERROR: ', error)
            })
    }, [])

    //Error handling when visiting My Profile when not logged in

    return (
        <div style={{ textAlign: 'center' }}>

            <h1>Good day {profile.username}</h1>
            <img style={{ width: '30%', borderRadius: "40px", margin: "10px" }} src={profile.profile_picture} alt="profile" />

            {isLoading ? <Loading /> : usersImages.map(user => {
                return (
                    // < Masonry goes here
                    <Card key={user} style={{ margin: "10px" }}>
                        <CardBody>
                            <Col xs="12" m="6">
                                < CardImg src={user} style={{ boxShadow: "7px 7px 5px 0px rgba(50, 50, 50, 0.75)" }} />
                            </Col>
                        </CardBody>
                    </Card>
                )
            })}

        </div>
    )
}

export default MyProfilePage

// axios({
//     method: 'post',
//     url: 'https://insta.nextacademy.com/api/v1/login',
//     data: {
//         username: email,
//         password: pass
//     }
// })