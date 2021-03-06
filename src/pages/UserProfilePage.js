import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import axios from "axios";
import { Col, Card, CardImg, CardBody } from 'reactstrap';



const UserProfilePage = () => {
    const { id } = useParams()
    const [profile, setProfile] = useState([]);
    const [usersImages, setUsersImages] = useState([]);
    // console.log({ id })
    // console.log(users)

    //below gets the user iamges
    useEffect(() => {
        // performing a GET request
        //Gets users images
        axios.get(`https://insta.nextacademy.com/api/v1/images?userId=${id}`)
            .then(result => {
                // console.log(result)
                setUsersImages(result.data)

            })
        //finding profileimage and name
        axios.get(`https://insta.nextacademy.com/api/v1/users/${id}`)
            .then(result => {
                // console.log(result)
                setProfile(result.data)
            })
            .catch(error => {
                // If unsuccessful, we notify users what went wrong
                console.log('ERROR: ', error)
            })
    }, [])


    return (
        <div style={{ textAlign: 'center' }}>
            <h1>Weclome to {profile.username}'s page!</h1>
            <img style={{ width: '30%', borderRadius: "40px", margin: "10px" }} src={profile.profileImage} alt="profile" />
            {usersImages.map(user => {
                return (
                    // < Masonry goes here
                    <Card key={user} style={{ margin: "10px" }}>
                        <CardBody>
                            <Col xs="12">
                                < CardImg src={user} />
                            </Col>
                        </CardBody>
                    </Card>
                    //
                )
            })}
        </div>
    )



}

export default UserProfilePage

    // < img style={{ width: '30%' }} src={user} />