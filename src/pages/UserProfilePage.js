import React, { useState, useEffect } from "react"
import { Route, Link, useParams } from "react-router-dom";
import axios from "axios";
import { Container, Col, Row, Card, CardImg, CardBody, CardTitle } from 'reactstrap';
import UserImages from "../containers/UserImages"


const UserProfilePage = () => {
    const { id } = useParams()
    const [profile, setProfile] = useState([]);
    const [usersImages, setUsersImages] = useState([]);
    // console.log({ id })
    // console.log(users)

    //below gets the user iamges
    useEffect(() => {
        // performing a GET request
        axios.get(`https://insta.nextacademy.com/api/v1/images?userId=${id}`)
            .then(result => {
                // console.log(result)
                setUsersImages(result.data)

            })
        //finding profileimage and name
        axios.get(`https://insta.nextacademy.com/api/v1/users/${id}`)
            .then(result => {
                console.log(result)
                setProfile(result.data)
            })
            .catch(error => {
                // If unsuccessful, we notify users what went wrong
                console.log('ERROR: ', error)
            })
    }, [])


    // return (usersImages.map(user => {
    //     return (
    //         <img style={{ width: "100px", margin: "10px" }} src={user} />
    //     )
    // })

    // )
    return (
        <div style={{ textAlign: 'center' }}>
            <h1>User profile id is {id}</h1>
            <h1>User name is {profile.username}</h1>
            <img style={{ width: '30%', borderRadius: "20px", margin: "10px" }} src={profile.profileImage} />
            {usersImages.map(user => {
                return (
                    <Card key={user} style={{ margin: "10px" }}>
                        <CardBody>
                            <Col xs="12">
                                < CardImg src={user} />
                            </Col>
                        </CardBody>
                    </Card>

                )
            })}
        </div>
    )



}

export default UserProfilePage

    // < img style={{ width: '30%' }} src={user} />