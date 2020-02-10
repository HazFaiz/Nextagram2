import React, { useState } from 'react'
import { FormGroup, Label, Input, Button, FormFeedback } from 'reactstrap';
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure()

function SignupForm({ toggle }) {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")
    const [confirmPass, setConfirmPass] = useState("") //Implement confirm passsword
    const [delay, setDelay] = useState(null);
    const [usernameValid, setUsernameValid] = useState(true);

    //check validity of username
    const checkUserName = newUserName => {
        console.log("Making API call to check username!");
        axios
            .get(
                `https://insta.nextacademy.com/api/v1/users/check_name?username=${newUserName}`
            )
            .then(response => {
                console.log(response.data);
                if (response.data.valid) {
                    setUsernameValid(true);
                } else {
                    setUsernameValid(false);
                }
            });
    };
    // <-----Handle Input for name, password and email. Also login button ---->>
    const handleNameInput = (e) => {
        setName(e.target.value)
        // clears queue so that the old keystrokes don't trigger axios call
        clearTimeout(delay)
        const newUserName = e.target.value
        console.log(name)
        // put each new keystroke into the queue
        const newDelay = setTimeout(() => {
            checkUserName(newUserName)
        }, 500)

        setDelay(newDelay)
    }

    const handleEmailInput = (e) => {
        setEmail(e.target.value)
        console.log(email)
    }

    const handlePassInput = (e) => {
        setPass(e.target.value)
        console.log(pass)
    }

    const handleConfPassInput = (e) => {
        setConfirmPass(e.target.value)
        console.log(pass)
    }

    // <----Login button--->
    const handleLogin = () => {
        if (pass !== confirmPass) {
            toast.error(`Password do not match`)
        } else {//Put in logic for matching pass
            signUpCall() //initiates Post to API
            setEmail("") //empties Email field
            setPass("") //empties Pass field
            setConfirmPass("")
            toggle() //closes modal window
        }
    }

    //<-----API to sign up---->

    const signUpCall = () => {
        axios({
            method: 'POST',
            url: 'https://insta.nextacademy.com/api/v1/users/',
            data: {
                username: name,
                email: email,
                password: pass
            }
        })
            .then(response => {
                // console.log(response)
                toast.success(`Hello ${name}, you're account is ${email} and ${pass}`)
            })
            .catch(error => {
                // console.error(error.response) // so that we know what went wrong if the request failed
                toast.error(`Something went wrong`)
            })

    }
    //<--------------REACTIVE FORM FEEDBACK START------>
    const getInputProp = () => {
        if (!name.length) {
            return null;
        }
        if (name.length <= 6) {
            return { invalid: true };
        }
        if (usernameValid) {
            return { valid: true };
        } else {
            return { invalid: true };
        }
    };


    const getFormFeedback = () => {
        if (!name.length) {
            return null;
        }

        if (name.length <= 6) {
            return <FormFeedback invalid>Must be at least 6 characters</FormFeedback>;
        }

        if (usernameValid) {
            return <FormFeedback valid>Sweet! That name is available</FormFeedback>;
        } else {
            return <FormFeedback invalid>Sorry! Username is taken</FormFeedback>;
        }
    };

    // PASSWORD & CONFIRM PASSWORD FORM FEEDBACK
    const getPassProp = () => {
        if (!pass.length) {
            return null;
        }
        if (pass.length <= 6) {
            return { invalid: true };
        } else {
            return { valid: true };
        }
    };

    const getPassFeedback = () => {
        if (!pass.length) {
            return null;
        }

        if (pass.length <= 6) {
            return <FormFeedback invalid>Password must be at least 6 characters</FormFeedback>;
        } else {
            return <FormFeedback valid>Sweet! That password works</FormFeedback>
        }

    };

    // PASSWORD & CONFIRM PASSWORD FORM FEEDBACK
    const getConfPassProp = () => {
        if (!confirmPass.length) {
            return null;
        }
        if (confirmPass !== pass || confirmPass.length <= 6) {
            return { invalid: true };
        } else {
            return { valid: true };
        }
    };

    const getConfPassFeedback = () => {
        if (confirmPass.length <= 6) {
            return <FormFeedback invalid>Password must be more than 6</FormFeedback>;
        }

        if (confirmPass !== pass && confirmPass.length > 6) {
            return <FormFeedback invalid>Passwords must match</FormFeedback>;
        }

        if (confirmPass === pass) {
            return <FormFeedback valid>Sweet! That password matches</FormFeedback>
        }
    };

    //<--------------REACTIVE FORM FEEDBACK END------>
    //Now form validation done for username. how about password?

    return (
        <div>
            <FormGroup>
                <Label for="Name">Username</Label>
                <Input type="name" onChange={handleNameInput} {...getInputProp()} />
                {getFormFeedback()}
            </FormGroup>
            <FormGroup>
                <Label for="Email">Email</Label>
                <Input type="email" onChange={handleEmailInput} />
            </FormGroup>
            <FormGroup>
                <Label for="Password">Password</Label>
                <Input type="password" onChange={handlePassInput} {...getPassProp()} />
                {getPassFeedback()}
            </FormGroup>
            <FormGroup>
                <Label for="confirmPassword">Confirm Password</Label>
                <Input type="confirmpassword" onChange={handleConfPassInput} {...getConfPassProp()} />
                {getConfPassFeedback()}
            </FormGroup>
            <Button color="primary" onClick={handleLogin} disabled={email.length < 6 || pass.length < 6 || name.length < 6 || confirmPass.length < 6}>Sign Up</Button>
        </div>
    )
}

export default SignupForm



// const handleInput = () => {
//     if (email.length < 6 || pass.length < 6 || name < 6) {
//         return false;
//     } else {
//         return true;
//     }
// } << doesnt work yet