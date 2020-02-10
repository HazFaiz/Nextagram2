import React, { useState } from 'react'
import { FormGroup, Label, Input, Button } from 'reactstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { useHistory } from "react-router-dom";


toast.configure()

function LoginForm({ toggle, setLoggedIn }) {

    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")
    let history = useHistory()

    const handleLogin = () => {
        loginCall()
        setEmail("")
        setPass("")
        toggle()

    }
    //<-------------HANDLE EMAIL AND PASS INPUT--------->
    const handleEmailInput = (e) => {
        setEmail(e.target.value)
        // console.log(email)
    }

    const handlePassInput = (e) => {
        setPass(e.target.value)
        // console.log(pass)
    }

    //<----------POST API CALL------->

    const loginCall = () => {
        axios({
            method: 'post',
            url: 'https://insta.nextacademy.com/api/v1/login',
            data: {
                username: email,
                password: pass
            }
        })
            .then(result => {
                // console.log(result)
                toast.success(`Welcome back ${email} and ${pass}`)
                localStorage.setItem('jwt', result.data.auth_token)
                localStorage.setItem('name', result.data.user.username)
                setLoggedIn(true)
                history.push('/profile') //redirects user to profile page after login
            })
            .catch(error => {
                // console.error(error.response) // so that we know what went wrong if the request failed
                toast.error(`Something went wrong`)
            })
    }

    //<--------------RETURN----------->
    return (
        <div>
            <FormGroup>
                <Label for="exampleEmail">UserName</Label>
                <Input type="text" value={email} onChange={handleEmailInput} />
            </FormGroup>
            <FormGroup>
                <Label for="examplePassword">Password</Label>
                <Input type="password" value={pass} onChange={handlePassInput} />
            </FormGroup>
            <Button color="primary" onClick={handleLogin} disabled={!email || !pass} >Login</Button>
        </div>
    )
}

export default LoginForm