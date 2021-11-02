// NavBar component

import React, { Component } from 'react';
import './navbar.css';
import { default as NavbarBS } from 'react-bootstrap/Navbar';
import { default as NavBS } from 'react-bootstrap/Nav';

import { Link } from 'react-router-dom'; // imports link functionality

// navigation bar class
class NavBar extends Component {
    render() {
        return (
            <NavbarBS id="navb" className="sticky-top navbar-fixed-top shadow ml-auto" expand="lg" >
                <li className="mr-auto"><a id="logoButton" href="/#"><p>Trail App</p></a></li>
                <NavbarBS.Toggle aria-controls="navbarToggler">
                </NavbarBS.Toggle>
                <NavbarBS.Collapse id="navbarToggler">
                    <NavBS id="links" className="ml-auto">
                        <li><a className="nav-link"><button id="login-button" type="button" className="btn btn-md btn-primary">Login</button></a></li>
                        <li className="textlink"><a className="nav-link" to="/home">Home</a></li>
                        <li className="textlink"><a className="nav-link" to="/info">Info</a></li>
                        <li><a className="nav-link" target="blank" href="https://github.com/QuintonPrice/TrailApp"><i className="fab fa-github"></i></a></li>
                    </NavBS>
                </NavbarBS.Collapse>
            </NavbarBS >
        );
    }
}

export default NavBar;