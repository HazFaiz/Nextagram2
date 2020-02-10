/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import LoginForm from "./modalpages/loginform"
import SignupForm from "./modalpages/signupform"
import { useHistory } from "react-router-dom";


const MyModal = ({ setLoggedIn, loggedIn, handleLogOut }) => {
    // const {
    //     buttonLabel,
    //     className
    // } = props;

    const [modal, setModal] = useState(false);
    const [isLoginForm, setIsLoginForm] = useState(true)

    const toggle = () => setModal(!modal);
    let history = useHistory()



    // <<<<<---------Handle on click button to log out when user is logged in, and also toggle the model to show or not show ----->>>>>>>>>>>>>>

    const handleLogButton = () => {
        handleLogOut(loggedIn)
        history.push("/")//redirect to homepage
        // console.log(loggedIn)
        if (!loggedIn) {
            toggle() //Issue was passing "loggedIn" into (), it was listening for an event since its triggered to onclick, but couldnt find anything
        }
    }

    return (
        <>
            <Button color="danger" onClick={handleLogButton}>{loggedIn === true ? 'Log Out' : 'Log In'}</Button>
            <Modal isOpen={modal} toggle={toggle} >
                <ModalHeader toggle={toggle}>{isLoginForm ? 'Login' : 'Sign Up'}</ModalHeader>
                <ModalBody>
                    {
                        isLoginForm
                            ? <LoginForm toggle={toggle} setLoggedIn={setLoggedIn} />
                            : <SignupForm toggle={toggle} />
                    }
                </ModalBody>
                <ModalFooter>
                    <Button color="link" onClick={() => setIsLoginForm(!isLoginForm)}>{isLoginForm ? 'Sign Up?' : 'Login?'}</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </>
    );
}

export default MyModal;