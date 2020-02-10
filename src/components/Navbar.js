import React, { useState } from 'react';
import { Route, Link } from "react-router-dom";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    NavbarText,
    Button
} from 'reactstrap';
import { faCameraRetro } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MyModal from './Modal';

const NavBar = ({ setLoggedIn, loggedIn, handleLogOut }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);



    const welcomeMsg = () => {
        if (loggedIn === true) {
            return (
                `Welcome ${localStorage.getItem('name')}`)
        } else {
            return ('')
        }
    }


    const uploadLink = () => {
        if (loggedIn === true) {
            return (
                `Upload`)
        } else {
            return ('')
        }
    }


    return (
        <div>
            <Navbar color="light" light expand="md">
                <NavbarBrand href="/">Nextagram <FontAwesomeIcon style={{ color: 'blue' }} icon={faCameraRetro} spin /></NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        <NavItem>
                            <NavLink tag={Link} to="/">Home</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={Link} to="/profile" >My Profile</NavLink>
                        </NavItem>
                        {/* Displays currently logged in user name */}
                        <NavbarText>{welcomeMsg()}</NavbarText>
                    </Nav>
                    {/* //Upload picture link*/}

                    <NavLink tag={Link} to="/upload" >{uploadLink()}</NavLink>

                    {/* login/signup modal goes here */}
                    <MyModal loggedIn={loggedIn} setLoggedIn={setLoggedIn} handleLogOut={handleLogOut} />

                </Collapse>
            </Navbar>
        </div>
    );
}

export default NavBar;