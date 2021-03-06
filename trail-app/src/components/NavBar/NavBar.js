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
            <NavbarBS id="navb" className="sticky-top navbar-fixed-top navbar-dark shadow mr-auto" expand="lg" >
                <li><img className="user-profile-pic" alt="" src={this.props.photoURL}></img></li>
                <li>
                    {this.props.user ?
                    <button id="login-button" type="button" className="btn btn-md btn-primary" onClick = {() => this.props.logoutFunction()}>Logout</button>
                    :
                    <button id="login-button" type="button" className="btn btn-md btn-primary" onClick = {() => this.props.loginFunction()}>Login</button>
                    }
                </li>
                <NavbarBS.Toggle aria-controls="navbarToggler">
                </NavbarBS.Toggle>
                <NavbarBS.Collapse id="navbarToggler">
                    <NavBS id="links" className="ml-auto">
                        <li className="textlink"><Link className="nav-link" to="/home">Home</Link></li>
                        <li className="textlink"><Link className="nav-link" to="/trails">Trails</Link></li>
                        <li><a className="nav-link" target="blank" href="https://github.com/QuintonPrice/TrailApp"><i className="fab fa-github"></i></a></li>
                    </NavBS>
                </NavbarBS.Collapse>
            </NavbarBS >
        );
    }
}

export default NavBar;