import React, { useState, useEffect } from "react"
import axios from "axios";
import Loading from '../components/loading';

const UserImages = ({ userId }) => {
    const [images, setImages] = useState([])
    const [isLoading, setIsLoading] = useState(true)


    useEffect(() => {
        // performing a GET request
        axios.get(`https://insta.nextacademy.com/api/v2/images?userId=${userId}`)
            .then(result => {
                setImages(result.data)
                setIsLoading(false)

            })
            .catch(error => {
                // If unsuccessful, we notify users what went wrong
                console.log('ERROR: ', error)
            })
    }, [])

    return (
        <div className="justify-content-between">
            {isLoading ? <Loading /> :
                images.map(image => {
                    return (

                        <img style={{ width: "45%", padding: "10px", margin: "10px" }} src={image.url} alt={image} />
                    )
                })
            }</div>
    )
}


export default UserImages

