import React, { useState, useEffect } from "react"
import axios from "axios";

const UserImages = ({ userId }) => {
    const [images, setImages] = useState([])


    useEffect(() => {
        // performing a GET request
        axios.get(`https://insta.nextacademy.com/api/v2/images?userId=${userId}`)
            .then(result => {
                setImages(result.data)
            })
            .catch(error => {
                // If unsuccessful, we notify users what went wrong
                console.log('ERROR: ', error)
            })
    }, [])

    return (
        images.map(image => {
            return (
                <img style={{ width: "100px", margin: "10px" }} src={image.url} />
            )
        })
    )
}


export default UserImages

