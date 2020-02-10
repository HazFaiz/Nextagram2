import React, { useState } from 'react'
import {
    Container, Form, FormGroup, Input, FormText, Button
} from 'reactstrap';
import axios from 'axios';
import Loading from '../components/loading'

const UploadPage = () => {

    const [previewImage, setPreviewImage] = useState(null);
    const [uploadImage, setUploadImage] = useState(null);
    const [responseMessage, setResponseMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    //Handles actual upload to server
    const handleUpload = e => {
        e.preventDefault();
        setIsLoading(true)
        //axios call to server
        let uploadForm = new FormData;
        uploadForm.append("image", uploadImage)
        // console.log(uploadForm)

        let jwt = localStorage.getItem('jwt')
        // console.log(jwt)

        axios.post(' https://insta.nextacademy.com/api/v1/images/', uploadForm, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        })
            .then((result) => {
                if (result.data.success) {
                    setResponseMessage('Image uploaded sucessfully')
                    console.log(result.data)
                    setIsLoading(false)
                } else {
                    setResponseMessage('Error uploading image :(')
                    console.log(result.data)
                    setIsLoading(false)
                }
            })
            .catch((error) => {
                setResponseMessage('Major error, call help!')
                setIsLoading(false)
            })
    }

    //Handles image preview
    const handleImage = e => {
        setPreviewImage(null)
        setResponseMessage(null)
        let imageFile = e.target.files[0]
        if (imageFile) {
            let newPreview = URL.createObjectURL(imageFile)
            setPreviewImage(newPreview)
        }
        setUploadImage(imageFile)
    }

    return (
        <Container className="pt-5" style={{ textAlign: "center", color: "white" }}>
            <h6 >Upload a new pic</h6>
            <div
                className="border border-light rounded mx-auto d-block mt-4"
                style={{ height: "400px", width: "400px", position: "relative" }}
            >
                {isLoading ? <Loading /> : previewImage ?
                    (responseMessage ? (<h2 //Image uploaded sucessfully after upload
                        style={{
                            position: "absolute",
                            left: "50%",
                            top: "50%",
                            transform: "translate(-50%, -50%)"
                        }}>
                        {responseMessage}
                    </h2>) :
                        (<img //Display preview image
                            className="w-75"
                            style={{
                                position: "absolute",
                                left: "50%",
                                top: "50%",
                                transform: "translate(-50%, -50%)",
                                maxHeight: "350px",
                                maxWidth: "350px"
                            }}
                            src={previewImage}
                            alt="preview" />))
                    :
                    (<h2 //Or Choose image to preview
                        style={{
                            position: "absolute",
                            left: "50%",
                            top: "50%",
                            transform: "translate(-50%, -50%)"
                        }}>
                        Choose Image to preview
                </h2>)}

            </div>
            <div>
                <Form onSubmit={handleUpload}>
                    <FormGroup className="w-50 mx-auto d-block">
                        <Input
                            type="file"
                            name="image-file"
                            onChange={handleImage}
                            multiple={false}
                        />
                        <FormText color="muted">
                            Make sure the image being uploaded is a supported format.
                    </FormText>
                    </FormGroup>
                    <Button type="submit" color="primary">
                        Upload
                </Button>
                </Form>
                {/* here we will handle everything we need to upload images to the server so that they can be publicly viewable and accessible through our other end points.*/}
            </div>
        </Container>

    )
}

export default UploadPage
