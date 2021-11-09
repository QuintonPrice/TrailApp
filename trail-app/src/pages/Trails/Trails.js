// Home page
import React, { Component } from 'react';
import './trails.css';

import { Link } from 'react-router-dom'; // imports link functionality
import Modal from "react-bootstrap/Modal";
import Button from 'react-bootstrap/Button';

class Trails extends Component {

    constructor() {
        super();
        this.state = {
            show: false,
        }
        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);
    }

    handleClose() {
        this.setState({
            show: false
        });
    }

    handleShow() {
        this.setState({
            show: true
        });
    }

    render() {
        return (
            <div id="trails-div">
                
                <button onClick={this.handleShow} id="add-trail-button" className="btn btn-lg btn-warning shadow">Add New Trail</button>
                <Modal show={this.state.show} onHide={this.handleClose} size="xl">
                    <Modal.Header closeButton>
                        <Modal.Title>Add New Trail</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={(e) => this.props.handleSubmit(e)}>
                            <input className="trail-input" type="text" name="trailName" placeholder="Trail name" onChange={(e) => this.props.handleChange(e)} />
                            <input className="trail-input" type="text" name="trailLocation" placeholder="Trail location" onChange={(e) => this.props.handleChange(e)} />
                            <button id="create-trail-button" type="submit" className="btn btn-md btn-outline-warning" >Create New Trail</button>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>

                <h1>Trails Page</h1>
                <div id="trails" className="container rounded border shadow">
                    
                </div>
            </div>
        )
    }
}

export default Trails;